import React from 'react'
import { ColorForm } from './components/color-form'
import { prismadb } from '@/lib/db.server'

const BillboardPage = async ({ params }) => {
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorsId
    }
  })
  console.log('color', color)

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  )
}

export default BillboardPage