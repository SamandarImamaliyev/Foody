"use client"

import React, { useEffect, useState } from 'react'
import styles from './categoryPopup.module.css'
import UploadFile from '../../UploadFile'
import showCategoryPopupStore from '../../../../store/showCategoryPopupStore'
import { montserrat, roboto, mukta } from '../../../../helper/font'
import useDeleteModalStore from '../../../../store/deleteModalStore/deleteModalStore'
import useImageStore from '../../../../store/imageStore/imageStore'
import { postCategory, updateCategory } from '../../../../services/axios'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import UploadingIcon from '../../UploadFile/UploadingIcon'
import { errorMessajeContainer, succesMessajeContainer } from '../../../../helper/toastMessageContainer'

const CategoryPopup = ({ editData, setEditData }) => {
  const { t } = useTranslation();
  const { setShowCategoryPopup } = showCategoryPopupStore(state => {
    return state
  })
  const { refresh, setRefresh } = useDeleteModalStore();
  const { imageUrl, setImageUrl } = useImageStore();
  const [uploading, setUploading] = React.useState(false);
  const [data, setData] = useState({
    name: "",
    img_url: "",
  })

  useEffect(() => {
    if (editData) {
      setImageUrl(editData.img_url)
    }
  }, [])

  useEffect(() => {
    setData({ ...data, img_url: imageUrl })
  }, [imageUrl])

  const addCategory = async (data) => {

    if (data.name.trim().length < 2) {
      toast.error("Invalid product name", errorMessajeContainer)
    } else if (data.img_url == null || data.img_url?.trim().length === 0) {
      toast.error("Invalid image URL", errorMessajeContainer)
    } else {
      setUploading(true)

      const response = await postCategory(data);

      if (response?.status === 201) {
        toast.success("Category successfully added", succesMessajeContainer)
        setImageUrl(null)
        setShowCategoryPopup(false)
        setRefresh(!refresh)
        setUploading(false)
      }
    }

  }

  const editCategory = async (data) => {

    if (data.name.trim().length < 2) {
      toast.error("Invalid product name", errorMessajeContainer)
    } else if (data.img_url == null || data.img_url?.trim().length === 0) {
      console.log(data.img_url)
      toast.error("Invalid image URL", errorMessajeContainer)
    } else {
      setUploading(true)
      const response = await updateCategory(editData.id, data);

      if (response?.status === 200) {
        toast.success("Category successfully updated", succesMessajeContainer)
        setImageUrl(null)
        setShowCategoryPopup(false)
        setRefresh(!refresh)
        setEditData(null)
        setUploading(false)
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
              setEditData(null)
              setImageUrl(null)
              setShowCategoryPopup(false)
            }}
          >
            &times;
          </button>
          <h2> {t("add category")}</h2>
        </div>
        <div className={styles.modalBody}>
          {uploading ? <div className='h-[200px] sm:h-[480px] flex items-center justify-center'><UploadingIcon /></div>
            :
            <div>
              <div className='flex flex-col sm:justify-between sm:flex-row mt-10 sm:pe-[50px]'>
                <div className={styles.uploadImageText}>
                  {editData ?
                    imageUrl ?
                      <img src={imageUrl} style={{ height: "122px", width: "180px", objectFit: 'cover' }} />
                      :
                      <img src={editData.img_url} style={{ height: "122px", width: "180px", objectFit: 'cover' }} />

                    :
                    imageUrl ?
                      <img src={imageUrl} style={{ height: "122px", width: "180px", objectFit: 'cover' }} />
                      : t("upload image")
                  }
                </div>
                <div className={styles.uploadFile}>
                  <UploadFile />
                </div>
              </div>
              <div className='mt-10 sm:mt-16 flex flex-col sm:flex-row sm:justify-between sm:pe-[50px]'>
                <div style={{ width: '257px', fontSize: '18px' }}>
                  {t("category information")}
                </div>
                <div className={styles.info}>
                  <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                    <label htmlFor='name'> {t("category name")}</label>
                    <input type='text' id='name' value={editData ? editData.name : data.name} onChange={(e) => {
                      editData ?
                        setEditData({ ...editData, name: e.target.value })
                        :
                        setData({ ...data, name: e.target.value })
                    }}
                    />
                  </div>
                </div>
              </div>
            </div>
          }
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
            setEditData(null)
            setImageUrl(null)
          }}>{t("cancel")}</button>
          <button className={styles.create} onClick={() => {
            editData ?
              editCategory(editData)
              :
              addCategory(data)
          }}>{editData ? t("update category") : t("create category")}</button>
        </div>
      </div>
    </div>
  )
}

export default CategoryPopup
