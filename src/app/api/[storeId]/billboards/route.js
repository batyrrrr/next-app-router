
import { prismadb } from "@/lib/db.server";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(req, { params }) {

  try {
    const { userId } = auth()
    const body = await req.json()
    const { label, imageUrl } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }
    if (!label) {
      return new NextResponse('label is required', { status: 400 })
    }
    if (!imageUrl) {
      return new NextResponse('iamgeUrl is required', { status: 400 })
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


    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId
      }
    })

    return NextResponse.json(billboard)

  } catch (error) {
    console.log('[BILLBOARDS_POST]', error)
    return new NextResponse('Error', { status: 500 })
  }
}

export async function GET(req, { params }) {

  try {
    if (!params.storeId) {
      return new NextResponse('storeId is required', { status: 400 })
    }


    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId
      }
    })

    return NextResponse.json(billboards)

  } catch (error) {
    console.log('[BILLBOARDS_GET]', error)
    return new NextResponse('Error', { status: 500 })
  }
}