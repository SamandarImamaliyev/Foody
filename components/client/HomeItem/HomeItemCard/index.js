import React from 'react'
import styles from './homeItemCard.module.css'
import Image from 'next/image'

const HomeItemCard = ({ image, heading, description }) => {
    return (
        <div className={styles.featuresCard}>
            <div style={{ width: '221px', height: '223px', display: 'flex' }}>
                <Image width={221} height={223} src={image} />
            </div>
            <div className={styles.cardHeading}>{heading}</div>
            <div className={styles.cardText}>{description}</div>
        </div>
    )
}

export default HomeItemCard