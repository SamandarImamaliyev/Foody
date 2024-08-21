'use client'

import React, { useEffect, useState } from 'react'
import styles from './restaurantItem.module.css'
import RestaurantCard from './RestaurantCard'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import RestaurantPopup from './RestaurantPopup'
import showRestaurantPopupStore from '../../../store/showRestaurantPopupStore'
import useEditDataStore from '../../../store/editDataStore/editDataStore'

const RestaurantItem = ({ restaurants }) => {
  const itemsPerPage = 12
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const { showEditRestaurantPopup } = showRestaurantPopupStore(state => {
    return state
  })
  const { editData, setEditData } = useEditDataStore(state => {
    return state;
  })

  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const subset = restaurants.slice(startIndex, endIndex)
  useEffect(() => {
    setTotalPages(Math.ceil(restaurants.length / itemsPerPage))
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
    <>
      <div className='flex flex-col'>
        <div className={styles.restaurants}>
          {subset.map((restaurant, index) => (
            <div className={styles.cards} key={index}>
              <RestaurantCard restaurant={restaurant} />
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
      {showEditRestaurantPopup && <RestaurantPopup editData={editData} setEditData={setEditData} />}</>
  )
}

export default RestaurantItem
