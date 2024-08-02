"use client"

import React, { useEffect, useState } from 'react'
import styles from './header.module.css'
import { montserrat, roboto, mukta } from '../../../helper/font'
import adminAvatar from '../../../public/image/admin/adminAvatar.svg'
import openSidebar from '../../../public/image/admin/sidebar/openSidebarModal.svg'
import Image from 'next/image'
import HeaderPopUp from './HeaderPopUp'
import useAddPopupStore from '../../../store/showPopupStore'
import enIcon from '../../../public/image/langs/en.svg'
import azIcon from '../../../public/image/langs/az.svg'
import { useTranslation } from 'react-i18next';
import useSetLanguageStore from '../../../store/setLanguageStore'
import SidebarPopup from './SidebarPopup'

const Header = () => {
  const { t } = useTranslation();

  const { change, setLanguage, changeLanguageMethod } = useSetLanguageStore(state => {
    return state
  })

  useEffect(() => {
    changeLanguageMethod()
  }, [change])

  const [showLang, setShowLang] = useState(false);

  const { setShowPopup, showPopup, showSidebarModal, setShowSidebarModal } = useAddPopupStore(state => {
    return state
  })

  const openSidebarModal = () => {
    setShowSidebarModal(true)
  }

  return (
    <div >
      <div className='flex  bg-[#27283C] h-[40px] w-[cal(100%-38px)] sm:h-[69px] sm:mx-[19px] rounded-b-2xl'>
        <div className={styles.openSidebar} onClick={() => { openSidebarModal() }}>
          <Image src={openSidebar} width={19.5} height={12} />
        </div>
        <div className={`logoName sm:columns-3 ${montserrat.className} ${styles.logo}`}>
          Foody<span className='text-orange-400'>.</span>
        </div>
        <div className='flex flex-1 justify-end items-center gap-4 me-4'>
          <button
            className={`${styles.addProduct} ${roboto.className}`}
            onClick={() => {
              setShowPopup(true)
            }}
          >
            + <div>{t("add product")}</div>

          </button>
          <div style={{ position: 'relative' }}>
            <div style={{ cursor: 'pointer' }} className={styles.images} onClick={() => {
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
              <div className={`absolute hover:cursor-pointer bg-[#27283C] mt-2 w-[40px] h-[40px] flex items-center justify-center ${styles.images}`} onClick={() => {

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
          <div className='flex items-end gap-4'>
            <div className={styles.images}>
              <Image
                src={adminAvatar}
                alt='Admin avatar'
                width={40}
                height={40}
                quality={100}
              />
            </div>
            <div className={`${styles.admin} ${roboto.className}`}>Admin</div>
          </div>
        </div>
      </div>
      {showPopup && <HeaderPopUp />}
      {showSidebarModal && <SidebarPopup />}
    </div>
  )
}

export default Header
