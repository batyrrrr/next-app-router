'use client'
import { useState } from "react"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"

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



export const SettingsForm = ({ initialData }) => {
  const origin = useOrigin()
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(initialData.name)

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      await axios.patch(`/api/stores/${params.storeId}`, {
        name: value
      })
      router.refresh()
      toast.success('Магазин успешно обновлен')
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
      await axios.delete(`/api/stores/${params.storeId}`)
      router.refresh()
      router.push('/')
      toast.success('Магазин удален успешно')
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
        <Heading title='Настройки' description='Управлять настройками магазина'
        />
        <Button
          sx={{ color: 'red', fontSize: '25px' }}
          onClick={() => setOpen(true)}
          color="error"
          variant="outined"
        ><BiTrashAlt /></Button>
      </div>
      <Divider />
      <div className="grid grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <label htmlFor="">Изменить название</label>
          <TextField defaultValue={`${initialData.name}`} type="text" onChange={e => setValue(e.target.value)} />
          <LoadingButton
            sx={{ marginTop: '10px' }}
            variant="outlined"
            loading={loading} type="submit" >
            Сохранить
          </LoadingButton>
        </form>
      </div>
      <Divider />
      <ApiAlert
        title='test'
        description={`${origin}/api/${params.storeId}`}
        variant='Public'
      />
    </>
  )
}
