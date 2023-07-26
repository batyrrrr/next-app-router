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
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Checkbox from "@mui/material/Checkbox"
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';



export const ProductForm = ({ initialData, categories, colors, sizes, }) => {
  console.log(initialData ? initialData : 'Нету данных')
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState()
  const [colorValue, setColorValue] = useState('')
  const [categoryValue, setCategoryValue] = useState('')
  const [sizeValue, setSizeValue] = useState('')
  const [priceValue, setPriceValue] = useState(0)
  const [productImage, setProductImage] = useState([])
  const [isArchivedValue, setIsArchivedValue] = useState(false)
  const [isFeaturedValue, setIsFeaturedValue] = useState(false)

  console.log('eeeeeeeeeeeeeee', productImage)

  const title = initialData ? 'Редактировать продукт' : 'Создать продукт'
  const description = initialData ? 'Редактироват продукть' : 'Добавить новый'
  const toastMesssge = initialData ? 'Продукт обновлен.' : 'Продукт создан.'
  const action = initialData ? 'Сохранить' : 'Создать'

  const handleSubmit = async (e) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/products/${params.productId}`, {
          name: value && value,
          price: priceValue && priceValue,
          sizeId: sizeValue && sizeValue,
          colorId: colorValue && colorValue,
          categoryId: categoryValue && categoryValue,
          isFeatured: isFeaturedValue && isFeaturedValue,
          isArchived: isArchivedValue && isArchivedValue,
          images: productImage
        })
      } else {
        await axios.post(`/api/${params.storeId}/products`, {
          name: value,
          price: Number(priceValue),
          sizeId: sizeValue,
          colorId: colorValue,
          categoryId: categoryValue,
          isFeatured: isFeaturedValue,
          isArchived: isArchivedValue,
          images: productImage
        })
      }
      router.refresh()
      router.push(`/${params.storeId}/materials`)
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
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`)
      router.refresh()
      router.push(`/${params.storeId}/products/`)
      toast.success('Продукт успешно удален')
    } catch (error) {

      toast.error('Что-то пошло не так')
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
        <div>
          <form className="w-full">
            <label className="
          font-bold" htmlFor="">Изображение</label>
            <ImageUpload
              value={initialData ? initialData.images : productImage}
              disabled={loading}
              onChange={(url) => setProductImage([...productImage, { url }])}
              onRemove={(url) => setProductImage([...productImage.filter((current) => current.url !== url)])}
            />



          </form>
        </div>
        <div>
          <label className="
          font-bold" htmlFor="">Название продукта</label>
          <TextField
            defaultValue={initialData ? initialData.name : value}
            onChange={e => setValue(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label className="
          font-bold" htmlFor="">Цена</label>
          <TextField
            defaultValue={initialData ? initialData.price : priceValue}
            onChange={e => setPriceValue(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full flex flex-col">
          <label className="
          font-bold" htmlFor="">Цвет</label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={initialData ? initialData.color.name : colorValue}
            onChange={e => setColorValue(e.target.value)}
          >
            {colors.map((color) => (
              <MenuItem
                clnm
                value={color.id}
                key={color.id}
              >
                {color.name}
                <div classname='w-4 h-4 rounded-full'
                  style={{ backgroundColor: `${color.name}` }}
                ></div>
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="w-full flex flex-col">
          <label className="
          font-bold
          " htmlFor="">Категория</label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={initialData ? initialData.category.name : categoryValue}
            label="категория"
            onChange={e => setCategoryValue(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem
                clnm
                value={category.id}
                key={category.id}
              >
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col w-full">
          <label className="
          font-bold 
          " htmlFor="">Размер</label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={initialData ? initialData.size.name : sizeValue}
            onChange={e => setSizeValue(e.target.value)}
          >
            {sizes.map((size) => (
              <MenuItem
                value={size.id}
                key={size.id}
              >
                {size.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col space-y-0 space-x-4 p-4 rounded-md border ">
          <FormControlLabel onClick={() => setIsFeaturedValue(!isFeaturedValue)} control={<Checkbox checked={isFeaturedValue} />} label='В избранный' />
          <p >Этот продукт появится в главной странице сайта</p>
        </div>
        <div className="flex flex-col space-y-0 space-x-4 p-4 rounded-md border ">
          <FormControlLabel onClick={() => setIsArchivedValue(!isArchivedValue)} control={<Checkbox checked={isArchivedValue} />} label='В архив' />
          <p >Этот продукт нигде не появится</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} >
        <LoadingButton
          sx={{ marginTop: '10px' }}
          variant="outlined"
          loading={loading} type="submit" >
          {action}
        </LoadingButton>
      </form>

    </>
  )
}
