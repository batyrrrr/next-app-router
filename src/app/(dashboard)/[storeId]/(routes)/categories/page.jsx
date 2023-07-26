
import { format } from 'date-fns'
import { CategoryClient } from './components/client'
import Image from 'next/image'
import { prismadb } from '@/lib/db.server'



const CategoriesPage = async ({ params }) => {

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      billboard: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedCategories = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy')
  }))

  return (
    <div className='flex flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />

      </div>
    </div>
  )
}

export default CategoriesPage