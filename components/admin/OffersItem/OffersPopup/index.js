import React, { useEffect, useState } from 'react'
import styles from './offersPopup.module.css'
import showOffersPopupStore from '../../../../store/showOffersPopupStore'
import useDeleteModalStore from '../../../../store/deleteModalStore/deleteModalStore'
import useImageStore from '../../../../store/imageStore/imageStore'
import { postOffer, updateOffer } from '../../../../services/axios'
import { roboto } from '../../../../helper/font'
import UploadFile from '../../UploadFile'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { errorMessajeContainer, succesMessajeContainer } from '../../../../helper/toastMessageContainer'
import UploadingIcon from '../../UploadFile/UploadingIcon'

const OffersPopup = ({ editData, setEditData }) => {
    const { t } = useTranslation();
    const { setShowOffersPopup } = showOffersPopupStore(state => {
        return state
    })

    const { refresh, setRefresh } = useDeleteModalStore();
    const { imageUrl, setImageUrl } = useImageStore();
    const [uploading, setUploading] = React.useState(false);
    const [data, setData] = useState({
        name: "",
        img_url: "",
        description: "",
    })

    useEffect(() => {
        if (editData) {
            setImageUrl(editData.img_url)
        }
    }, [])

    useEffect(() => {
        setData({ ...data, img_url: imageUrl })
    }, [imageUrl])


    const addOffer = async (data) => {

        if (data.name.trim().length < 2) {
            toast.error("Invalid product name", errorMessajeContainer)
        } else if (data.img_url == null || data.img_url?.trim().length === 0) {
            toast.error("Invalid image URL", errorMessajeContainer)
        } else if (data.description.trim().length < 2) {
            toast.error("Add description", errorMessajeContainer)
        } else {
            setUploading(true)
            const response = await postOffer(data);

            if (response?.status === 201) {
                toast.success("Offer successfully added", succesMessajeContainer)
                setImageUrl(null)
                setShowOffersPopup(false)
                setRefresh(!refresh)
                setUploading(false)
            }
        }
    }

    const editOffer = async (data) => {

        if (data.name.trim().length < 2) {
            toast.error("Invalid product name", errorMessajeContainer)
        } else if (data.img_url == null || data.img_url?.trim().length === 0) {
            toast.error("Invalid image URL", errorMessajeContainer)
        } else if (data.description.trim().length < 2) {
            toast.error("Add description", errorMessajeContainer)
        } else {
            setUploading(true)
            const response = await updateOffer(editData.id, data);

            if (response?.status === 200) {
                toast.success("Offer successfully added", succesMessajeContainer)
                setImageUrl(null)
                setShowOffersPopup(false)
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
                            setShowOffersPopup(false)
                        }}
                    >
                        &times;
                    </button>
                    <h2>{t("add offer")}</h2>
                </div>
                <div className={styles.modalBody}>

                    {
                        uploading ? <div className='h-[200px] sm:h-[566px] flex items-center justify-center'><UploadingIcon /></div>
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
                                        {t("add your offer info")}
                                    </div>
                                    <div className={styles.info}>
                                        <div className='flex flex-col w-[276px] sm:w-[474px] 3xl:w-[546px]'>
                                            <label htmlFor='name'> {t("title")}</label>
                                            <input type='text' id='name' value={editData ? editData.name : data.name} onChange={(e) => {
                                                editData ?
                                                    setEditData({ ...editData, name: e.target.value })
                                                    :
                                                    setData({ ...data, name: e.target.value })
                                            }}
                                            />
                                        </div>
                                        <div className='flex flex-col w-[276px] sm:w-[474px] 3xl:w-[546px]'>
                                            <label htmlFor='desc'>{t("description")}</label>
                                            <textarea value={editData ? editData.description : data.description} type='text' id='desc' placeholder={`${editData ? editData.description : ""}`} style={{ height: '133px' }}
                                                onChange={(e) => {
                                                    editData ?
                                                        setEditData({ ...editData, description: e.target.value })
                                                        :
                                                        setData({ ...data, description: e.target.value })
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
                        marginTop: '225px',
                        background: '#43445A',
                        height: '1px'
                    }}
                ></div>
                <div className={styles.modalFooter}>
                    <button className={styles.cancel} onClick={() => {
                        setShowOffersPopup(false)
                        setImageUrl(null)
                        setEditData(null)
                    }}>{t("cancel")}</button>
                    <button className={styles.create} onClick={() => {
                        editData ?
                            editOffer(editData)
                            :
                            addOffer(data)

                    }}>{t("create offer")}</button>
                </div>
            </div>
        </div>
    )
}

export default OffersPopup