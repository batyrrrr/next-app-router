
import { format } from 'date-fns'
import Image from 'next/image'
import { ColorsClient } from './components/client'
import { prismadb } from '@/lib/db.server'


const ColorsPage = async ({ params }) => {

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedColors = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy')
  }))

  return (
    <div className='flex flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsClient data={formattedColors} />

      </div>
    </div>
  )
}

export default ColorsPage