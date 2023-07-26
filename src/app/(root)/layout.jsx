import { prismadb } from '@/lib/db.server'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

const SetupLayout = async ({ children }) => {
  const { userId } = auth()
  if (!userId) {
    redirect('/')
  }


  const store = await prismadb.store.findFirst({
    where: {
      userId: userId
    }
  })
  console.log(store)
  if (store) {
    redirect(`/${store.id}`)
  }

  return (
    <div>{children}</div>
  )
}

export default SetupLayout