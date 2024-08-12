'use client'

import React, { useEffect, useState } from 'react'
import styles from './restaurantItemSidebar.module.css'
import { mukta } from '../../../../helper/font'
import { getCategories, getRestaurants } from '../../../../services/axios'
import useRestaurantStore from '../../../../store/restaurantStore'
import useRefreshStore from '../../../../store/refreshStore'

const RestaurantItemSidebar = () => {
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState(0);
    const { setRestaurants } = useRestaurantStore();
    const { refresh, setRefresh } = useRefreshStore();

    useEffect(() => {
        getAllCategories();
    }, [])

    const getAllCategories = async () => {
        try {
            const response = await getCategories()
            setCategories(response.data.result.data)
        } catch (err) {
            console.error(err)
        }
    }

    const getRestaurantsByCategoryId = async (id) => {
        const response = await getRestaurants()
        const restaurants = response?.data.result.data

        const filteredRestaurants = restaurants?.filter((restaurant) => {
            return restaurant.category_id == id
        })
        setRestaurants(filteredRestaurants)
    }

    return (
        <>
            <div className={`${styles.restaurantItemSidebar} ${mukta.className}`}>
                <ul className='my-[80px] mx-[30px] flex flex-col gap-5'>
                    <li className={`${styles.categoryName} ${active === 0 ? styles.active : ""} flex items-center ps-[55px]`} onClick={() => {
                        setRefresh(!refresh);
                        setActive(0)
                    }}>All</li>
                    {categories.map((category, index) => (
                        <li className={`flex items-center gap-5 ${active === (index + 1) ? styles.active : ""}`} onClick={() => {
                            getRestaurantsByCategoryId(category.id)
                            setActive(index + 1)
                        }}
                            key={category.id}>
                            <img src={category.img_url} className={styles.sidebarImage} />
                            <div className={`${styles.categoryName}`}>{category.name}</div>
                        </li>
                    ))}
                </ul>
            </div></>
    )
}

export default RestaurantItemSidebar