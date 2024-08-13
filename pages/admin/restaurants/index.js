'use client'

import React, { useEffect, useState } from 'react'
import Subheading from '../../../components/admin/Subheading'
import AdminLayout from '../../../layout/admin/AdminLayout'
import RestaurantItem from '../../../components/admin/RestaurantItem'
import { getCategoryById, getRestaurants } from '../../../services/axios'
import useTypeStore from '../../../store/typeStore'
import useCurrentPageStore from '../../../store/currentPageStore'
import useDeleteModalStore from '../../../store/deleteModalStore/deleteModalStore'

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([])
  const { getCategoryState, setStateName, states } = useTypeStore(state => {
    return state
  })
  const { refresh } = useDeleteModalStore();

  const { setCurrentPage } = useCurrentPageStore(state => {
    return state
  })
  useEffect(() => {
    showAllRestaurants()
  }, [refresh])

  const showAllRestaurants = async () => {
    const allRestaurants = await getRestaurants()
    const restaurants = allRestaurants.data.result.data
    setRestaurants(restaurants)
  }
  useEffect(() => {
    showAllRestaurants()
    setCurrentPage(3)
  }, [])

  const handleClick = async () => {
    getCategoryState()
  }
  const getRestaurantsByCategoryId = async categoryId => {
    const restaurantsData = await getRestaurants()
    const restaurants = restaurantsData.data.result.data
    const filteredRestaurants = restaurants?.filter(restaurant => {
      return restaurant.category_id == categoryId
    })
    setRestaurants(filteredRestaurants)
  }
  return (
    <AdminLayout>
      <Subheading
        text={'Restaurants'}
        type={'Category'}
        add={'Restaurant'}
        handleClick={handleClick}
        handleSearchByType={getRestaurantsByCategoryId}
      />
      <RestaurantItem restaurants={restaurants} />
    </AdminLayout>
  )
}

export default Restaurants
