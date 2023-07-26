'use client'

import { useOrigin } from "@/hooks/use-origin"
import { useParams } from "next/navigation"
import { ApiAlert } from "./api-alert"

export const ApiList = ({ entityName, entityIdName }) => {
  const params = useParams()
  const origin = useOrigin()

  const baseUrl = `${origin}/api/${params.storeId}`

  return (
    <>
      <ApiAlert
        title='GET'
        variant='Public'
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title='GET'
        variant='Public'
        description={`${baseUrl}/${entityName}/${entityIdName}`}
      />
      <ApiAlert
        title='POST'
        variant='Admin'
        description={`${baseUrl}/${entityName}/`}
      />
      <ApiAlert
        title='PATCH'
        variant='Admin'
        description={`${baseUrl}/${entityName}/${entityIdName}`}
      />
      <ApiAlert
        title='DELETE'
        variant='Admin'
        description={`${baseUrl}/${entityName}/${entityIdName}`}
      />
    </>
  )
}
