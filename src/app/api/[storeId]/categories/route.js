

import { prismadb } from "@/lib/db.server";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";



export async function POST(req, { params }) {

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


    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId
      }
    })

    return NextResponse.json(category)

  } catch (error) {
    console.log('[CATEGORY_POST]', error)
    return new NextResponse('Error', { status: 505 })
  }
}

export async function GET(req, { params }) {

  try {
    if (!params.storeId) {
      return new NextResponse('storeId is required', { status: 400 })
    }


    const categories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId
      }
    })

    return NextResponse.json(categories)

  } catch (error) {
    console.log('[BILLBOARDS_GET]', error)
    return new NextResponse('Error', { status: 500 })
  }
}