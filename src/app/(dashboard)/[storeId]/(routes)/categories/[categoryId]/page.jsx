import React from 'react'
import { CategoryForm } from './components/category-form.jsx'
import { prismadb } from '@/lib/db.server.js'

const CategoryPage = async ({ params }) => {

  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId
    },
    include: {
      billboard: true
    }
  })
  console.log('first', category)

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    }
  })



  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm
          billboards={billboards}
          initialData={category} />
      </div>
    </div>
  )
}

export default CategoryPage