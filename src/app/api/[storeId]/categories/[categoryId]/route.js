
import { prismadb } from "@/lib/db.server"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
  try {
    if (!params.billboardId) {
      return new NextResponse('billboardId id is required', { status: 400 })
    }


    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      }
    })
    return new Response(JSON.stringify(billboard))

  } catch (error) {
    console.log('[BILLBOARD_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}



export async function PATCH(req, { params }) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name, billboardId } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }
    if (!name) {
      return new NextResponse('name is required', { status: 400 })
    }

    if (!billboardId) {
      return new NextResponse('billboardId is required', { status: 400 })
    }

    if (!params.categoryId) {
      return new NextResponse('categoryId  is required', { status: 400 })
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

    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId
      },
      data: {
        name,
        billboardId
      }
    })
    return NextResponse.json(category)

  } catch (error) {
    console.log('[CATEGORY_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!params.categoryId) {
      return new NextResponse('categoryId  is required', { status: 400 })
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

    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
      }
    })
    return NextResponse.json(category)

  } catch (error) {
    console.log('[CATEGORY_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}