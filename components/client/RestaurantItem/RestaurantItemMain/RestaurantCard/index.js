import React, { useEffect, useState } from 'react'
import styles from './restaurantCard.module.css'
import { getCategoryById } from '../../../../../services/axios'
import { useRouter } from 'next/router';

const RestaurantCard = ({ restaurant }) => {
    const [categoryName, setCategoryName] = useState();
    const [newRestaurant, setNewRestaurant] = useState(false);

    const getCategory = async () => {
        const response = await getCategoryById(restaurant.category_id)
        setCategoryName(response.data.result.data.name)
    }

    const isRestaurantNew = () => {
        const date = new Date()
        const differenceInTime = date.getTime() - restaurant.created;
        const differenceInDay = Math.round(differenceInTime / (1000 * 3600 * 24));

        if (differenceInDay < 7) {
            setNewRestaurant(true)
        }
    }

    useEffect(() => {
        isRestaurantNew()
        getCategory()
    }, [])

    const router = useRouter()
    const redirect = id => {
        router.push(`/restaurants/${id}`)
    }

    return (
        <div className={styles.restaurantCard} onClick={() => {
            redirect(restaurant.id)
        }}>
            {newRestaurant &&
                <div className={styles.newRestaurant}>New</div>
            }
            <div className={styles.cardImage}>
                <img src={restaurant.img_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className='flex flex-col w-[100%] px-[10px]  sm:px-[0] sm:w-[200px] sm:h-[135px]'>
                <div className={styles.restaurantName}>{restaurant.name}</div>
                <div className={styles.restaurantCategory}>{categoryName}</div>
                <div className='flex flex-col sm:flex-row sm:justify-between'>
                    <div className={styles.deliveryPrice}>${restaurant.delivery_price} Delivery</div>
                    <div className={styles.deliveryMin}>{restaurant.delivery_min} Min</div>
                </div>
            </div>

        </div>
    )
}

export default RestaurantCard