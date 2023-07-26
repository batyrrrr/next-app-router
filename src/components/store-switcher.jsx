'use client'
import React from 'react'
import { useStoreModal } from '@/hooks/use-store-modal'
import { useParams, useRouter } from 'next/navigation'
import { Autocomplete, Button, TextField } from '@mui/material'

import { BiStore } from 'react-icons/bi'
import { AiFillPlusCircle } from 'react-icons/ai'


// BiStore
const StoreSwitcher = ({ items }) => {
  const storeModal = useStoreModal()
  const params = useParams()

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }))
  const currentStore = formattedItems.find(item => item.value === params.storeId)
  return (
    <div className='flex gap-3'>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={
          formattedItems}
        sx={{ width: 300, borderColor: '#000' }}
        renderInput={(params) => <TextField {...params} label={`${currentStore.label}`} />}
      />
      <Button variant='outlined' onClick={storeModal.onOpen} >Добавить магазин
        <span className='pl-2 text-[30px]'>   <AiFillPlusCircle /></span>
      </Button>

    </div>
  )
}

export default StoreSwitcher