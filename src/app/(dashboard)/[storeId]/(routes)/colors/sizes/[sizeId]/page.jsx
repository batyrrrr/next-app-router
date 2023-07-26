import React from 'react'
import { SizeForm } from './components/size-form.jsx'
import { prismadb } from '@/lib/db.server.js'

const BillboardPage = async ({ params }) => {
  const color = await prismadb.size.findUnique({
    where: {
      id: params.colorsId
    }
  })
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={color} />
      </div>
    </div>
  )
}

export default BillboardPage