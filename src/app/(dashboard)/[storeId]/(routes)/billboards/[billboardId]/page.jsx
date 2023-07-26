import React from 'react'
import { prismadb } from '@/lib/db.server.js'
import { BillboardForm } from './components/billboard-form'

const BillboardPage = async ({ params }) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId
    }
  })
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  )
}

export default BillboardPage