import React from 'react'
import styles from './clientFooter.module.css'
import { montserrat, mukta, roboto } from '../../../helper/font'
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <div className={`${styles.footer} ${roboto.className}`}>
            <div className={styles.footerMain}>
                <div className={styles.footerInfo}>
                    <div className={`${styles.logoNameForFooter} ${mukta.className}`}>Foody<span>.</span></div>
                    <div className={styles.text}>Lorem ipsum is placeholder text commonly used in the graphic, </div>
                    <div className={`flex gap-3 ${styles.icons}`}>
                        <div><XIcon style={{ background: '#FB9300', borderRadius: '100%', width: '40px', height: '40px', padding: "3px" }} /></div>
                        <div><FacebookIcon style={{ color: '#FB9300', borderRadius: '100%', width: '40px', height: '40px' }} /></div>
                        <div><InstagramIcon style={{ background: '#FB9300', borderRadius: '100%', width: '40px', height: '40px' }} /></div>
                    </div>
                </div>
                <div className={`flex gap-24 ${styles.list} ${montserrat.className}`}>
                    <ul>
                        <li>Popular</li>
                        <li>Programming</li>
                        <li>Books for children</li>
                        <li>Psychology</li>
                        <li>Business</li>
                    </ul>
                    <ul>
                        <li>Cash</li>
                        <li>Delivery</li>
                        <li>Payment</li>
                        <li>About the store</li>
                    </ul>
                    <ul>
                        <li>Help</li>
                        <li>Contacts</li>
                        <li>Purchase returns</li>
                        <li>Buyers help</li>
                    </ul>
                </div>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <div className={styles.privacyPolicy}>All rights reserved © 2003-2024 Foody TERMS OF USE | Privacy Policy</div>
            </div>
        </div>
    )
}

export default Footer