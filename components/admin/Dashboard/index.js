'use client'

import React, { useEffect } from 'react'
import styles from './dashboard.module.css'
import { PieChart, SalaryChart } from './Charts'
import useCurrentPageStore from '../../../store/currentPageStore'
import { useTranslation } from 'react-i18next'
const Dashboard = () => {
  const { t } = useTranslation();

  const { setCurrentPage } = useCurrentPageStore(state => {
    return state
  })

  useEffect(() => {
    setCurrentPage(1)
  }, [])
  return (
    <div className={styles.main}>
      <div className='flex flex-col sm:flex-row gap-5 2xl:gap-10 '>
        <div className={styles.orders}>
          <div className='text-white text-lg sm:text-xl 2xl:text-2xl mt-[10px]'>
            {t("ordersOfDashboard")}
          </div>
          <PieChart />
        </div>
        <div className={`${styles.totalSalary} flex-1`}>
          <div className='text-white  text-lg sm:text-xl 2xl:text-2xl mt-[10px]'>
            {t("totalSalary")}
          </div>
          <SalaryChart />
        </div>
      </div>
      <div className='flex flex-col sm:flex-row gap-5 2xl:gap-10 mt-10'>
        <div className={styles.risks}>
          <div className='text-white text-lg sm:text-xl 2xl:text-2xl mt-[10px] h-full flex flex-col items-center'>
            <div>
              {t("assignedRisks")}
            </div>
            <div
              className={`${styles.message} h-full flex flex-col justify-center`}
            >
              {t("risk message")}
            </div>
          </div>
        </div>
        <div className={`${styles.action} flex-1`}>
          <div className='text-white text-lg sm:text-xl 2xl:text-2xl mt-[10px] h-full flex flex-col items-center'>
            <div>
              {t("assigned action items")}
            </div>
            <div
              className={`${styles.message} h-full flex flex-col justify-center`}
            >
              {t("action message")}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
