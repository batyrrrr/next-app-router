'use client'
import { Heading } from '@/components/ui/heading'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import { useParams, useRouter } from 'next/navigation'
import DataTable from './data-table'
import { ApiList } from '@/components/ui/api-list'




export const ColorsClient = ({ data }) => {
  const router = useRouter()
  const params = useParams()


  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Цвет - ${data.length}`}
          description='Управление цветами для вашего магазина'
        />
        <Button
          variant='outlined'
          onClick={() => router.push(`/${params.storeId}/colors/new`)}
        >Добавить
        </Button>
      </div>
      <Divider />
      <DataTable data={data} />
      <Heading
        title='API'
        description='API calls for Colors'
      />
      <Divider />
      <ApiList entityName='colors' entityIdName='colorsId' />
    </>
  )
}
