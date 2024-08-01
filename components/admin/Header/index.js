"use client"

import React, { useEffect, useState } from 'react'
import styles from './header.module.css'
import { montserrat, roboto, mukta } from '../../../helper/font'
import adminAvatar from '../../../public/image/admin/adminAvatar.svg'
import Image from 'next/image'
import HeaderPopUp from './HeaderPopUp'
import useAddPopupStore from '../../../store/showPopupStore'
import enIcon from '../../../public/image/langs/en.svg'
import azIcon from '../../../public/image/langs/az.svg'
import { useTranslation } from 'react-i18next';
import useSetLanguageStore from '../../../store/setLanguageStore'

const Header = () => {
  const { t } = useTranslation();

  const { change, setLanguage, changeLanguageMethod } = useSetLanguageStore(state => {
    return state
  })

  useEffect(() => {
    changeLanguageMethod()
  }, [change])

  const [showLang, setShowLang] = useState(false);

  const { setShowPopup, showPopup } = useAddPopupStore(state => {
    return state
  })
  return (
    <div>
      <div className='flex  bg-[#27283C] h-[69px] mx-[19px] rounded-b-2xl'>
        <div className={`logoName columns-3 ${montserrat.className}`}>
          Foody<span className='text-orange-400'>.</span>
        </div>
        <div className='flex flex-1 justify-end items-center gap-4 me-4'>
          <button
            className={`${styles.addProduct} ${roboto.className}`}
            onClick={() => {
              setShowPopup(true)
            }}
          >
            + {t("add product")}

          </button>
          <div style={{ position: 'relative' }}>
            <div style={{ cursor: 'pointer' }} onClick={() => {
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
              <div className='absolute hover:cursor-pointer bg-[#27283C] mt-2 w-[40px] h-[40px] flex items-center justify-center' onClick={() => {

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
            <div>
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
    </div>
  )
}

export default Header
