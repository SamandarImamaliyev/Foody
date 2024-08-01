import React, { useEffect } from 'react'
import styles from './orderHistory.module.css'
import AdminLayout from '../../../layout/admin/AdminLayout'
import Subheading from '../../../components/admin/Subheading'
import useCurrentPageStore from '../../../store/currentPageStore'
import OrderHistoryItem from '../../../components/admin/OrderHistoryItem'

const OrderHistory = () => {
  const { setCurrentPage } = useCurrentPageStore(state => {
    return state
  })

  useEffect(() => {
    setCurrentPage(6)
  }, [])
  return (
    <AdminLayout>
      <Subheading text={'Order History'} />
      <OrderHistoryItem />
    </AdminLayout>
  )
}

export default OrderHistory
