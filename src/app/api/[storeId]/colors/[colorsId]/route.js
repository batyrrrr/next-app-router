
import { prismadb } from "@/lib/db.server"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
  try {
    if (!params.colorsId) {
      return new NextResponse('colorsId id is required', { status: 400 })
    }


    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorsId,
      }
    })
    return new Response(JSON.stringify(color))

  } catch (error) {
    console.log('[COLOR_GET]', error)
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

    if (!params.colorsId) {
      return new NextResponse('colorsId  is required', { status: 400 })
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

    const color = await prismadb.color.updateMany({
      where: {
        id: params.colorsId
      },
      data: {
        name,
        value
      }
    })
    return NextResponse.json(color)

  } catch (error) {
    console.log('[COLOR_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!params.colorsId) {
      return new NextResponse('colorsId id is required', { status: 400 })
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

    const color = await prismadb.color.deleteMany({
      where: {
        id: params.colorsId,
      }
    })
    return NextResponse.json(color)

  } catch (error) {
    console.log('[COLORS_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}