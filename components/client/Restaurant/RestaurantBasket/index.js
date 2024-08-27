"use client"

import React, { useEffect, useState } from 'react'
import styles from './restaurantBasket.module.css'
import emptyBasket from '../../../../public/image/client/restaurant/emptyBasket.svg'
import fullBasket from '../../../../public/image/client/restaurant/fullBasket.svg'
import emptyBasketMain from '../../../../public/image/client/restaurant/emptyBasketMain.svg'
import Image from 'next/image'
import useBasketStore from '../../../../store/basketStore/basketStore'
import useRefreshStore from '../../../../store/refreshStore'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import { clearBasket } from '../../../../services/axios'
import RestaurantBasketItem from './RestaurantBasketItem'

const RestaurantBasket = () => {
    const { basket, getBasketState } = useBasketStore();
    const { refresh, setRefresh } = useRefreshStore();

    const deleteAllItemsFromBasket = async (id) => {
        const response = await clearBasket(id);
        getBasketState();
    }

    useEffect(() => {
        getBasketState()
    }, [refresh])

    console.log(basket)
    return (
        <div className={styles.restaurantBasket}>
            <div className={styles.restaurantBasketHeader}>
                <div className='flex gap-2'>
                    <div>
                        {basket?.items.length > 0 ?
                            <Image width={24} height={22} src={fullBasket} alt='full Basket' />
                            :
                            <Image width={24} height={22} src={emptyBasket} alt='empty Basket' />
                        }
                    </div>
                    <div className={`${styles.itemCount} ${basket?.items.length > 0 ? styles.active : styles.unActive}`}><span>{basket?.items.length > 0 ? basket?.total_count : 0}</span>items</div>
                </div>
                {basket?.items.length > 0 &&
                    <div >
                        <button onClick={() => {
                            deleteAllItemsFromBasket(basket?.id)
                        }}>
                            <DeleteSweepIcon style={{ color: '#D63626' }} />
                        </button>
                    </div>
                }
            </div>
            {basket?.items.length > 0 ?
                <div className={styles.basketItems}>
                    {basket.items.map((item) => (
                        <RestaurantBasketItem item={item} key={item.id} />
                    ))}

                </div>
                :
                <div className='flex flex-col items-center'>
                    <Image width={233} height={216} src={emptyBasketMain} alt='empty Basket' />
                    <div className={styles.restaurantEmptyBasketMessage}>Opps! <br />
                        Basket empty</div>
                </div>
            }
            <div className={`${styles.restaurantBasketCheckout} ${basket?.items.length > 0 ? styles.activeCheckout : styles.unActiveCheckout}`}>
                Checkout
                <button className={`${styles.restaurantBasketCheckoutButton} ${basket?.items.length > 0 ? styles.active : styles.unActive}`}>$ {basket?.total_amount}</button>
            </div>

        </div>
    )
}

export default RestaurantBasket