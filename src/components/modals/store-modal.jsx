'use client'

import { useStoreModal } from "@/hooks/use-store-modal"
import Modal from "../Modal"
import { Button, Input } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"


export const StoreModal = () => {
  const storeModal = useStoreModal()
  const [inputs, setInputs] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axios.post('/api/stores', {
        value: inputs
      })
      window.location.assign(`/${response.data.id}`)
    } catch (error) {
      toast.error('Что-то пошло не так...')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title='Создать магазин'
      description='Создать магазин для продуктов и категории'
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <form onSubmit={handleSubmit}>

        <Input disabled={loading} placeholder="type something..." onChange={(e) => (setInputs(e.target.value))} />
        <div className="pt-5 flex justify-end gap-2">
          <Button disabled={loading} variant="outlined" onClick={storeModal.onClose}>Отмена</Button>
          <LoadingButton type="submit" variant="outlined" loading={loading}  >Далее</LoadingButton>
        </div>
      </form>
    </Modal>
  )
}