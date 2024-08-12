import React from 'react'
import styles from './homeOffer.module.css'

const HomeOffer = ({ offer, index }) => {
    if (index % 2 == 0) {
        return (
            <div className='flex flex-col sm:flex-row justify-between items-center sm:mt-[200px]'>
                <div className='sm:ms-[159px] flex flex-col items-center gap-10 sm:block'>
                    <div className={styles.offerName}>{offer.name}</div>
                    <div className={styles.offerDescription}>{offer.description}</div>
                </div>
                <div className={styles.offerImageContainer}>
                    <div className={styles.offerImageBackground}>
                    </div>
                    <img src={offer.img_url} className={styles.offerImage} />
                </div>
            </div>
        )
    } else {
        return (
            <div className='flex flex-col-reverse sm:flex-row justify-between mt-[70px] sm:mt-[200px] items-center'>
                <div className={styles.offerImageContainer}>
                    <div className={styles.offerImageBackgroundReverse}>
                    </div>
                    <img src={offer.img_url} className={styles.offerImageReverse} />
                </div>
                <div className='sm:ms-[159px] flex flex-col items-center gap-10 sm:block'>
                    <div className={styles.offerName}>{offer.name}</div>
                    <div className={styles.offerDescription}>{offer.description}</div>
                </div>
            </div>
        )
    }
}

export default HomeOffer