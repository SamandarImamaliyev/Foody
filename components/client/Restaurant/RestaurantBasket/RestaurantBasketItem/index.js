"use client"

import React from 'react'
import styles from "./restaurantBasketItem.module.css"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import useRefreshStore from '../../../../../store/refreshStore';
import { addToBasket, deleteProductFromBasketById } from '../../../../../services/axios';

const RestaurantBasketItem = ({ item }) => {

    const { refresh, setRefresh } = useRefreshStore();

    const addProductToBasket = async (id) => {
        const response = await addToBasket(id);
        setRefresh(!refresh);
    }

    const deleteProductFromBasket = async (id) => {
        const response = await deleteProductFromBasketById(id);
        setRefresh(!refresh);
    }
    return (
        <div className={styles.restaurantBasketItem}>
            <div>
                <img src={item.img_url} className='w-[45px] h-[45px]' />
            </div>
            <div className={styles.itemInfo}>
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.itemPrice}>${item.price}</div>
            </div>
            <div className={styles.itemCount}>
                <div className={styles.signs} onClick={() => {
                    addProductToBasket(item.id)
                }}><AddIcon style={{ width: "17px", height: "17px" }} /></div>
                <div>{item.count}</div>
                <div className={styles.signs} onClick={() => {
                    deleteProductFromBasket(item.id)
                }}><RemoveIcon style={{ width: "17px", height: "17px" }} /></div>
            </div>

        </div>
    )
}

export default RestaurantBasketItem