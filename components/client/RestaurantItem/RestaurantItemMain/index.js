import React, { useEffect, useState } from 'react'
import styles from './restaurantItemMain.module.css'
import { getCategories, getRestaurants } from '../../../../services/axios';
import RestaurantCard from './RestaurantCard'
import useRestaurantStore from '../../../../store/restaurantStore';
import useRefreshStore from '../../../../store/refreshStore';
import filterImage from '../../../../public/image/client/filter.svg'
import Image from 'next/image';
import { mukta, roboto } from '../../../../helper/font';
import CloseIcon from '@mui/icons-material/Close';

const RestaurantItemMain = () => {
    const { restaurants, setRestaurants } = useRestaurantStore();
    const { refresh, setRefresh } = useRefreshStore();
    const [filterPopup, setFilterPopup] = useState(false);
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState(0);

    useEffect(() => {
        getAllRestaurant();
    }, [refresh])

    const getAllRestaurant = async () => {
        try {
            const response = await getRestaurants()
            setRestaurants(response.data.result.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    const getAllCategories = async () => {
        try {
            const response = await getCategories()
            setCategories(response.data.result.data)
        } catch (err) {
            console.error(err)
        }
    }

    const getRestaurantsByCategoryId = async (id) => {
        const response = await getRestaurants()
        const restaurants = response?.data.result.data

        const filteredRestaurants = restaurants?.filter((restaurant) => {
            return restaurant.category_id == id
        })
        setRestaurants(filteredRestaurants)
    }

    return (
        <div className='flex flex-1 flex-col items-center relative'>
            <div className={`${styles.filter} ${mukta.className}`}
                onClick={() => { setFilterPopup(true) }}
            >
                <Image src={filterImage} width={18} height={12} alt='filter_image' />
                Filters
            </div>
            <div className={`flex flex-1 gap-14 sm:ms-[50px]  flex-wrap 2xl:gap-16 ${styles.main}`}>
                {restaurants.map((restaurant, index) => (
                    <RestaurantCard restaurant={restaurant} key={restaurant.id} />
                ))}
            </div>
            {filterPopup &&
                <div className={`${styles.modal} ${mukta.className}`}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <div className={styles.close} onClick={() => { setFilterPopup(false) }}>
                                <CloseIcon />
                            </div>
                        </div>
                        <div className={styles.modalBody}>
                            <ul className='px-[60px]'>
                                <li className={`${styles.categoryName} ${active === 0 ? styles.active : ""}`} onClick={() => {
                                    setRefresh(!refresh);
                                    setActive(0)
                                    setFilterPopup(false)
                                }}>All</li>
                                {categories.map((category, index) => (
                                    <li className={` ${active === (index + 1) ? styles.active : ""}`} onClick={() => {
                                        getRestaurantsByCategoryId(category.id)
                                        setActive(index + 1)
                                        setFilterPopup(false)
                                    }}
                                        key={category.id}>
                                        <div className={`${styles.categoryName}`}>{category.name}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default RestaurantItemMain