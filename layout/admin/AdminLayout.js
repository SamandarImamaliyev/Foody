'use client'
import React from 'react'
import styles from './adminLayout.module.css'
import Header from '../../components/admin/Header'
import Sidebar from '../../components/admin/Sidebar'
import Head from 'next/head'
import '../../lang/i18n'
import { useRouter } from 'next/router'

const AdminLayout = ({ children }) => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    window.onbeforeunload = function () {
      localStorage.clear();
    }

    if (localStorage.getItem('username') != 'admin' || localStorage.getItem('password') != '123456') {
      router.push(`/admin/login`)
    }
  }


  return (
    <div>
      <Head>
        <title>Admin</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.adminBody}>
        <Header />
        <div className='flex'>
          <Sidebar />
          <div className=' mt-[40px] w-[100%] me-[19px] mb-8'> {children}</div>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout