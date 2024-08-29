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
            <div className='flex sm:gap-5 gap-2 sm:w-[520px] w-[260px] items-center '>
                <div className=' w-[22px] sm:w-[57px] sm:h-[53px]'>
                    <img className={styles.image} src={product.img_url} />
                </div>
                <div className='w-[230px]'>
                    <div className={styles.name}>{product.name}</div>
                    <div className={styles.description}>{product.description}</div>
                </div>
            </div>
            <div className='flex flex-col sm:flex-row items-center gap-1 sm:gap-0'>
                <div className='flex items-center sm:justify-normal justify-center  w-[55px] sm:w-[111px]'>
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