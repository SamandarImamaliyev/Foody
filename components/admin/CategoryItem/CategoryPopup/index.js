import React, { useEffect, useState } from 'react'
import styles from './categoryPopup.module.css'
import UploadFile from '../../UploadFile'
import showCategoryPopupStore from '../../../../store/showCategoryPopupStore'
import { montserrat, roboto, mukta } from '../../../../helper/font'
import useDeleteModalStore from '../../../../store/deleteModalStore/deleteModalStore'
import useImageStore from '../../../../store/imageStore/imageStore'
import { postCategory } from '../../../../services/axios'
import toast from 'react-hot-toast'

const CategoryPopup = () => {
  const { setShowCategoryPopup } = showCategoryPopupStore(state => {
    return state
  })
  const { refresh, setRefresh } = useDeleteModalStore();
  const { imageUrl, setImageUrl } = useImageStore();
  const [data, setData] = useState({
    name: "",
    img_url: "",
  })

  useEffect(() => {
    setData({ ...data, img_url: imageUrl })
  }, [imageUrl])

  const addCategory = async (data) => {

    if (data.name.trim().length < 2) {
      toast.error("Invalid product name")
    } else if (data.img_url == null || data.img_url?.trim().length === 0) {
      toast.error("Invalid image URL")
    } else {
      const response = await postCategory(data);

      if (response?.status === 201) {
        toast.success("Category successfully added")
        setImageUrl(null)
        setShowCategoryPopup(false)
        setRefresh(!refresh)
      }
    }

  }
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
          <div className='flex flex-col sm:justify-between sm:flex-row mt-10 sm:pe-[50px]'>
            <div className={styles.uploadImageText}>
              {imageUrl ?
                <img src={imageUrl} style={{ height: "122px", width: "180px", objectFit: 'cover' }} />
                : "Upload image"}
            </div>
            <div className={styles.uploadFile}>
              <UploadFile />
            </div>
          </div>
          <div className='mt-10 sm:mt-16 flex flex-col sm:flex-row sm:justify-between sm:pe-[50px]'>
            <div style={{ width: '257px', fontSize: '18px' }}>
              Add your Category information
            </div>
            <div className={styles.info}>
              <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' onChange={(e) => {
                  setData({ ...data, name: e.target.value })
                }}
                />
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
          <button className={styles.cancel} onClick={() => {
            setShowCategoryPopup(false)
            setImageUrl(null)
          }}>Cancel</button>
          <button className={styles.create} onClick={() => { addCategory(data) }}>Create Category</button>
        </div>
      </div>
    </div>
  )
}

export default CategoryPopup
