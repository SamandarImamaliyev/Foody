'use client'

import React, { useEffect, useState } from 'react'
import styles from './productCard.module.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteModal from '../../DeleteModal'
import { deleteProductById, getRestaurantById } from '../../../../services/axios'
import toast from 'react-hot-toast'
import useTypeStore from '../../../../store/typeStore'
import useShowPopupStore from '../../../../store/showPopupStore'
import useEditDataStore from '../../../../store/editDataStore/editDataStore'
import { errorMessajeContainer, succesMessajeContainer } from '../../../../helper/toastMessageContainer'
import useDeleteModalStore from '../../../../store/deleteModalStore/deleteModalStore'

const ProductCard = ({ product }) => {
  const [activateModal, setActivateModal] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [productId, setProductId] = useState('')

  const { editData, setEditData } = useEditDataStore(state => {
    return state;
  })

  const { setStateName, stateName } = useTypeStore(state => {
    return state
  })

  const { setShowEditProductPopup } = useShowPopupStore(state => {
    return state
  })
  const { refresh, setRefresh } = useDeleteModalStore();

  const deleteProduct = async (id) => {
    const response = await deleteProductById(id);
    if (response.status == 204) {
      toast.success("Product successfully deleted", succesMessajeContainer)
      setRefresh(!refresh)
    } else {
      toast.error(response.statusText, errorMessajeContainer)
    }
  }

  const [restaurantName, setRestaurantName] = useState()

  const getRestaurant = async () => {
    const response = await getRestaurantById(product.rest_id)
    setRestaurantName(response.data.result.data.name)
  }
  useEffect(() => {
    getRestaurant()
    setStateName("")
  }, [refresh])

  return (
    <div className={styles.productCard}>
      <div className='w-[196px] h-[279px] sm:w-[163px] sm:h-[245px] flex flex-col justify-between'>
        <div className='flex flex-col gap-2'>
          <img
            src={product.img_url}
            alt='product image'
            className={styles.productImage}
          />
          <div className={styles.productName}>{product.name}</div>
          <div className={styles.restaurantName}>{stateName.trim().length > 0 ? stateName : restaurantName}</div>
        </div>

        <div className='flex justify-between'>
          <span className={styles.price}>${product.price}</span>
          <div className='flex gap-2'>
            <div className={styles.edit}>
              <BorderColorIcon style={{ color: '#00B2A9' }} onClick={() => {
                setEditData(product)
                setShowEditProductPopup(true)
              }} />
            </div>
            <div className={styles.delete}>
              <DeleteForeverIcon
                style={{ color: '#EB5757' }}
                onClick={() => {
                  setActivateModal(true)
                  setOpenModal(!openModal)
                  setProductId(product.id)
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {activateModal && <DeleteModal id={productId} deleteItem={deleteProduct} openModal={openModal} />}
    </div>
  )
}

export default ProductCard
