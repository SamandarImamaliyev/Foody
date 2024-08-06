import React, { useEffect, useState } from 'react'
import styles from './customPopUp.module.css'
import UploadFile from '../../UploadFile'
import useShowPopupStore from '../../../../store/showPopupStore'
import { montserrat, roboto, mukta } from '../../../../helper/font'
import { addProductToDB, getRestaurants } from '../../../../services/axios'
import useImageStore from '../../../../store/imageStore/imageStore'
import { toast } from 'react-hot-toast'
import useDeleteModalStore from '../../../../store/deleteModalStore/deleteModalStore'

const HeaderPopUp = () => {

  const [restaurants, setRestaurants] = useState([]);
  const { setShowPopup } = useShowPopupStore(state => {
    return state
  })
  const { refresh, setRefresh } = useDeleteModalStore();
  const { imageUrl, setImageUrl } = useImageStore();

  const getAllrestaurants = async () => {
    const response = await getRestaurants();
    setRestaurants(response.data.result.data);
  }

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
      toast.error("Invalid product name")
    } else if (data.description.trim().length < 2) {
      toast.error("Invalid decription")
    } else if (data.img_url == null || data.img_url?.trim().length === 0) {
      toast.error("Invalid image URL")
    } else if (data.rest_id.trim().length === 0) {
      toast.error("Please, select restaurant")
    } else if (data.price < 0) {
      toast.error("Invalid price")
    } else {
      const response = await addProductToDB(data);
      if (response?.status === 201) {
        toast.success("Product successfully added")
        setImageUrl(null)
        setShowPopup(false)
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
              setShowPopup(false)
            }}
          >
            &times;
          </button>
          <div>Add product</div>
        </div>
        <div className={styles.modalBody}>
          <div className='flex flex-col sm:justify-between sm:flex-row mt-10 sm:pe-[50px]'>
            <div className={styles.uploadImageText}>
              {imageUrl ?
                <img src={imageUrl} style={{ height: "122px", width: "180px", objectFit: 'cover' }} />
                : "Upload your product image"}
            </div>
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
                <input value={data.name} type='text' id='name' onChange={(e) => {
                  setData({ ...data, name: e.target.value })
                }} />
              </div>

              <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                <label htmlFor='desc'>Description</label>
                <textarea value={data.description} type='text' id='desc' style={{ height: '133px' }} onChange={(e) => {
                  setData({ ...data, description: e.target.value })
                }} />
              </div>

              <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                <label htmlFor='price'>Price</label>
                <input value={data.price} type='number' id='price' onChange={(e) => {
                  setData({ ...data, price: e.target.value })
                }} />
              </div>
              <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                <label htmlFor='restaurant'>Restaurant</label>
                <select id='restaurant' className={styles.select} onChange={(e) => {
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
            setImageUrl(null)
          }}>Cancel</button>
          <button className={styles.create} onClick={() => { addProduct(data) }}>Create product</button>
        </div>
      </div>
    </div>
  )
}

export default HeaderPopUp
