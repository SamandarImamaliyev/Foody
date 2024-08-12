'use client'

import React, { useEffect } from 'react'
import styles from './clientHome.module.css'
import HomeItemCard from './HomeItemCard'
import discountImage from '../../../public/image/client/homeCards/discount.svg'
import freshFoodImage from '../../../public/image/client/homeCards/freshFood.svg'
import fastDeliverImage from '../../../public/image/client/homeCards/fastDelivery.svg'
import doubleChessImage from '../../../public/image/client/homeCards/doubleChess.svg'
import margaritaImage from '../../../public/image/client/homeCards/margarita.svg'
import twisterMenuImage from '../../../public/image/client/homeCards/twisterMenu.svg'
import { mukta, roboto } from '../../../helper/font'
import HomeOffer from './HomeOffer'
import useTypeStore from '../../../store/typeStore'
import Image from 'next/image'
import footerLeftImage from '../../../public/image/client/footerLeftImage.svg'
import footerRightImage from '../../../public/image/client/footerRightImage.svg'

const HomeItem = () => {
    const { getOffersState, states } = useTypeStore(state => {
        return state
    })
    useEffect(() => {
        getOffersState();
    }, [])

    return (
        <div className={`${roboto.className}`}>
            <div className={`${styles.homeMain}`}>
                <div className={`${mukta.className} ${styles.info}`}>
                    <div className={`${styles.heading}`}>Our Food site makes it easy to find local food</div>
                    <div className={styles.text}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</div>
                    <div className='flex flex-col items-center sm:flex-row gap-4 sm:gap-8 mb-4 sm:mb-0'>
                        <button className={styles.registerButton}>Register</button>
                        <button className={styles.orderNowButton}>Order now</button>
                    </div>
                </div>
                <div >
                    <img className=' rounded-[100px]' src='https://s3-alpha-sig.figma.com/img/5f22/e6c0/a42d9c1787a860dae90a7daff05e77c5?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nKHXFbFtVsq-YHdTiJvmedZFD5UMssmgPOv07zucC~qI4d1-d5GlDELM9fOErxuRVPnw4nf1glvp-sXaXHnq-dR3AstA2UEe8yB56llb2QE4v2TvDnYoE~nYRj~Q9zrCy5UUMSIjrzLypKuNkcbqUb~ULdTVRAXCj5g9KeL29SNWENAitvyQzQ~2AbO3hKEeAbeQ~Lp0je~rpwjkNuTWhf6~wF4wXU6sXDysocwPZVbhZk~dfsGwj7KpR4oFPujQ0lEggTU4QbjMSeRO46eFQOmh5-qIdcoAJ2Z0hokpTpqO9rRX2CLnemzU8UeUg3QeadXfWDk1uYkCFnZ5L7UcSg__' />
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <div className={styles.featuresHeading}>Features</div>
                <div className={styles.featuresText}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</div>
                <div className='flex gap-28 my-[50px] flex-col sm:flex-row'>
                    <HomeItemCard image={discountImage} heading={"Discount Boucher"} description={"Lorem ipsum is placeholder  commonly used in the graphic"} />
                    <HomeItemCard image={freshFoodImage} heading={"Fresh healthy Food"} description={"Lorem ipsum is placeholder  commonly used in the graphic"} />
                    <HomeItemCard image={fastDeliverImage} heading={"Fast Home Delivery"} description={"Lorem ipsum is placeholder  commonly used in the graphic"} />
                </div>
            </div>
            <div >
                {states.map((offer, index) => (
                    <HomeOffer offer={offer} index={index} key={offer.id} />
                ))}
            </div>
            <div className='flex flex-col items-center mb-[600px]'>
                <div className={styles.featuresHeading}>Our Popular Update New Foods</div>
                <div className={styles.featuresText}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</div>
                <div className='flex flex-col sm:flex-row gap-28 my-[50px]'>
                    <HomeItemCard image={doubleChessImage} heading={"Dubble Chees"} description={"Lorem ipsum is placeholder  commonly used in the graphic"} />
                    <HomeItemCard image={margaritaImage} heading={"Margarita"} description={"Lorem ipsum is placeholder  commonly used in the graphic"} />
                    <HomeItemCard image={twisterMenuImage} heading={"Twister Menu"} description={"Lorem ipsum is placeholder  commonly used in the graphic"} />
                </div>
            </div>
            <div className={styles.discoverRestaurants}>
                <div className={styles.footerImages}>
                    <Image src={footerLeftImage} width={200} height={200} />
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div className={styles.discover}>Discover Restaurants
                        Near From you</div>
                    <div>
                        <button className={styles.exploreButton}>Explore now</button>
                    </div>
                </div>
                <div className={styles.footerImages}>
                    <Image src={footerRightImage} width={200} height={200} />
                </div>
            </div>
        </div>
    )
}

export default HomeItem