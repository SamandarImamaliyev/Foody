'use client'

import styles from './sidebar.module.css'
import { montserrat, roboto, mukta } from '../../../helper/font'
import Image from 'next/image'
import dashboard from '../../../public/image/admin/sidebar/dashboard.svg'
import products from '../../../public/image/admin/sidebar/products.svg'
import restaurants from '../../../public/image/admin/sidebar/restaurants.svg'
import category from '../../../public/image/admin/sidebar/category.svg'
import orders from '../../../public/image/admin/sidebar/orders.svg'
import offers from '../../../public/image/admin/sidebar/offers.svg'
import logout from '../../../public/image/admin/sidebar/logout.svg'
import { useRouter } from 'next/router'
import useCurrentPageStore from '../../../store/currentPageStore'
import { useTranslation } from 'react-i18next'

const Sidebar = () => {
  const { t } = useTranslation();

  const { currentPage } = useCurrentPageStore(state => {
    return state
  })
  const router = useRouter()

  const redirect = page => {
    router.push(`/admin/${page}`)
  }

  return (
    <div className='flex'>
      <div
        className={`${styles.sidebar} ${roboto.className} flex flex-col gap-6 items-center pt-11`}
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
  )
}

export default Sidebar
