
import { prismadb } from "@/lib/db.server";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(req, { params }) {

  try {
    const { userId } = auth()
    const body = await req.json()
    const { name, price, categoryId, colorId, sizeId, images, isFeatured, isArchived } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }
    if (!name) {
      return new NextResponse('label is required', { status: 400 })
    }
    if (!price) {
      return new NextResponse('iamgeUrl is required', { status: 400 })
    }
    if (!categoryId) {
      return new NextResponse('iamgeUrl is required', { status: 400 })
    }
    if (!sizeId) {
      return new NextResponse('iamgeUrl is required', { status: 400 })
    }
    if (!colorId) {
      return new NextResponse('colorId is required', { status: 400 })
    }
    if (!images || !images.length) {
      return new NextResponse('images is required', { status: 405 })
    }
    // if (!isFeatured) {
    //   return new NextResponse('isFeatured is required', { status: 400 })
    // }
    // if (!isArchived) {
    //   return new NextResponse('isArchived is required', { status: 400 })
    // }
    if (!params.storeId) {
      return new NextResponse('storeId is required', { status: 400 })
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


    const product = await prismadb.material.create({
      data: {
        name,
        price,
        sizeId,
        colorId,
        storeId: params.storeId,
        isFeatured,
        isArchived,
        categoryId,
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
    console.log('[PRODUCTS_POST]', error)
    return new NextResponse('Error', { status: 500 })
  }
}

export async function GET(req, { params }) {

  try {
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get('categoryId')
    const colorId = searchParams.get('colorId')
    const sizeId = searchParams.get('sizeId')
    const isFeatured = searchParams.get('isFeatured')
    if (!params.storeId) {
      return new NextResponse('storeId is required', { status: 400 })
    }


    const products = await prismadb.material.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(products)

  } catch (error) {
    console.log('[PRODUCTS_GET]', error)
    return new NextResponse('Error', { status: 500 })
  }
}