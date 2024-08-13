'use client'
import React, { useEffect, useState } from 'react'
import styles from './productItem.module.css'
import ProductCard from './ProductCard'
import { Pagination, Stack } from '@mui/material'

const ProductItem = ({ products }) => {
  const itemsPerPage = 12
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const subset = products.slice(startIndex, endIndex)
  useEffect(() => {
    setTotalPages(Math.ceil(products.length / itemsPerPage))
  })

  const paginated = (event, value) => {
    setCurrentPage(value - 1)
  }

  const main = {
    '& .MuiPaginationItem-root': {
      color: '#fff'
    }
  }
  return (
    <div className='flex flex-col'>
      <div className={styles.products}>
        {subset.map((product, index) => (
          <div key={index}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <div className='flex justify-center'>
        {totalPages > 1 && (
          <Stack spacing={2} sx={{ marginTop: '70px' }}>
            <Pagination
              count={totalPages}
              color='secondary'
              sx={main}
              size='large'
              style={{ color: 'white' }}
              onChange={paginated}
            />
          </Stack>
        )}
      </div>
    </div>
  )
}

export default ProductItem
