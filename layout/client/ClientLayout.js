import React from 'react'
import styles from './clientLayout.module.css'
import Header from '../../components/client/Header'
import Footer from '../../components/client/Footer'

const ClientLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <main className='sm:w-[calc(100%-60px)] sm:mx-[30px]'>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default ClientLayout