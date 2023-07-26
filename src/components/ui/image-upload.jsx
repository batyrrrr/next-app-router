'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { CldUploadWidget } from "next-cloudinary"

import Button from "@mui/material/Button"
import { BiTrashAlt, BiPlus } from 'react-icons/bi'
import { useRouter } from "next/navigation"


const ImageUpload = ({ disabled, onChange, onRemove, value }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [imgView, setImgView] = useState('')
  const router = useRouter()


  useEffect(() => {
    setIsMounted(true)
  }, [])



  const onUpload = (result) => {
    console.log('result', result)
    onChange(result.info.secure_url)
    setImgView(result.info.secure_url)
  }

  console.log(value ? value : 'Нету value')

  if (!isMounted) {
    return null
  }
  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        {value.map((item) => (
          <div
            className="
          relative
          w-[200px]
          h-[200px]
          rounded-md
          overflow-hidden
          "
            key={item.url}
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                onClick={() => onRemove(item ? item.url : item)}
              ><BiTrashAlt />
              </Button>
            </div>
            <Image
              fill
              src={item ? item.url : item}
              alt="billboard-img"
            />
          </div>
        ))}

      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="vgk27til">
        {({ open }) => {
          const onClick = () => {
            open()
          }

          return (
            <Button
              type='button'
              disabled={disabled}
              variant='outlined'
              onClick={onClick}
            >
              <BiPlus />
              Обновить изображение
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload