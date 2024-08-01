import React from 'react'
import styles from './restaurantPopup.module.css'
import UploadFile from '../../UploadFile'
import showRestaurantPopupStore from '../../../../store/showRestaurantPopupStore'
import { montserrat, roboto, mukta } from '../../../../helper/font'

const RestaurantPopup = () => {
  const { setShowRestaurantPopup } = showRestaurantPopupStore(state => {
    return state
  })
  return (
    <div className={`${styles.modal} ${roboto.className}`}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <button
            className={styles.close}
            onClick={() => {
              setShowRestaurantPopup(false)
            }}
          >
            &times;
          </button>
          <h2>Add restaurant</h2>
        </div>
        <div className={styles.modalBody}>
          <div className='flex justify-between mt-10 pe-[50px]'>
            <div style={{ fontSize: '18px' }}>Upload image</div>
            <div>
              <UploadFile />
            </div>
          </div>
          <div className='mt-16 flex justify-between pe-[50px]'>
            <div style={{ width: '257px', fontSize: '18px' }}>
              Add your Restuarants information
            </div>
            <div className={styles.info}>
              <div className='flex flex-col w-[546px]'>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' />
              </div>

              <div className='flex flex-col w-[546px]'>
                <label htmlFor='desc'>Cuisine</label>
                <textarea type='text' id='desc' style={{ height: '133px' }} />
              </div>

              <div className='flex flex-col w-[546px]'>
                <label htmlFor='price'>Delivery price $</label>
                <input type='number' id='price' />
              </div>
              <div className='flex flex-col w-[546px]'>
                <label htmlFor='minute'>Delivery minute</label>
                <input type='number' id='minute' />
              </div>
              <div className='flex flex-col w-[546px]'>
                <label htmlFor='address'>Address</label>
                <input type='text' id='address' />
              </div>
              <div className='flex flex-col w-[546px]'>
                <label htmlFor='restaurant'>Category</label>
                <select id='restaurant' className={styles.select}>
                  <option value='volvo' className={styles.option}>
                    Volvo
                  </option>
                  <option value='saab' className={styles.option}>
                    Saab
                  </option>
                  <option value='opel' className={styles.option}>
                    Opel
                  </option>
                  <option value='audi' className={styles.option}>
                    Audi
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            margin: '25px',
            background: '#43445A',
            height: '1px'
          }}
        ></div>
        <div className={styles.modalFooter}>
          <button className={styles.cancel}>Cancel</button>
          <button className={styles.create}>Create Restaurant</button>
        </div>
      </div>
    </div>
  )
}

export default RestaurantPopup
