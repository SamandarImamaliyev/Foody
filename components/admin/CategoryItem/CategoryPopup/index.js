import React from 'react'
import styles from './categoryPopup.module.css'
import UploadFile from '../../UploadFile'
import showCategoryPopupStore from '../../../../store/showCategoryPopupStore'
import { montserrat, roboto, mukta } from '../../../../helper/font'

const CategoryPopup = () => {
  const { setShowCategoryPopup } = showCategoryPopupStore(state => {
    return state
  })
  return (
    <div className={`${styles.modal} ${roboto.className}`}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <button
            className={styles.close}
            onClick={() => {
              setShowCategoryPopup(false)
            }}
          >
            &times;
          </button>
          <h2>Add Category</h2>
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
              Add your Category information
            </div>
            <div className={styles.info}>
              <div className='flex flex-col w-[546px]'>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            margin: '25px',
            marginTop: '325px',
            background: '#43445A',
            height: '1px'
          }}
        ></div>
        <div className={styles.modalFooter}>
          <button className={styles.cancel}>Cancel</button>
          <button className={styles.create}>Create Category</button>
        </div>
      </div>
    </div>
  )
}

export default CategoryPopup
