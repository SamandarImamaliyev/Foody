import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../layout/admin/AdminLayout'
import Subheading from '../../../components/admin/Subheading'
import useTypeStore from '../../../store/typeStore'
import ProductItem from '../../../components/admin/ProductItem'
import { getProductsFromDB, getRestaurantById } from '../../../services/axios'
import useCurrentPageStore from '../../../store/currentPageStore'
import useDeleteModalStore from '../../../store/deleteModalStore/deleteModalStore'

const Products = () => {
  const [products, setProducts] = useState([])

  const { refresh, setRefresh } = useDeleteModalStore();
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

  const { getRestaurantState, setStateName } = useTypeStore(state => {
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
    const productsData = await getProductsFromDB()
    const products = productsData.data.result.data
    const filteredProducts = products?.filter(product => {
      return product.rest_id == restaurantId
    })
    setProducts(filteredProducts);
  }
  return (
    <AdminLayout>
      <Subheading
        text={'Products'}
        type={'Restaurant'}
        handleClick={handleClick}
        handleSearchByType={getProductsByRestaurant}
      />
      <ProductItem products={products} />
    </AdminLayout>
  )
}

export default Products
