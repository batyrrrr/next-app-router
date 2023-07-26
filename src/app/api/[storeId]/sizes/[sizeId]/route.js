
import { prismadb } from "@/lib/db.server"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
  try {
    if (!params.sizeId) {
      return new NextResponse('sizeId id is required', { status: 400 })
    }


    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId,
      }
    })
    return new Response(JSON.stringify(size))

  } catch (error) {
    console.log('[SIZES_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}



export async function PATCH(req, { params }) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name, value } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }
    if (!name) {
      return new NextResponse('name is required', { status: 400 })
    }

    if (!value) {
      return new NextResponse('imageUrl is required', { status: 400 })
    }

    if (!params.sizeId) {
      return new NextResponse('sizeId id is required', { status: 400 })
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

    const size = await prismadb.size.updateMany({
      where: {
        id: params.sizeId
      },
      data: {
        name,
        value
      }
    })
    return NextResponse.json(size)

  } catch (error) {
    console.log('[SIZE_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!params.sizeId) {
      return new NextResponse('sizeId id is required', { status: 400 })
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

    const size = await prismadb.size.deleteMany({
      where: {
        id: params.sizeId,
      }
    })
    return NextResponse.json(size)

  } catch (error) {
    console.log('[SIZE_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}