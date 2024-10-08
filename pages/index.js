import React from 'react'
import ClientLayout from '../layout/client/ClientLayout'
import Head from 'next/head'
import HomeItem from '../components/client/HomeItem'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ClientLayout>
        <HomeItem />
      </ClientLayout>
    </div>
  )
}

export default Home
