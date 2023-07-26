import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { SettingsForm } from './components/settings-form'
import { prismadb } from '@/lib/db.server'

const SettingsPage = async ({ params }) => {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }
  const stores = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  })

  if (!stores) {
    redirect('/')
  }

  return (
    <div className='flex flex-col '>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={stores} />
      </div>
    </div>
  )
}

export default SettingsPage