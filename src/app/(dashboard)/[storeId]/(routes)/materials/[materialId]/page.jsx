import React from 'react'
import { MaterialForm } from './components/material-form.jsx'
import { prismadb } from '@/lib/db.server.js'

const MaterialPage = async ({ params }) => {
  const material = await prismadb.material.findUnique({
    where: {
      id: params.materialId
    },
    include: {
      images: true,
      color: true,
      size: true,
      category: true
    }
  })

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
        <MaterialForm
          initialData={material}
          categories={categories}
          colors={colors}
          sizes={sizes}

        />
      </div>
    </div>
  )
}

export default MaterialPage