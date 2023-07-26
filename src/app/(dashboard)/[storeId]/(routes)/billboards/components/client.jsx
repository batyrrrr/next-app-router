'use client'
import { Heading } from '@/components/ui/heading'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import { useParams, useRouter } from 'next/navigation'
import DataTable from './data-table'
import { ApiList } from '@/components/ui/api-list'




export const BillboardClient = ({ data }) => {
  const router = useRouter()
  const params = useParams()


  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Панели ${data.length}`}
          description='Управление панелью'
        />
        <Button
          variant='outlined'
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >Добавить
        </Button>
      </div>
      <Divider />
      <DataTable data={data} />
      <Heading
        title='API'
        description='API calls for Billboards'
      />
      <Divider />
      <ApiList entityName='billboards' entityIdName='billboardId' />
    </>
  )
}
