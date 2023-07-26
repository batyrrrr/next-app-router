
import { format } from 'date-fns'
import { BillboardClient } from './components/client'
import Image from 'next/image'
import { prismadb } from '@/lib/db.server.js';


const BillboardsPage = async ({ params }) => {

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedBillboards = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy')
  }))

  return (
    <div className='flex flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />

      </div>
    </div>
  )
}

export default BillboardsPage