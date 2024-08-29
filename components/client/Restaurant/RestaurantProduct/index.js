"use client"

import React, { useEffect, useState } from 'react'
import styles from './restaurantProduct.module.css'
import useRestaurantStore from '../../../../store/restaurantStore';
import { mukta, roboto } from '../../../../helper/font';
import RestaurantProductItem from './RestaurantProductItem'
import useBasketStore from '../../../../store/basketStore/basketStore';
import emptyBasket from '../../../../public/image/client/restaurant/emptyBasket.svg'
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import RestaurantBasketItem from '../RestaurantBasket/RestaurantBasketItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { clearBasket } from '../../../../services/axios';

const RestaurantProduct = () => {
    const { basket, getBasketState } = useBasketStore();
    const [showBasket, setShowBasket] = useState(false);

    const { restaurant } = useRestaurantStore(state => {
        return state
    });

    useEffect(() => {
        if (basket?.items.length === 0) {
            setShowBasket(false)
        }
    }, [basket])

    const deleteAllItemsFromBasket = async (id) => {
        const response = await clearBasket(id);
        getBasketState();
    }
    return (
        <>
            <div className={`${styles.restaurantProducts} ${roboto.className}`}>
                <div className={styles.heading}>Products</div>
                <div className={styles.productItems}>
                    {restaurant?.products.map((product) => (
                        <RestaurantProductItem product={product} key={product.id} />
                    ))}
                </div>
                <div className={`${styles.basketForMobile} ${basket?.items.length > 0 ? styles.basketForMobileActive : styles.basketForMobileUnActive}`}>
                    <div className='flex items-center justify-center ps-3 h-[100%]'>
                        <div className='flex gap-2' onClick={() => {
                            basket?.items.length > 0 &&
                                setShowBasket(true);
                        }}>
                            <div>
                                <Image width={24} height={22} src={emptyBasket} alt='empty Basket' />
                            </div>
                            <div className={`${styles.itemCount}`}><span>{basket?.items.length > 0 ? basket?.total_count : 0}</span>items</div>
                        </div>
                    </div>
                </div>
            </div >

            {/*  modal for mobile  */}

            {showBasket &&
                <div className={`${styles.modal} ${mukta.className}`}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <div className={styles.close} onClick={() => { setShowBasket(false) }}>
                                <CloseIcon />
                            </div>
                            <div className='text-end pe-5' onClick={() => {
                                deleteAllItemsFromBasket(basket?.id)
                            }}>
                                <DeleteIcon style={{ color: "#D63626", width: "30px", height: "30px" }} />
                            </div>
                        </div>
                        <div className={styles.modalBody}>
                            {
                                basket.items.map((item) => (
                                    <RestaurantBasketItem item={item} key={item.id} />
                                ))
                            }
                        </div>
                        <div className={`${styles.basketForMobile} ${basket?.items.length > 0 ? styles.basketForMobileActive : styles.basketForMobileUnActive}`}>
                            <div className='flex ms-[20px] justify-between items-center h-[100%]'>
                                <div className={styles.checkout}>Checkout</div>
                                <div className={styles.price}>${basket?.total_amount}</div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default RestaurantProduct