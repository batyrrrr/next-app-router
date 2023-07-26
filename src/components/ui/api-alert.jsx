'use client'

import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-hot-toast'

import { FiCopy } from 'react-icons/fi'
import { HiOutlineServer } from 'react-icons/hi'

export const ApiAlert = ({ title, description, variant }) => {

  const onCopy = () => {
    toast.success('Скопирован в буфер')
  }

  const textMap = ['Public', 'Admin']
  const currentVariant = textMap.find(item => item === variant)


  return (
    <div className='w-full flex flex-col border-gray-300 border rounded-lg p-2'>
      <div className=' flex items-center gap-1'>
        <span><HiOutlineServer /></span>
        <p className='font-semibold'>
          {title}
        </p>
        <span className={`${currentVariant === 'Admin' && 'bg-red-400 text-white'}
        bg-gray-200
        rounded-md
        p-1
        text-[14px]
        `}>{currentVariant}</span>
      </div>
      <div className="flex items-center justify-between gap-1 p-2 mt-2 ">
        <p className='
        font-semibold
        text-sm
        p-1
        bg-gray-100
        rounded-lg
        '>{description}
        </p>
        <CopyToClipboard text={description}>
          <button onClick={onCopy}><FiCopy className='text-[25px] p-1 rounded-sm border border-gray-300' /></button>
        </CopyToClipboard>
      </div>
    </div>
  )
}
