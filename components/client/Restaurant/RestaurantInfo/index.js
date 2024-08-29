"use client"

import React from 'react'
import styles from './restaurantInfo.module.css'
import useRestaurantStore from '../../../../store/restaurantStore';
import { roboto } from '../../../../helper/font';
import { useRouter } from 'next/router';

const RestaurantInfo = () => {

    const router = useRouter();

    const { restaurant } = useRestaurantStore(state => {
        return state
    });
    return (
        <div className={`h-[437px] sm:h-[537px] mt-2 ${roboto.className}`}>
            <div className='h-[168px] sm:h-[calc(100%-89px)] flex justify-center'>
                <img className='h-[100%] object-contain' src={restaurant?.img_url} />
            </div>
            <div className='h-[239px] sm:h-[89px] bg-[#FFFFFF] flex flex-col sm:flex-row sm:justify-between sm:items-center px-[22px] sm:px-0 sm:ms-14 gap-5 sm:gap-0 '>
                <div className='mt-5 sm:mt-0'>
                    <div className={styles.restaurantName}>{restaurant?.name}</div>
                    <div className={styles.restaurantAddress}>{restaurant?.address}</div>
                </div>
                <div className='flex flex-col sm:flex-row sm:items-center sm:gap-14 gap-5'>
                    <div>
                        <div className={styles.cuisineHeading}>Cuisine</div>
                        <div className={styles.cuisine}>{restaurant?.cuisine}</div>
                    </div>
                    <div className='flex items-center gap-5'>
                        <div className={styles.price}>
                            <div> ${restaurant?.delivery_price}</div>
                            <div>Delivery</div>
                        </div>
                        <div>
                            <button className={styles.button} onClick={() => {
                                router.back();
                            }}>Go Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantInfo