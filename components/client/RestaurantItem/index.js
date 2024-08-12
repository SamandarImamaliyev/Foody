"use client"

import React, { useEffect } from 'react'
import styles from './restaurantItem.module.css'
import RestaurantItemSidebar from './RestaurantItemSidebar'
import RestaurantItemMain from './RestaurantItemMain'
import useCurrentPageStore from '../../../store/currentPageStore';

const RestaurantItem = () => {
    const { currentPage, setCurrentPage } = useCurrentPageStore();
    useEffect(() => { setCurrentPage(2) }, [])
    return (
        <div className='flex my-[30px]'>
            <RestaurantItemSidebar />
            <RestaurantItemMain />
        </div>
    )
}

export default RestaurantItem