"use client"

import React from 'react'
import styles from './restaurantProductItem.module.css'
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import currentUserStore from '../../../../../store/currentUserStore';
import useRefreshStore from '../../../../../store/refreshStore';
import { addToBasket } from '../../../../../services/axios';

const RestaurantProductItem = ({ product }) => {
    const { currentUser } = currentUserStore();
    const { refresh, setRefresh } = useRefreshStore();

    const router = useRouter();

    const addProductToBasket = async (id) => {
        const response = await addToBasket(id);
        setRefresh(!refresh);
    }

    return (
        <div className={styles.item}>
            <div className='flex gap-5 w-[520px]'>
                <div>
                    <img className={styles.image} src={product.img_url} />
                </div>
                <div>
                    <div className={styles.name}>{product.name}</div>
                    <div className={styles.description}>{product.description}</div>
                </div>
            </div>
            <div className='flex'>
                <div className='flex items-center w-[111px]'>
                    <div className={styles.from}>From</div>
                    <div className={styles.price}>${product.price}</div>
                </div>
                <div className={styles.add} onClick={() => {
                    if (currentUser) {
                        addProductToBasket(product.id)
                    } else {
                        router.push(`/login`)
                    }
                }}>
                    <AddIcon style={{ width: '24px', color: '#BDBDBD' }} />
                </div>
            </div>
        </div>
    )
}

export default RestaurantProductItem