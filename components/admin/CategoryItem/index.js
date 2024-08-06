'use client'
import React, { useState } from 'react'
import AdminTable from '../AdminTable'
import useTypeStore from '../../../store/typeStore'
import { deleteCategoryById } from '../../../services/axios'
import toast from 'react-hot-toast'

const CategoryItem = () => {
  const [categoryId, setCategoryId] = useState("")
  const { getCategoryState, states } = useTypeStore(state => {
    return state
  })

  const deleteCategory = async (id) => {
    const response = await deleteCategoryById(id);
    if (response.status == 204) {
      toast.success("Category successfully deleted")
    } else {
      toast.error(response.statusText)
    }
  }

  return (
    <div>
      <AdminTable ID={true} image={true} name={true} slug={true} items={states} getAllItems={getCategoryState} deleteItem={deleteCategory} itemId={categoryId} setItemId={setCategoryId} />
    </div>
  )
}

export default CategoryItem
