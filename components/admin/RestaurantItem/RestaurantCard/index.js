'use client'
import React, { useState } from 'react'
import styles from './restaurantCard.module.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteModal from '../../DeleteModal'
import useTypeStore from '../../../../store/typeStore'

const RestaurantCard = ({ restaurant }) => {
  const { stateName } = useTypeStore(state => {
    return state
  })
  const [activateModal, setActivateModal] = useState(false)
  const [restaurantId, setRestaurantId] = useState('')
  return (
    <div className={styles.card}>
      <div className={styles.restaurantInfo}>
        <div>
          <img
            src={restaurant.img_url}
            alt='restaurant logo'
            className={styles.image}
          />
        </div>
        <div>
          <div className={styles.restaurantName}>{restaurant.name}</div>
          <div className={styles.category}>{stateName}</div>
        </div>
      </div>

      <div className='flex flex-col justify-between my-3 me-[5px]'>
        <div className={styles.delete}>
          <DeleteForeverIcon
            style={{ color: '#EB5757' }}
            onClick={() => {
              setActivateModal(true)
              setRestaurantId(restaurant.id)
            }}
          />
        </div>
        <div className={styles.edit}>
          <BorderColorIcon style={{ color: '#00B2A9' }} />
        </div>
      </div>
      {activateModal && <DeleteModal id={restaurantId} />}
    </div>
  )
}

export default RestaurantCard
