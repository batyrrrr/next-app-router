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
import { ValueIcon } from "@radix-ui/react-icons"



export const ColorForm = ({ initialData }) => {
  console.log(initialData ? initialData : 'Нету данных')
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState()
  const [colorValue, setColorValue] = useState('')

  const title = initialData ? 'Редактировать' : 'Создать'
  const description = initialData ? 'Редактировать' : 'Добавить новый'
  const toastMesssge = initialData ? 'Значение "Цвет" обновлен.' : 'Значение "Цвет" создан.'
  const action = initialData ? 'Сохранить' : 'Создать'

  const handleSubmit = async (e) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/colors/${params.colorsId}`, {
          name: value && value,
          value: colorValue && colorValue
        })
      } else {
        await axios.post(`/api/${params.storeId}/colors`, {
          name: value,
          value: colorValue
        })
      }
      router.push(`/${params.storeId}/colors`)
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
      await axios.delete(`/api/${params.storeId}/colors/${params.colorsId}`)
      router.refresh()
      router.push(`/${params.storeId}/colors/`)
      toast.success('Панель успешно удален')
    } catch (error) {
      toast.error('Убедитесь,что вы удалили продукты с этим размером')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }
  console.log(colorValue)

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

      <div className="grid grid-cols-3 gap-8 ">
        <div className=' w-2/3' >

          <form clnm onSubmit={handleSubmit}
            className='flex flex-col'
          >
            <label htmlFor="">Название цвета</label>
            <TextField
              onChange={e => setValue(e.target.value)}
              placeholder={`${initialData ? '' : 'название'}`}
              defaultValue={initialData ? initialData.name : value}
            />
            <label htmlFor="">Значение</label>
            <TextField
              onChange={e => setColorValue(e.target.value)}
              placeholder={`${initialData ? '' : 'название'}`}
              defaultValue={initialData ? initialData.value : colorValue}
            />
            <div
              className="w-7 h-7 border  rounded-full mt-2"
              style={{ backgroundColor: `${colorValue && colorValue}` }}
            ></div>
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
