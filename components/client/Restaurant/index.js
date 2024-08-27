"use client"

import React, { useEffect } from 'react'
import styles from './restaurant.module.css'
import useCurrentPageStore from '../../../store/currentPageStore';
import RestaurantInfo from './RestaurantInfo';
import RestaurantProduct from './RestaurantProduct'
import RestaurantBasket from './RestaurantBasket';

const Restaurant = () => {
    const { currentPage, setCurrentPage } = useCurrentPageStore();

    useEffect(() => { setCurrentPage(2) }, [])
    return (
        <div>
            <RestaurantInfo />
            <div className='h-[2px] bg-[#F2F2F2] mb-[40px]'></div>
            <div className='flex justify-between mb-[213px]'>
                <RestaurantProduct />
                <RestaurantBasket />
            </div>
        </div>
    )
}

export default Restaurant