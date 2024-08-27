"use client"

import React from 'react'
import styles from './restaurantInfo.module.css'
import useRestaurantStore from '../../../../store/restaurantStore';
import { roboto } from '../../../../helper/font';
import useUrlStore from '../../../../store/urlStore/urlStore';
import { useRouter } from 'next/router';

const RestaurantInfo = () => {

    const { url, setUrl } = useUrlStore();
    const router = useRouter();

    const { restaurant } = useRestaurantStore(state => {
        return state
    });
    return (
        <div className={`h-[537px] mt-2 ${roboto.className}`}>
            <div className='h-[calc(100%-89px)] flex justify-center'>
                <img className='h-[100%] object-contain' src={restaurant?.img_url} />
            </div>
            <div className='h-[89px] bg-[#FFFFFF] flex justify-between items-center ms-14 '>
                <div>
                    <div className={styles.restaurantName}>{restaurant?.name}</div>
                    <div className={styles.restaurantAddress}>{restaurant?.address}</div>
                </div>
                <div className='flex items-center gap-14'>
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