'use client'
import { useState } from "react"
import axios from "axios"
import { redirect, useParams, useRouter } from "next/navigation"

import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"

import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import TextField from "@mui/material/TextField"
import LoadingButton from "@mui/lab/LoadingButton"

import { BiTrashAlt } from 'react-icons/bi'
import { toast } from "react-hot-toast"
import { ApiAlert } from "@/components/ui/api-alert"
import { useOrigin } from "@/hooks/use-origin"
import ImageUpload from "@/components/ui/image-upload"



export const BillboardForm = ({ initialData }) => {

  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState()
  const [imgPath, setImgPath] = useState('')

  const title = initialData ? 'Редактировать' : 'Создать'
  const description = initialData ? 'Редактировать' : 'Добавить новый'
  const toastMesssge = initialData ? 'Панель обновлен.' : 'Панель создан.'
  const action = initialData ? 'Сохранить' : 'Создать'

  const formattedItems = {
    url: initialData?.imageUrl
  }


  const handleSubmit = async (e) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, {
          label: value && value,
          imageUrl: imgPath && imgPath
        })
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, {
          label: value,
          imageUrl: imgPath
        })
      }
      router.push(`/${params.storeId}/billboards`)
      toast.success(toastMesssge)
    } catch (error) {
      toast.error('Что-то пошло не так...')
      console.log('Ошибка patch', error)
    } finally {
      setLoading(false)
    }
  }
  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
      router.refresh()
      router.push(`/${params.storeId}/billboards/`)
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
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description}
        />
        {initialData && (
          <Button
            sx={{ color: 'red', fontSize: '25px' }}
            onClick={() => setOpen(true)}
            color="error"
            variant="outined"
          ><BiTrashAlt /></Button>
        )}
      </div>
      <Divider />

      <div className="grid grid-cols-3 gap-8">
        <div className="w-2/4">
          <form onSubmit={handleSubmit}
            className="flex flex-col"
          >
            <label htmlFor="">BackgroundImage</label>
            <ImageUpload
              value={formattedItems ? [formattedItems] : [imgPath]}
              disabled={loading}
              onChange={(url) => setImgPath(url)}
              onRemove={(url) => setImgPath('')}
            />
            <label htmlFor="">label</label>
            <TextField
              value={value}
              onChange={e => setValue(e.target.value)} />
            <LoadingButton
              sx={{ marginTop: '10px' }}
              variant="outlined"
              loading={loading} type="submit" >
              {action}
            </LoadingButton>
          </form>
        </div>
      </div>
    </>
  )
}
