"use client"

import React, { useEffect, useRef, useState } from 'react'
import styles from './restaurantPopup.module.css'
import UploadFile from '../../UploadFile'
import showRestaurantPopupStore from '../../../../store/showRestaurantPopupStore'
import { montserrat, roboto, mukta } from '../../../../helper/font'
import useImageStore from '../../../../store/imageStore/imageStore'
import { addRestaurantToDB, getCategories, updateRestaurant } from '../../../../services/axios'
import toast from 'react-hot-toast'
import useDeleteModalStore from '../../../../store/deleteModalStore/deleteModalStore'
import UploadingIcon from '../../UploadFile/UploadingIcon'
import { useTranslation } from 'react-i18next'
import { errorMessajeContainer, succesMessajeContainer } from '../../../../helper/toastMessageContainer'

const RestaurantPopup = ({ editData, setEditData }) => {
  const { t } = useTranslation();

  const [categories, setCategories] = useState([]);
  const { setShowRestaurantPopup, setShowEditRestaurantPopup } = showRestaurantPopupStore(state => {
    return state
  })
  const { refresh, setRefresh } = useDeleteModalStore();
  const { imageUrl, setImageUrl } = useImageStore();
  const [uploading, setUploading] = React.useState(false);
  const [data, setData] = useState({
    name: "",
    cuisine: "",
    delivery_price: "",
    delivery_min: "",
    img_url: "",
    address: "",
    category_id: ""
  })

  useEffect(() => {
    if (editData) {
      { setImageUrl(editData.img_url) }
    }
  }, [])

  useEffect(() => {
    setData({ ...data, img_url: imageUrl })
  }, [imageUrl])

  useEffect(() => {
    getAllCategories();
  }, [])

  const getAllCategories = async () => {
    const response = await getCategories();
    setCategories(response.data.result.data);
  }

  const addRestaurant = async (data) => {

    if (data.name.trim().length < 2) {
      toast.error("Invalid product name", errorMessajeContainer)
    } else if (data.cuisine.trim().length < 2) {
      toast.error("Invalid cuisine", errorMessajeContainer)
    } else if (data.img_url == null || data.img_url?.trim().length === 0) {
      toast.error("Invalid image URL", errorMessajeContainer)
    } else if (data.category_id.trim().length === 0) {
      toast.error("Please, select category", errorMessajeContainer)
    } else if (data.delivery_price < 0) {
      toast.error("Invalid price", errorMessajeContainer)
    } else if (data.delivery_min < 1) {
      toast.error("Add delivery minutes", errorMessajeContainer)
    } else if (data.address.trim().length < 3) {
      toast.error("Invalid address", errorMessajeContainer)
    } else {
      setUploading(true)
      const response = await addRestaurantToDB(data);

      if (response?.status === 201) {
        toast.success("Restaurant successfully added", succesMessajeContainer)
        setImageUrl(null)
        setShowRestaurantPopup(false)
        setRefresh(!refresh)
        setUploading(false)
      }
    }
  }

  const editRestaurant = async (data) => {

    if (data.name.trim().length < 2) {
      toast.error("Invalid product name", errorMessajeContainer)
    } else if (data.cuisine.trim().length < 2) {
      toast.error("Invalid cuisine", errorMessajeContainer)
    } else if (data.img_url == null || data.img_url?.trim().length === 0) {
      toast.error("Invalid image URL", errorMessajeContainer)
    } else if (data.category_id.trim().length === 0) {
      toast.error("Please, select category", errorMessajeContainer)
    } else if (data.delivery_price < 0) {
      toast.error("Invalid price", errorMessajeContainer)
    } else if (data.delivery_min < 1) {
      toast.error("Add delivery minutes", errorMessajeContainer)
    } else if (data.address.trim().length < 3) {
      toast.error("Invalid address", errorMessajeContainer)
    } else {
      setUploading(true)
      const response = await updateRestaurant(editData.id, data);

      if (response?.status === 200) {
        toast.success("Restaurant successfully added", succesMessajeContainer)
        setImageUrl(null)
        setShowEditRestaurantPopup(false)
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
              editData && setEditData(null)
              setImageUrl(null)
              setShowRestaurantPopup(false)
              setShowEditRestaurantPopup(false)
            }}
          >
            &times;
          </button>
          <div>{t("add restaurant")}</div>
        </div>
        <div className={styles.modalBody}>
          {uploading ? <div className='h-[200px] sm:h-[770px] flex items-center justify-center'><UploadingIcon /></div>
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
                <div className={styles.descText}>
                  {t("add your restaurant information")}
                </div>
                <div className={styles.info}>
                  <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                    <label htmlFor='name' > {t("name")}</label>
                    <input value={editData ? editData.name : data.name} type='text' id='name'
                      onChange={(e) => {
                        editData ?
                          setEditData({ ...editData, name: e.target.value })
                          :
                          setData({ ...data, name: e.target.value })
                      }}
                    />
                  </div>

                  <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                    <label htmlFor='desc'>{t("cuisine")}</label>
                    <textarea value={editData ? editData.cuisine : data.cuisine} type='text' id='desc' style={{ height: '133px' }}
                      onChange={(e) => {
                        editData ?
                          setEditData({ ...editData, cuisine: e.target.value })
                          :
                          setData({ ...data, cuisine: e.target.value })
                      }}
                    />
                  </div>

                  <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                    <label htmlFor='price'>{t("delivery price")} $</label>
                    <input type='text' id='price' value={editData ? editData.delivery_price : data.delivery_price} onChange={(e) => {
                      editData ?
                        setEditData({ ...editData, delivery_price: e.target.value })
                        :
                        setData({ ...data, delivery_price: e.target.value })
                    }} />
                  </div>
                  <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                    <label htmlFor='minute'>{t("delivery minute")}</label>
                    <input type='text' id='minute' value={editData ? editData.delivery_min : data.delivery_min}
                      onChange={(e) => {
                        editData ?
                          setEditData({ ...editData, delivery_min: e.target.value })
                          :
                          setData({ ...data, delivery_min: e.target.value })
                      }} />
                  </div>
                  <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                    <label htmlFor='address'>{t("address")}</label>
                    <input type='text' id='address' value={editData ? editData.address : data.address}
                      onChange={(e) => {
                        editData ?
                          setEditData({ ...editData, address: e.target.value })
                          :
                          setData({ ...data, address: e.target.value })
                      }} />
                  </div>
                  <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                    <label htmlFor='restaurant'>{t("category")}</label>
                    <select id='restaurant' className={styles.select} onChange={(e) => {
                      editData ?
                        setEditData({ ...editData, category_id: e.target.value })
                        :
                        setData({ ...data, category_id: e.target.value })
                    }}>
                      <option className={styles.option}>
                      </option>
                      {categories.map((category, index) => (
                        <option value={category.id} className={styles.option} key={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
        <div
          style={{
            margin: '25px',
            background: '#43445A',
            height: '1px'
          }}
        ></div>
        <div className={styles.modalFooter}>
          <button className={styles.cancel} onClick={() => {
            setShowRestaurantPopup(false)
            setShowEditRestaurantPopup(false)
            editData && setEditData(null)
            setImageUrl(null)
          }}>{t("cancel")}</button>
          <button className={styles.create} onClick={() => {
            editData ?
              editRestaurant(editData)
              :
              addRestaurant(data)
          }}>{t("create restaurant")}</button>
        </div>
      </div>
    </div>
  )
}

export default RestaurantPopup
