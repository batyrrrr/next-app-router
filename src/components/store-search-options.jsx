import React from 'react'

const StoreSearchOptions = ({ formattedItems }) => {
  const name = formattedItems.label
  return (
    <p>{name}</p>
  )
}

export default StoreSearchOptions