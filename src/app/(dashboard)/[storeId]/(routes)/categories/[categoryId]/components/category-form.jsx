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
import { useOrigin } from "@/hooks/use-origin"
import { MenuItem, Select } from "@mui/material"



export const CategoryForm = ({ initialData, billboards }) => {
  const origin = useOrigin()
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState()
  const [imgPath, setImgPath] = useState('')
  const [selectValue, setSelectValue] = useState('')


  const title = initialData ? 'Редактировать' : 'Создать'
  const description = initialData ? 'Редактировать' : 'Добавить новый'
  const toastMesssge = initialData ? 'Категория обновлен.' : 'Категория создан.'
  const action = initialData ? 'Сохранить' : 'Создать'

  const handleSubmit = async (e) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, {
          name: value && value,
          billboardId: selectValue && selectValue
        })
      } else {
        await axios.post(`/api/${params.storeId}/categories`, {
          name: value,
          billboardId: selectValue
        })
      }
      router.push(`/${params.storeId}/categories`)
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
      await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`)
      router.refresh()
      router.push(`/${params.storeId}/categories/`)
      toast.success('категория успешно удалена')
    } catch (error) {
      toast.error('Убедитесь,что вы удалили продукты и категории')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }


  console.log('asadsad', selectValue)

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
            className=" flex flex-col"
          >
            <label className="
          font-bold
          " htmlFor="">Название категории</label>
            <TextField
              defaultValue={initialData && initialData.name}
              value={value}
              onChange={e => setValue(e.target.value)} />

            <label className="
          font-bold
          " htmlFor="">Панель</label>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectValue}
              defaultValue="batyr"
              label="Age"
              onChange={e => setSelectValue(e.target.value)}
            >
              {billboards.map((billboard) => (
                <MenuItem
                  value={billboard.id}
                  key={billboard.id}
                >
                  {billboard.label}
                </MenuItem>
              ))}
            </Select>
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
