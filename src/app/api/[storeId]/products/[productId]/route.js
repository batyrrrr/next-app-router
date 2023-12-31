
import { prismadb } from "@/lib/db.server"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function GET(req, { params }) {
  try {
    if (!params.productId) {
      return new NextResponse('productId id is required', { status: 400 })
    }


    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true
      }
    })
    return new Response(JSON.stringify(product))

  } catch (error) {
    console.log('[PRODUCT_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}



export async function PATCH(req, { params }) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name, price, categoryId, colorId, sizeId, images, isFeatured, isArchived } = body


    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }
    // if (!name) {
    //   return new NextResponse('label is required', { status: 400 })
    // }
    // if (!price) {
    //   return new NextResponse('iamgeUrl is required', { status: 400 })
    // }
    // if (!categoryId) {
    //   return new NextResponse('iamgeUrl is required', { status: 400 })
    // }
    // if (!sizeId) {
    //   return new NextResponse('iamgeUrl is required', { status: 400 })
    // }
    // if (!colorId) {
    //   return new NextResponse('colorId is required', { status: 400 })
    // }
    // if (!images || !images.length) {
    //   return new NextResponse('images is required', { status: 400 })
    // }
    // if (!isFeatured) {
    //   return new NextResponse('isFeatured is required', { status: 400 })
    // }
    // if (!isArchived) {
    //   return new NextResponse('isArchived is required', { status: 400 })
    // }

    // if (!params.productId) {
    //   return new NextResponse('productId id is required', { status: 400 })
    // }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    await prismadb.material.update({
      where: {
        id: params.productId
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {}
        },
        isFeatured,
        isArchived
      }

    })

    const product = await prismadb.update({
      where: {
        id: params.productId
      },
      data: {
        images: {
          createMany: {
            data: [
              ...images.map((image) => image)
            ]
          }
        }
      }
    })

    return NextResponse.json(product)

  } catch (error) {
    console.log('[PRODUCT_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!params.productId) {
      return new NextResponse('productId id is required', { status: 400 })
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const product = await prismadb.material.deleteMany({
      where: {
        id: params.productId,
      }
    })
    return NextResponse.json(product)

  } catch (error) {
    console.log('[PRODUCT_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}