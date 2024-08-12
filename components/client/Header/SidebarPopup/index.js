import React from 'react'
import styles from './sidebarPopup.module.css'
import useShowPopupStore from '../../../../store/showPopupStore'
import { montserrat, roboto, mukta } from '../../../../helper/font'
import Image from 'next/image'
import closeImage from '../../../../public/image/client/closeSidebarModal.svg'
import avatar from '../../../../public/image/admin/adminAvatar.svg'

import { useTranslation } from 'react-i18next'
import useCurrentPageStore from '../../../../store/currentPageStore'
import { useRouter } from 'next/router'
import currentUserStore from '../../../../store/currentUserStore'

const SidebarPopup = () => {
    const { t } = useTranslation();

    const { setShowSidebarModal } = useShowPopupStore(state => {
        return state
    })

    const { currentPage } = useCurrentPageStore(state => {
        return state
    })

    const { currentUser, setCurrentUser } = currentUserStore();
    const router = useRouter()

    const redirect = page => {
        setShowSidebarModal(false)
        router.push(`/${page}`)
    }
    return (
        <div className={`${styles.modal} ${mukta.className}`}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <button
                        className={styles.close}
                        onClick={() => {
                            setShowSidebarModal(false)
                        }}
                    >
                        <Image src={closeImage} />
                    </button>
                </div>
                <div className={styles.modalBody}>
                    <div className='flex  mb-[70px]'>
                        {currentUser ?
                            <div className='w-[174px] h-[41px] flex items-center gap-5'>
                                <div>
                                    <Image src={avatar} width={40} height={40} />
                                </div>
                                <div className={styles.loggedInUserUsername}>{currentUser.username}</div>

                            </div>
                            :
                            <button className={styles.mobileSignUpButton} onClick={() => { router.push(`/login`); }}>{t("navbar sign up")}</button>

                        }
                    </div>
                    <div
                        className={`${roboto.className} flex flex-col `}
                    >
                        <div
                            className={`${currentPage === 1 ? styles.active : ''}`}
                            onClick={() => {
                                redirect('')
                            }}
                        >
                            <p>
                                {t("navbar home")}
                            </p>
                        </div>
                        {currentUser &&
                            <div
                                className={`${currentPage === 6 ? styles.active : ''}`}
                                onClick={() => {
                                    redirect('profile')
                                }}
                            >
                                <p>
                                    {t("navbar profile")}
                                </p>
                            </div>
                        }
                        <div
                            className={`${currentPage === 2 ? styles.active : ''}`}
                            onClick={() => {
                                redirect('restaurants')
                            }}
                        >
                            <p>
                                {t("navbar restaurants")}
                            </p>
                        </div>
                        <div
                            className={`${currentPage === 3 ? styles.active : ''}`}
                            onClick={() => {
                                redirect('about-us')
                            }}
                        >
                            <p>
                                {t("navbar about us")}
                            </p>
                        </div>
                        <div
                            className={`${currentPage === 4 ? styles.active : ''}`}
                            onClick={() => {
                                redirect('how-it-works')
                            }}
                        >
                            <p>
                                {t("navbar how it works")}
                            </p>
                        </div>
                        <div
                            className={`${currentPage === 5 ? styles.active : ''}`}
                            onClick={() => {
                                redirect('faqs')
                            }}
                        >
                            <p>
                                {t("navbar faqs")}
                            </p>
                        </div>



                        {currentUser &&
                            <div
                                className={`${currentPage === 7 ? styles.active : ''}`}
                                onClick={() => {
                                    redirect('your-basket')
                                }}
                            >
                                <p>
                                    {t("navbar your basket")}
                                </p>
                            </div>
                        }
                        {currentUser &&
                            <div
                                className={`${currentPage === 8 ? styles.active : ''}`}
                                onClick={() => {
                                    redirect('your-orders')
                                }}
                            >
                                <p>
                                    {t("navbar your orders")}
                                </p>
                            </div>
                        }

                        {currentUser &&
                            <div
                                className={`${currentPage === 9 ? styles.active : ''}`}
                                onClick={() => {
                                    redirect('checkout')
                                }}
                            >
                                <p>
                                    {t("navbar checkout")}
                                </p>
                            </div>
                        }

                        {currentUser &&
                            <div
                                className={`${currentPage === 9 ? styles.active : ''} mt-8`}
                                onClick={() => {
                                    setCurrentUser(false)
                                    redirect('login')
                                }}
                            >
                                <p>
                                    {t("navbar logout")}
                                </p>
                            </div>
                        }


                    </div>
                </div>

            </div>
        </div>
    )
}

export default SidebarPopup