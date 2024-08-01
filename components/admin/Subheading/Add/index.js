import React, { useState } from 'react'
import styles from './add.module.css'
import HeaderPopUp from '../../Header/HeaderPopUp'
import showPopupStore from '../../../../store/showPopupStore'
import RestaurantPopup from '../../RestaurantItem/RestaurantPopup'
import showRestaurantPopupStore from '../../../../store/showRestaurantPopupStore'
import showCategoryPopupStore from '../../../../store/showCategoryPopupStore'
import CategoryPopup from '../../CategoryItem/CategoryPopup'

const Add = ({ add }) => {
  const { setShowRestaurantPopup, showRestaurantPopup } =
    showRestaurantPopupStore(state => {
      return state
    })
  const { setShowCategoryPopup, showCategoryPopup } = showCategoryPopupStore(
    state => {
      return state
    }
  )
  // const { setShowOfferPopup, showOfferPopup } = showOfferPopupStore(state => {
  //   return state
  // })

  const setPopup = () => {
    if (add === 'Restaurant') {
      setShowRestaurantPopup(true)
    } else if (add === 'Category') {
      setShowCategoryPopup(true)
    } else if (add === 'Offer') {
      setShowOfferPopup(true)
    }
  }
  return (
    <div>
      <button
        className={styles.addButton}
        onClick={() => {
          setPopup()
        }}
      >
        <div className={styles.text}>
          <div style={{ fontSize: '18px' }}>+</div>
          <div>Add {add}</div>
        </div>
      </button>
      {showRestaurantPopup && <RestaurantPopup />}
      {showCategoryPopup && <CategoryPopup />}
    </div>
  )
}

export default Add
