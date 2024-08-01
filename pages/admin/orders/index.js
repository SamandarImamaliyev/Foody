'use client'

import React, { useEffect } from 'react'
import stylse from './orders.module.css'
import AdminLayout from '../../../layout/admin/AdminLayout'
import Subheading from '../../../components/admin/Subheading'
import OrdersItem from '../../../components/admin/OrdersItem'
import useCurrentPageStore from '../../../store/currentPageStore'

const Orders = () => {
  const { setCurrentPage } = useCurrentPageStore(state => {
    return state
  })

  useEffect(() => {
    setCurrentPage(5)
  }, [])
  return (
    <AdminLayout>
      <Subheading text={'Orders'} />
      <OrdersItem />
    </AdminLayout>
  )
}

export default Orders
