
import { format } from 'date-fns'
import { MaterialClient } from './components/client'
import { prismadb } from '@/lib/db.server.js';
import { formatter } from '@/lib/utils';


const MaterialsPage = async ({ params }) => {

  const products = await prismadb.material.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      size: true,
      color: true,
      category: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedProducts = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy')
  }))

  return (
    <div className='flex flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MaterialClient data={formattedProducts} />

      </div>
    </div>
  )
}

export default MaterialsPage