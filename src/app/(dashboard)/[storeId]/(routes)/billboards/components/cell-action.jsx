
'use client'

import { AlertModal } from "@/components/modals/alert-modal"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import CopyToClipboard from "react-copy-to-clipboard"
import { toast } from "react-hot-toast"
import { FiCopy } from "react-icons/fi"
import { MdOutlineSystemUpdateAlt, MdDeleteOutline } from "react-icons/md"

export const CellAction = ({ item }) => {

  const router = useRouter()
  const params = useParams()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const onCopy = () => {
    toast.success('Скопирован в буфер')
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeId}/billboards/${item.id}`)
      router.refresh()
      router.push(`/${params.storeId}/billboards`)
      toast.success('Панель успешно удален')
    } catch (error) {
      toast.error('Убедитесь,что вы удалили продукты и категории')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }





  return (
    <>
      <AlertModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="relative ">
        <button className="
      p-2
      bg-white
      rounded-md
      shadow-md
      font-bold
      " onClick={() => setOpen(prev => !prev)}>...</button>
        {open && (

          <div className="absolute z-10 top-[110%] left-0 p-2 rounded-md shadow-md bg-white">
            <ul className="flex flex-col gap-2 ">
              <li className="flex items-center gap-1 cursor-pointer">
                <CopyToClipboard text={item.id}>
                  <button onClick={() => onCopy()} className="flex items-center gap-1">
                    <span><FiCopy /></span>
                    <span>скопировать </span>
                  </button>
                </CopyToClipboard>
              </li>
              <li className="flex items-center gap-1 cursor-pointer" onClick={() => setModalOpen(true)}>
                <span><MdDeleteOutline /></span>
                <span>удалить</span>
              </li>
              <li className="flex items-center gap-1 cursor-pointer"
                onClick={() => router.push(`/${params.storeId}/billboards/${item.id}`)}>
                <span><MdOutlineSystemUpdateAlt /></span>
                <span>Обновить</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  )
}
