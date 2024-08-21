"use client"

import React, { useEffect, useState } from 'react'
import styles from './customPopUp.module.css'
import UploadFile from '../../UploadFile'
import useShowPopupStore from '../../../../store/showPopupStore'
import { montserrat, roboto, mukta } from '../../../../helper/font'
import { addProductToDB, getRestaurants, updateProduct } from '../../../../services/axios'
import useImageStore from '../../../../store/imageStore/imageStore'
import { toast } from 'react-hot-toast'
import useDeleteModalStore from '../../../../store/deleteModalStore/deleteModalStore'
import { useTranslation } from 'react-i18next'
import { errorMessajeContainer, succesMessajeContainer } from '../../../../helper/toastMessageContainer'
import UploadingIcon from '../../UploadFile/UploadingIcon'

const HeaderPopUp = ({ editData, setEditData }) => {
  const { t } = useTranslation();

  const [restaurants, setRestaurants] = useState([]);
  const { setShowPopup } = useShowPopupStore(state => {
    return state
  })
  const { setShowEditProductPopup } = useShowPopupStore(state => {
    return state
  })
  const { refresh, setRefresh } = useDeleteModalStore();
  const { imageUrl, setImageUrl } = useImageStore();
  const [uploading, setUploading] = React.useState(false);

  const getAllrestaurants = async () => {
    const response = await getRestaurants();
    setRestaurants(response.data.result.data);
  }

  useEffect(() => {
    if (editData) {
      { setImageUrl(editData.img_url) }
    }
  }, [])

  useEffect(() => {
    setData({ ...data, img_url: imageUrl })
  }, [imageUrl])

  useEffect(() => {
    getAllrestaurants();
  }, [])

  const [data, setData] = useState({
    name: "",
    description: "",
    img_url: "",
    rest_id: "",
    price: 0
  })

  const addProduct = async (data) => {

    if (data.name.trim().length < 2) {
      toast.error("Invalid product name", errorMessajeContainer)
    } else if (data.description.trim().length < 2) {
      toast.error("Invalid decription", errorMessajeContainer)
    } else if (data.img_url == null || data.img_url?.trim().length === 0) {
      toast.error("Invalid image URL", errorMessajeContainer)
    } else if (data.rest_id.trim().length === 0) {
      toast.error("Please, select restaurant", errorMessajeContainer)
    } else if (data.price < 0) {
      toast.error("Invalid price", errorMessajeContainer)
    } else {
      setUploading(true)
      const response = await addProductToDB(data);
      if (response?.status === 201) {
        toast.success("Product successfully added", succesMessajeContainer)
        setImageUrl(null)
        setShowPopup(false)
        setRefresh(!refresh)
        setUploading(false)
      }
    }
  }

  const editProduct = async (data) => {

    if (data.name.trim().length < 2) {
      toast.error("Invalid product name", errorMessajeContainer)
    } else if (data.description.trim().length < 2) {
      toast.error("Invalid decription", errorMessajeContainer)
    } else if (data.img_url == null || data.img_url?.trim().length === 0) {
      toast.error("Invalid image URL", errorMessajeContainer)
    } else if (data.rest_id.trim().length === 0) {
      toast.error("Please, select restaurant", errorMessajeContainer)
    } else if (data.price < 0) {
      toast.error("Invalid price", errorMessajeContainer)
    } else {
      setUploading(true)
      const response = await updateProduct(editData.id, data);
      if (response?.status === 200) {
        toast.success("Product successfully updated", succesMessajeContainer)
        setImageUrl(null)
        setShowEditProductPopup(false)
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
              setShowPopup(false)
              setShowEditProductPopup(false)
            }}
          >
            &times;
          </button>
          <div>{t("add product")}</div>
        </div>
        <div className={styles.modalBody}>
          {
            uploading ? <div className='h-[200px] sm:h-[770px] flex items-center justify-center'><UploadingIcon /></div>
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
                    {t("product desc")}
                  </div>
                  <div className={styles.info}>
                    <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                      <label htmlFor='name'>{t("name")}</label>
                      <input value={editData ? editData.name : data.name} type='text' id='name' onChange={(e) => {
                        editData ?
                          setEditData({ ...editData, name: e.target.value })
                          :
                          setData({ ...data, name: e.target.value })
                      }} />
                    </div>

                    <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                      <label htmlFor='desc'>{t("description")}</label>
                      <textarea value={editData ? editData.description : data.description} type='text' id='desc' style={{ height: '133px' }} onChange={(e) => {
                        editData ?
                          setEditData({ ...editData, description: e.target.value })
                          :
                          setData({ ...data, description: e.target.value })
                      }} />
                    </div>

                    <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                      <label htmlFor='price'>{t("price")}</label>
                      <input type='text' id='price' value={editData ? editData.price : data.price} onChange={(e) => {
                        editData ?
                          setEditData({ ...editData, description: e.target.value })
                          :
                          setData({ ...data, price: e.target.value })
                      }} />
                    </div>
                    <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                      <label htmlFor='restaurant'>{t("restaurant")}</label>
                      <select id='restaurant' className={styles.select} onChange={(e) => {
                        editData ?
                          setEditData({ ...editData, rest_id: e.target.value })
                          :
                          setData({ ...data, rest_id: e.target.value })
                      }}>
                        <option className={styles.option}>
                        </option>
                        {restaurants.map((restaurant, index) => (
                          <option value={restaurant.id} className={styles.option} key={restaurant.id}>
                            {restaurant.name}
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
            setShowPopup(false)
            setShowEditProductPopup(false)
            editData && setEditData(null)
            setImageUrl(null)
          }}>Cancel</button>
          <button className={styles.create} onClick={() => {
            editData ?
              editProduct(editData)
              :
              addProduct(data)
          }}>Create product</button>
        </div>
      </div>
    </div>
  )
}

export default HeaderPopUp
