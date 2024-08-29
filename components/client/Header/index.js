'use client'

import React, { useEffect, useState } from 'react';
import styles from './clientHeader.module.css'
import { mukta, roboto } from '../../../helper/font';
import enIcon from '../../../public/image/langs/en.svg'
import azIcon from '../../../public/image/langs/az.svg'
import useSetLanguageStore from '../../../store/setLanguageStore';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import '../../../public/lang/i18n'
import useShowPopupStore from '../../../store/showPopupStore'
import SidebarPopup from './SidebarPopup';
import openSidebar from '../../../public/image/client/openSidebarModal.svg'
import { useRouter } from 'next/router';
import currentUserStore from '../../../store/currentUserStore'
import headerBasket from '../../../public/image/client/headerBasket.svg'
import useCurrentPageStore from '../../../store/currentPageStore';

const Header = () => {

    const { t } = useTranslation();
    const { currentUser, setCurrentUser } = currentUserStore();
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const { currentPage, setCurrentPage } = useCurrentPageStore();

    useEffect(() => {
        setTimeout(() => {
            if (currentUser) {
                router.push(`/login`);
                setCurrentUser(null)
                sessionStorage.clear();
            }
        }, 1000 * 60 * 60)

        if (typeof window !== 'undefined') {
            const user = JSON.parse(sessionStorage.getItem('user'))
            setCurrentUser(user);
            setUserToken(user)
        }
    }, [])

    const router = useRouter();

    const { showSidebarModal, setShowSidebarModal } = useShowPopupStore(state => {
        return state
    })

    const [showLang, setShowLang] = useState(false);
    const { change, setLanguage, changeLanguageMethod } = useSetLanguageStore(state => {
        return state
    })

    useEffect(() => {
        changeLanguageMethod()
    }, [change])

    const openSidebarModal = () => {
        setShowSidebarModal(true)
    }

    return (
        <>
            <div className={styles.openSidebar} >
                <div className='flex '>
                    <div onClick={() => { openSidebarModal() }} className='mt-[5px]'>
                        <Image src={openSidebar} width={19.5} height={12} />
                    </div>
                    <div className={`${styles.logoNameForMobile} ${mukta.className}`}>Foody<span>.</span></div>
                </div>
                <div className='relative'>
                    <div className='w-[26px] h-[26px] ' onClick={() => {
                        setShowLang(!showLang)
                    }}>
                        <Image
                            src={change === 1 ? enIcon : azIcon}
                            alt='language'
                            width={26}
                            height={26}
                            quality={100}
                        />
                    </div>
                    {showLang &&
                        <div className={`absolute bg-[#27283C] mt-2 w-[26px] h-[26px] flex items-center justify-center`} onClick={() => {

                            setLanguage(change === 1 ? 2 : 1)
                            setShowLang(false)
                        }}>
                            <Image
                                src={change === 1 ? azIcon : enIcon}
                                alt='language'
                                width={26}
                                height={26}
                                quality={100}
                            />
                        </div>
                    }
                </div>
            </div>
            <div className={`flex items-center h-[122px] w-[calc(100%-60px)] mx-[30px] mt-[30px] bg-[#F3F4F6] rounded-[4px] ${styles.navbar}`}>

                <div className={`${styles.logoName} ${mukta.className}`}>Foody<span>.</span></div>
                <div className={`${styles.navigation} ${roboto.className}`}>
                    <div className={`${currentPage === 1 ? styles.active : styles.inActive}`} onClick={() => {
                        setCurrentPage(1);
                        router.push(`/`)
                    }}>
                        {t("navbar home")}
                    </div>
                    <div className={`${currentPage === 2 ? styles.active : styles.inActive}`} onClick={() => {
                        // setCurrentPage(2);
                        router.push(`/restaurants`)
                    }}>
                        {t("navbar restaurants")}
                    </div>
                    <div className={`${currentPage === 3 ? styles.active : styles.inActive}`}>{t("navbar about us")}</div>
                    <div className={`${currentPage === 4 ? styles.active : styles.inActive}`}>{t("navbar how it works")}</div>
                    <div className={`${currentPage === 5 ? styles.active : styles.inActive}`}>{t("navbar faqs")}</div>
                </div>
                <div>
                    <input type='text' placeholder={`${t("navbar search")}`} className={`${styles.search} ${roboto.className}`} />
                </div>
                <div className={styles.language}>
                    <div className={styles.images} onClick={() => {
                        setShowLang(!showLang)
                    }}>
                        <Image
                            src={change === 1 ? enIcon : azIcon}
                            alt='language'
                            width={40}
                            height={40}
                            quality={100}
                        />
                    </div>
                    {showLang &&
                        <div className={`absolute bg-[#27283C] mt-2 w-[40px] h-[40px] flex items-center justify-center ${styles.images}`} onClick={() => {

                            setLanguage(change === 1 ? 2 : 1)
                            setShowLang(false)
                        }}>
                            <Image
                                src={change === 1 ? azIcon : enIcon}
                                alt='language'
                                width={30}
                                height={30}
                                quality={100}
                            />
                        </div>
                    }
                </div>
                {userToken ?
                    <div className={styles.currentUser}>
                        <div className='flex justify-center items-center'>
                            <Image src={headerBasket} width={30} height={30} />
                        </div>
                        <div className='flex justify-center items-center relative' onClick={() => { setShowProfileModal(!showProfileModal) }}>
                            {userToken.username.toUpperCase().charAt(0)}
                            {showProfileModal &&
                                <div className={styles.profileModal}>
                                    <div onClick={() => { setShowProfileModal(!showProfileModal) }}>Profile</div>
                                    <div onClick={() => { setShowProfileModal(!showProfileModal) }}>Your Basket</div>
                                    <div onClick={() => { setShowProfileModal(!showProfileModal) }}>Your Orders</div>
                                    <div onClick={() => { setShowProfileModal(!showProfileModal) }}>Checkout</div>
                                    <div onClick={() => {
                                        sessionStorage.clear();
                                        router.push(`/login`);
                                        setShowProfileModal(!showProfileModal);
                                    }}
                                    >Logout</div>
                                </div>
                            }
                        </div>
                    </div>
                    :
                    <div>
                        <button className={`${styles.signUpButton} ${roboto.className}`} onClick={() => { router.push(`/login`); }}>{t("navbar sign up")}</button>
                    </div>

                }
            </div>
            {showSidebarModal && <SidebarPopup />}
        </>
    )
}

export default Header