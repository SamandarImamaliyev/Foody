import React from 'react'
import styles from './add.module.css'
import RestaurantPopup from '../../RestaurantItem/RestaurantPopup'
import showRestaurantPopupStore from '../../../../store/showRestaurantPopupStore'
import showCategoryPopupStore from '../../../../store/showCategoryPopupStore'
import CategoryPopup from '../../CategoryItem/CategoryPopup'
import useShowOffersPopupStore from '../../../../store/showOffersPopupStore'
import OffersPopup from '../../OffersItem/OffersPopup'

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
  const { setShowOffersPopup, showOffersPopup } = useShowOffersPopupStore(
    state => {
      return state
    }
  )

  const setPopup = () => {
    if (add === 'Restaurant') {
      setShowRestaurantPopup(true)
    } else if (add === 'Category') {
      setShowCategoryPopup(true)
    } else if (add === 'Offer') {
      setShowOffersPopup(true)
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
      {showOffersPopup && <OffersPopup />}
    </div>
  )
}

export default Add
