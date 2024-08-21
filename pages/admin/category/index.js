'use client'

import React, { useEffect } from 'react'
import AdminLayout from '../../../layout/admin/AdminLayout'
import Subheading from '../../../components/admin/Subheading'
import CategoryItem from '../../../components/admin/CategoryItem'
import useCurrentPageStore from '../../../store/currentPageStore'

const Category = () => {
  const { setCurrentPage } = useCurrentPageStore(state => {
    return state
  })

  useEffect(() => {
    setCurrentPage(4)
  }, [])
  return (
    <AdminLayout>
      <Subheading text={'Category'} add={'Category'} />
      <CategoryItem />
    </AdminLayout>
  )
}

export default Category
