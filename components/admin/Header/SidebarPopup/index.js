import React from 'react'
import styles from './sidebarPopup.module.css'
import useShowPopupStore from '../../../../store/showPopupStore'
import { montserrat, roboto, mukta } from '../../../../helper/font'
import Image from 'next/image'
import backImage from '../../../../public/image/admin/sidebar/back.svg'

import dashboard from '../../../../public/image/admin/sidebar/dashboard.svg'
import products from '../../../../public/image/admin/sidebar/products.svg'
import restaurants from '../../../../public/image/admin/sidebar/restaurants.svg'
import category from '../../../../public/image/admin/sidebar/category.svg'
import orders from '../../../../public/image/admin/sidebar/orders.svg'
import offers from '../../../../public/image/admin/sidebar/offers.svg'
import logout from '../../../../public/image/admin/sidebar/logout.svg'
import { useTranslation } from 'react-i18next'
import useCurrentPageStore from '../../../../store/currentPageStore'
import { useRouter } from 'next/router'

const SidebarPopup = () => {
    const { t } = useTranslation();

    const { setShowSidebarModal } = useShowPopupStore(state => {
        return state
    })
    const { currentPage } = useCurrentPageStore(state => {
        return state
    })
    const router = useRouter()

    const redirect = page => {
        setShowSidebarModal(false)
        router.push(`/admin/${page}`)
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
                        <Image src={backImage} />
                    </button>
                    <div>Foody<span>.</span></div>
                </div>
                <div className={styles.modalBody}>
                    <div
                        className={`${roboto.className} flex flex-col `}
                    >
                        <div
                            className={`${currentPage === 1 ? styles.active : ''}`}
                            onClick={() => {
                                redirect('')
                            }}
                        >
                            <Image
                                src={dashboard}
                                alt='dashboard'
                                width={22}
                                height={22}
                                quality={100}
                            />
                            <p>
                                {t("dashboard")}
                            </p>
                        </div>
                        <div
                            className={`${currentPage === 2 ? styles.active : ''}`}
                            onClick={() => {
                                redirect('products')
                            }}
                        >
                            <Image
                                src={products}
                                alt='products'
                                width={22}
                                height={22}
                                quality={100}
                            />
                            <p>
                                {t("products")}
                            </p>
                        </div>
                        <div
                            className={`${currentPage === 3 ? styles.active : ''}`}
                            onClick={() => {
                                redirect('restaurants')
                            }}
                        >
                            <Image
                                src={restaurants}
                                alt='restaurants'
                                width={22}
                                height={22}
                                quality={100}
                            />
                            <p>
                                {t("restaurants")}
                            </p>
                        </div>
                        <div
                            className={`${currentPage === 4 ? styles.active : ''}`}
                            onClick={() => {
                                redirect('category')
                            }}
                        >
                            <Image
                                src={category}
                                alt='category'
                                width={22}
                                height={22}
                                quality={100}
                            />
                            <p>
                                {t("category")}
                            </p>
                        </div>
                        <div
                            className={`${currentPage === 5 ? styles.active : ''}`}
                            onClick={() => {
                                redirect('orders')
                            }}
                        >
                            <Image
                                src={orders}
                                alt='orders'
                                width={22}
                                height={22}
                                quality={100}
                            />
                            <p>
                                {t("orders")}
                            </p>
                        </div>

                        <div
                            className={`${currentPage === 6 ? styles.active : ''}`}
                            onClick={() => {
                                redirect('order-history')
                            }}
                        >
                            <Image
                                src={offers}
                                alt='orders'
                                width={22}
                                height={22}
                                quality={100}
                            />
                            <p>
                                {t("order history")}
                            </p>
                        </div>
                        <div
                            className={`${currentPage === 7 ? styles.active : ''}`}
                            onClick={() => {
                                redirect('offers')
                            }}
                        >
                            <Image
                                src={offers}
                                alt='offers'
                                width={22}
                                height={22}
                                quality={100}
                            />
                            <p>
                                {t("offers")}
                            </p>
                        </div>
                        <div
                            className={`${currentPage === 8 ? styles.active : ''}`}
                            onClick={() => {
                                localStorage.clear();
                                redirect('login')
                            }}
                        >
                            <Image
                                src={logout}
                                alt='logout'
                                width={22}
                                height={22}
                                quality={100}
                            />
                            <p>
                                {t("logout")}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SidebarPopup