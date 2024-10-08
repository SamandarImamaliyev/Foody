"use client"

import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ClientLayout from '../../../layout/client/ClientLayout'
import Restaurant from '../../../components/client/Restaurant'
import { getRestaurantById } from '../../../services/axios'
import useRestaurantStore from '../../../store/restaurantStore'

const index = () => {
    const router = useRouter()
    const restaurantId = router.query.id
    const { restaurant, setRestaurant } = useRestaurantStore(state => {
        return state
    });

    const getRestaurant = async (restaurantId) => {
        const response = await getRestaurantById(restaurantId);
        setRestaurant(response.data.result.data)
    }

    useEffect(() => {
        getRestaurant(restaurantId);
    }, [])
    return (
        <div>
            <Head>
                <title>Restaurants | {restaurant?.name}</title>
                <meta name='description' content='Generated by create next app' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <ClientLayout>
                <Restaurant />
            </ClientLayout>
        </div>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}

export default index