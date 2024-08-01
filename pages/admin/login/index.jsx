// 'use client'

import React, { useEffect, useState } from 'react';
import styles from './adminLogin.module.css';
import { montserrat, roboto } from '../../../helper/font'
import Image from 'next/image';
import adminLoginImage from '../../../public/image/admin/adminLogin/adminLogin.svg'
import { useTranslation } from 'next-i18next';
import useSetLanguageStore from '../../../store/setLanguageStore';
import enIcon from '../../../public/image/langs/en.svg'
import azIcon from '../../../public/image/langs/az.svg'
import { loginUser } from '../../../services/axios'
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

const adminData = {
    email: 'admin@gmail.com',
    password: '123456'
}

const AdminLogin = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const [admin, setAdmin] = useState({
        username: '',
        password: ''
    })
    const { change, setLanguage, changeLanguageMethod } = useSetLanguageStore(state => {
        return state
    })

    const checkValidation = async (admin) => {

        if (admin.username.trim() === "admin" && admin.password.trim() === "123456") {
            const response = await loginUser(adminData);
            localStorage.setItem('username', 'admin');
            localStorage.setItem('password', '123456');
            router.push(`/admin`);
        } else {
            toast.error("Incorrect username or password")
        }
    }


    useEffect(() => {
        changeLanguageMethod()
    }, [change])

    const [showLang, setShowLang] = useState(false);

    return (
        <div className='h-[100vh] bg-[#1E1E30]'>
            <div className={`${styles.logoName} ${montserrat.className}`}>Foody<span className='text-orange-400'>.</span></div>
            <div className='mt-[200px] ms-[500px] text-center'>
                <div className={`${styles.adminLogin} flex`}>
                    <form onSubmit={() => {
                        event.preventDefault();
                        checkValidation(admin)
                    }} className={`${styles.adminLoginForm} ${montserrat.className} w-[425px] bg-white text-center`}>
                        <p>
                            {t("welcome admin")}
                        </p>
                        <input type='text' className={`mt-[42px] ${roboto.className}`} placeholder={`${t("username")}`} onChange={(e) => {
                            setAdmin({ ...admin, username: e.target.value })
                        }} />
                        <input type='password' placeholder={`${t("password")}`} className={`mt-[30px] ${roboto.className}`} onChange={(e) => {
                            setAdmin({ ...admin, password: e.target.value })
                        }} />
                        <button type='submit' className={`${roboto.className}`} >
                            {t("sign in")}
                        </button>
                    </form>
                    <div className='w-[405px] bg-[#FFFEFE] flex justify-center'>
                        <div className='h-full flex'>
                            <Image
                                src={adminLoginImage}
                                alt="Picture of the author"
                                width={346}
                                height={304}
                                quality={100}
                            />
                        </div>
                        <div style={{ position: 'relative', marginTop: "7px" }}>
                            <div style={{ cursor: 'pointer' }} onClick={() => {
                                setShowLang(!showLang)
                            }}>
                                <Image
                                    src={change === 1 ? enIcon : azIcon}
                                    alt='language'
                                    width={40}
                                    height={40}
                                    quality={100}
                                />
                            </div>
                            {showLang &&
                                <div className='absolute hover:cursor-pointer bg-[#27283C] mt-2 w-[40px] h-[40px] flex items-center justify-center' onClick={() => {

                                    setLanguage(change === 1 ? 2 : 1)
                                    setShowLang(false)
                                }}>
                                    <Image
                                        src={change === 1 ? azIcon : enIcon}
                                        alt='language'
                                        width={30}
                                        height={30}
                                        quality={100}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin