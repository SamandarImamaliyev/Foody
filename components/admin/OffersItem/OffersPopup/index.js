import React, { useEffect, useState } from 'react'
import styles from './offersPopup.module.css'
import showOffersPopupStore from '../../../../store/showOffersPopupStore'
import useDeleteModalStore from '../../../../store/deleteModalStore/deleteModalStore'
import useImageStore from '../../../../store/imageStore/imageStore'
import { postOffer } from '../../../../services/axios'
import { roboto } from '../../../../helper/font'
import UploadFile from '../../UploadFile'
import toast from 'react-hot-toast'

const OffersPopup = () => {
    const { setShowOffersPopup } = showOffersPopupStore(state => {
        return state
    })

    const { refresh, setRefresh } = useDeleteModalStore();
    const { imageUrl, setImageUrl } = useImageStore();
    const [data, setData] = useState({
        name: "",
        img_url: "",
        description: "",
    })

    useEffect(() => {
        setData({ ...data, img_url: imageUrl })
    }, [imageUrl])


    const addOffer = async (data) => {

        if (data.name.trim().length < 2) {
            toast.error("Invalid product name")
        } else if (data.img_url == null || data.img_url?.trim().length === 0) {
            toast.error("Invalid image URL")
        } else if (data.description.trim().length < 2) {
            toast.error("Add description")
        } else {
            const response = await postOffer(data);

            if (response?.status === 201) {
                toast.success("Offer successfully added")
                setImageUrl(null)
                setShowOffersPopup(false)
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
                            setShowOffersPopup(false)
                        }}
                    >
                        &times;
                    </button>
                    <h2>Add Offer</h2>
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
                            Add your Offer information
                        </div>
                        <div className={styles.info}>
                            <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                                <label htmlFor='name'>Title</label>
                                <input value={data.name} type='text' id='name' onChange={(e) => {
                                    setData({ ...data, name: e.target.value })
                                }}
                                />
                            </div>
                            <div className='flex flex-col w-[276px] sm:w-[474px] 2xl:w-[546px]'>
                                <label htmlFor='desc'>Description</label>
                                <textarea value={data.description} type='text' id='desc' style={{ height: '133px' }}
                                    onChange={(e) => {
                                        setData({ ...data, description: e.target.value })
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
                        setShowOffersPopup(false)
                        setImageUrl(null)
                    }}>Cancel</button>
                    <button className={styles.create} onClick={() => { addOffer(data) }}>Create Offer</button>
                </div>
            </div>
        </div>
    )
}

export default OffersPopup