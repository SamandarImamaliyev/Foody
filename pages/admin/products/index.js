import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../layout/admin/AdminLayout'
import Subheading from '../../../components/admin/Subheading'
import useTypeStore from '../../../store/typeStore'
import ProductItem from '../../../components/admin/ProductItem'
import { getProductsFromDB, getRestaurantById } from '../../../services/axios'
import useCurrentPageStore from '../../../store/currentPageStore'
import useDeleteModalStore from '../../../store/deleteModalStore/deleteModalStore'

const Products = () => {
  const [restaurant, setRestaurant] = useState({})
  const [products, setProducts] = useState([])

  const { refresh } = useDeleteModalStore();
  useEffect(() => {
    getAllProducts()
  }, [refresh])

  const { setCurrentPage } = useCurrentPageStore(state => {
    return state
  })

  useEffect(() => {
    getAllProducts()
    setCurrentPage(2)
  }, [])

  const { getRestaurantState, setStateName, states } = useTypeStore(state => {
    return state
  })
  const handleClick = () => {
    getRestaurantState()
  }

  const getAllProducts = async () => {
    const response = await getProductsFromDB();
    setProducts(response.data.result.data)
  }

  const getProductsByRestaurant = async restaurantId => {
    const restaurantData = await getRestaurantById(restaurantId)
    const restaurant = restaurantData.data.result.data
    setRestaurant(restaurant)
    const products = restaurant.products
    setProducts(products)
  }
  return (
    <AdminLayout>
      <Subheading
        text={'Products'}
        type={'Restaurant'}
        handleClick={handleClick}
        handleSearchByType={getProductsByRestaurant}
      />
      <ProductItem products={products} restaurant={restaurant} />
    </AdminLayout>
  )
}

export default Products
