

import { prismadb } from "@/lib/db.server";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const { userId } = auth()
    const body = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    if (!body.value) {
      return new NextResponse('Name is required', { status: 400 })
    }
    const stors = await prismadb.store.create({
      data: {
        name: body.value,
        userId
      }
    })

    return NextResponse.json(stors)

  } catch (error) {
    console.log('[STORES_POST]', error)
    return new NextResponse('Error', { status: 500 })
  }
}