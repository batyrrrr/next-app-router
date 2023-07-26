'use client'

import { useEffect, useState } from "react"
import Modal from "../Modal"
import LoadingButton from "@mui/lab/LoadingButton"
import Button from "@mui/material/Button"


export const AlertModal = ({ isOpen, onClose, onConfirm, loading }) => {
  const [isMounted, setIsMounted] = useState(false)


  useEffect(() => {
    setIsMounted(true)
  })
  if (!isMounted) {
    return null
  }
  return (
    <Modal
      title='Вы уверены?'
      description='После удаления восстановление невозможно'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 items-center justify-end w-full">
        <Button
          loading={loading}
          disabled={loading}
          variant="outlined"
          onClick={onClose}
        >Отмена</Button>
        <LoadingButton
          loading={loading}
          disabled={loading}
          variant="outlined"
          color="error"
          onClick={onConfirm}
        >Продолжить</LoadingButton>
      </div>
    </Modal>
  )


}
