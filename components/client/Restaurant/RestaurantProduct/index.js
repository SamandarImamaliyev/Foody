"use client"

import React from 'react'
import styles from './restaurantProduct.module.css'
import useRestaurantStore from '../../../../store/restaurantStore';
import { roboto } from '../../../../helper/font';
import RestaurantProductItem from './RestaurantProductItem'

const RestaurantProduct = () => {
    const { restaurant } = useRestaurantStore(state => {
        return state
    });
    return (
        <div className={`${styles.restaurantProducts} ${roboto.className}`}>
            <div className={styles.heading}>Products</div>
            {restaurant?.products.map((product) => (
                <RestaurantProductItem product={product} key={product.id} />
            ))}
        </div>
    )
}

export default RestaurantProduct