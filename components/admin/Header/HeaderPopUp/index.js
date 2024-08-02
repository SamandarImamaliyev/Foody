import React from 'react'
import styles from './customPopUp.module.css'
import UploadFile from '../../UploadFile'
import useShowPopupStore from '../../../../store/showPopupStore'
import { montserrat, roboto, mukta } from '../../../../helper/font'

const HeaderPopUp = () => {
  const { setShowPopup } = useShowPopupStore(state => {
    return state
  })
  return (
    <div className={`${styles.modal} ${roboto.className}`}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <button
            className={styles.close}
            onClick={() => {
              setShowPopup(false)
            }}
          >
            &times;
          </button>
          <div>Add product</div>
        </div>
        <div className={styles.modalBody}>
          <div className='flex flex-col sm:justify-between sm:flex-row mt-10 sm:pe-[50px]'>
            <div className={styles.uploadImageText}>Upload your product image</div>
            <div className={styles.uploadFile}>
              <UploadFile />
            </div>
          </div>
          <div className='mt-10 sm:mt-16 flex flex-col sm:flex-row sm:justify-between sm:pe-[50px]'>
            <div className={styles.descText}>
              Add your Product description and necessary information
            </div>
            <div className={styles.info}>
              <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' />
              </div>

              <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                <label htmlFor='desc'>Description</label>
                <textarea type='text' id='desc' style={{ height: '133px' }} />
              </div>

              <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                <label htmlFor='price'>Price</label>
                <input type='number' id='price' />
              </div>
              <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                <label htmlFor='restaurant'>Restaurant</label>
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
          <button className={styles.create}>Create product</button>
        </div>
      </div>
    </div>
  )
}

export default HeaderPopUp
