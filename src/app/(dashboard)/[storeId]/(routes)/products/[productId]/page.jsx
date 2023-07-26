import React from 'react'
import { ProductForm } from './components/product-form.jsx'
import { prismadb } from '@/lib/db.server.js'

const ProductPage = async ({ params }) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId
    },
    include: {
      images: true,
      color: true,
      size: true,
      category: true
    }
  })
  console.log('initialDataaaa', product)

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    }
  })
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId
    }
  })
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId
    }
  })

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={product} />
      </div>
    </div>
  )
}

export default ProductPage