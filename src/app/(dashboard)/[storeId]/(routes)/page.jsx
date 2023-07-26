import { prismadb } from '@/lib/db.server'
import React from 'react'

const DashboardPage = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  })

  return (

    <div>
      Activr Store: ${store.name}
      <div className='grid grid-cols-3 w-full'>
        <div className='h-10 w-full border bg-black'></div>
      </div>
    </div>
  )
}

export default DashboardPage