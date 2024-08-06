import React, { useEffect, useState } from 'react'
import styles from './restaurantPopup.module.css'
import UploadFile from '../../UploadFile'
import showRestaurantPopupStore from '../../../../store/showRestaurantPopupStore'
import { montserrat, roboto, mukta } from '../../../../helper/font'
import useImageStore from '../../../../store/imageStore/imageStore'
import { addRestaurantToDB, getCategories } from '../../../../services/axios'
import toast from 'react-hot-toast'
import useDeleteModalStore from '../../../../store/deleteModalStore/deleteModalStore'

const RestaurantPopup = () => {

  const [categories, setCategories] = useState([]);
  const { setShowRestaurantPopup } = showRestaurantPopupStore(state => {
    return state
  })
  const { refresh, setRefresh } = useDeleteModalStore();
  const { imageUrl, setImageUrl } = useImageStore();
  const [data, setData] = useState({
    name: "",
    cuisine: "",
    delivery_price: 0.00,
    delivery_min: 0.00,
    img_url: "",
    address: "",
    category_id: ""
  })

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
      toast.error("Invalid product name")
    } else if (data.cuisine.trim().length < 2) {
      toast.error("Invalid cuisine")
    } else if (data.img_url == null || data.img_url?.trim().length === 0) {
      toast.error("Invalid image URL")
    } else if (data.category_id.trim().length === 0) {
      toast.error("Please, select category")
    } else if (data.delivery_price < 0) {
      toast.error("Invalid price")
    } else if (data.delivery_min < 1) {
      toast.error("Add delivery minutes")
    } else if (data.address.trim().length < 3) {
      toast.error("Invalid address")
    } else {
      const response = await addRestaurantToDB(data);

      if (response?.status === 201) {
        toast.success("Product successfully added")
        setImageUrl(null)
        setShowRestaurantPopup(false)
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
              setShowRestaurantPopup(false)
            }}
          >
            &times;
          </button>
          <div>Add restaurant</div>
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
            <div className={styles.descText}>
              Add your Restuarants information
            </div>
            <div className={styles.info}>
              <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                <label htmlFor='name'>Name</label>
                <input value={data.name} type='text' id='name'
                  onChange={(e) => {
                    setData({ ...data, name: e.target.value })
                  }}
                />
              </div>

              <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                <label htmlFor='desc'>Cuisine</label>
                <textarea value={data.cuisine} type='text' id='desc' style={{ height: '133px' }}
                  onChange={(e) => {
                    setData({ ...data, cuisine: e.target.value })
                  }}
                />
              </div>

              <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                <label htmlFor='price'>Delivery price $</label>
                <input type='number' id='price' value={data.delivery_price} onChange={(e) => {
                  setData({ ...data, delivery_price: e.target.value })
                }} />
              </div>
              <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                <label htmlFor='minute'>Delivery minute</label>
                <input type='number' id='minute' value={data.delivery_min}
                  onChange={(e) => {
                    setData({ ...data, delivery_min: e.target.value })
                  }} />
              </div>
              <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                <label htmlFor='address'>Address</label>
                <input type='text' id='address' value={data.address}
                  onChange={(e) => {
                    setData({ ...data, address: e.target.value })
                  }} />
              </div>
              <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                <label htmlFor='restaurant'>Category</label>
                <select id='restaurant' className={styles.select} onChange={(e) => {
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
            setImageUrl(null)
          }}>Cancel</button>
          <button className={styles.create} onClick={() => { addRestaurant(data) }}>Create Restaurant</button>
        </div>
      </div>
    </div>
  )
}

export default RestaurantPopup
