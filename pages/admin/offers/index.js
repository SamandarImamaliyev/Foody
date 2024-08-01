import React, { useEffect } from 'react'
import styles from './offers.module.css'
import useCurrentPageStore from '../../../store/currentPageStore'
import AdminLayout from '../../../layout/admin/AdminLayout'
import Subheading from '../../../components/admin/Subheading'
import OffersItem from '../../../components/admin/OffersItem'

const Offers = () => {
  const { setCurrentPage } = useCurrentPageStore(state => {
    return state
  })

  useEffect(() => {
    setCurrentPage(7)
  }, [])
  return (
    <AdminLayout>
      <Subheading text={'Offers'} add={'Offer'} />
      <OffersItem />
    </AdminLayout>
  )
}

export default Offers
