'use client'
import React, { useEffect, useState } from 'react'
import styles from './restaurantCard.module.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteModal from '../../DeleteModal'
import useTypeStore from '../../../../store/typeStore'
import { deleteRestaurantById, getCategoryById } from '../../../../services/axios'
import toast from 'react-hot-toast'
import showRestaurantPopupStore from '../../../../store/showRestaurantPopupStore'
import RestaurantPopup from '../RestaurantPopup'
import { errorMessajeContainer, succesMessajeContainer } from '../../../../helper/toastMessageContainer'
import useEditDataStore from '../../../../store/editDataStore/editDataStore'

const RestaurantCard = ({ restaurant }) => {
  const { stateName, setStateName } = useTypeStore(state => {
    return state
  })
  const [activateModal, setActivateModal] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [restaurantId, setRestaurantId] = useState('')
  const { editData, setEditData } = useEditDataStore(state => {
    return state;
  })

  const { setShowEditRestaurantPopup } = showRestaurantPopupStore(state => {
    return state
  })

  const deleteRestaurant = async (id) => {
    const response = await deleteRestaurantById(id);
    if (response.status == 204) {
      toast.success("Restaurant successfully deleted", succesMessajeContainer)
    } else {
      toast.error(response.statusText, errorMessajeContainer)
    }
  }

  const [categoryName, setCategoryName] = useState()

  const getCategory = async () => {
    const response = await getCategoryById(restaurant.category_id)
    setCategoryName(response.data.result.data.name)
  }
  useEffect(() => {
    getCategory()
    setStateName("")
  }, [])

  return (
    <>
      <div className={styles.card}>
        <div className={styles.restaurantInfo}>
          <div className={styles.allImages}>
            <img
              src={restaurant.img_url}
              alt='restaurant logo'
              className={styles.image}
            />
          </div>
          <div style={{ width: '150px' }}>
            <div className={styles.restaurantName}>{restaurant.name}</div>
            <div className={styles.category}>{stateName.trim().length > 0 ? stateName : categoryName}</div>
          </div>
        </div>

        <div className='flex flex-col justify-between my-3 me-[5px]'>
          <div className={styles.delete}>
            <DeleteForeverIcon
              style={{ color: '#EB5757' }}
              onClick={() => {
                setActivateModal(true)
                setOpenModal(!openModal)
                setRestaurantId(restaurant.id)
              }}
            />
          </div>
          <div className={styles.edit}>
            <BorderColorIcon style={{ color: '#00B2A9' }}
              onClick={() => {
                setEditData(restaurant)
                setShowEditRestaurantPopup(true)
              }}
            />
          </div>
        </div>
        {activateModal && <DeleteModal id={restaurantId} deleteItem={deleteRestaurant} openModal={openModal} />}
      </div>
    </>

  )
}

export default RestaurantCard
