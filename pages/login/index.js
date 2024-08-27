"use client"

import React, { useEffect, useState } from 'react'
import styles from './userLogin.module.css'
import Image from 'next/image';
import enIcon from '../../public/image/langs/en.svg'
import azIcon from '../../public/image/langs/az.svg'
import useSetLanguageStore from '../../store/setLanguageStore'
import useShowPopupStore from '../../store/showPopupStore'
import { mukta, roboto } from '../../helper/font'
import loginImage from '../../public/image/client/login/login.svg'
import registerImage from '../../public/image/client/login/register.svg'
import toast from 'react-hot-toast';
import { loginUser, registerUser } from '../../services/axios'
import { useRouter } from 'next/router';
import currentUserStore from '../../store/currentUserStore';
import back from '../../public/image/admin/sidebar/back.svg'
import useBasketStore from '../../store/basketStore/basketStore';
import { errorMessajeContainer, succesMessajeContainer } from '../../helper/toastMessageContainer'
import { useTranslation } from 'react-i18next';
import '../../public/lang/i18n'

const UserLogin = () => {

    const { t } = useTranslation();

    const [showLang, setShowLang] = useState(false);
    const [active, setActive] = useState(1);
    const router = useRouter();
    const { currentUser, setCurrentUser } = currentUserStore();

    const [registeredUser, setRegisteredUser] = useState({
        fullName: "",
        username: "",
        email: "",
        password: ""
    });

    const [loggedInUser, setLoggedInUser] = useState({
        email: "",
        password: ""
    });

    const { change, setLanguage, changeLanguageMethod } = useSetLanguageStore(state => {
        return state
    })

    const { showSidebarModal, setShowSidebarModal } = useShowPopupStore(state => {
        return state
    })

    useEffect(() => {
        changeLanguageMethod()
    }, [change])

    const validateEmail = (email) => {
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const result = pattern.test(email);
        if (result === true) {
            return false;
        } else {
            return true
        }
    }
    const register = async (registeredUser) => {
        if (registeredUser.fullName.trim().length < 3) {
            toast.error("Full name must contain three letters at least", errorMessajeContainer)
        } else if (registeredUser.username.trim().length < 3) {
            toast.error("Username must contain three letters at least", errorMessajeContainer)
        } else if (registeredUser.email.trim().length < 3 || validateEmail(registeredUser.email)) {
            toast.error("Invalid email address", errorMessajeContainer)
        } else if (registeredUser.password.trim().length < 10) {
            toast.error("Password must contain at least ten character", errorMessajeContainer)
        } else {
            const response = await registerUser(registeredUser);
            if (response?.status === 201) {
                toast.success("User successfully registered", succesMessajeContainer)
                setRegisteredUser({
                    fullName: "",
                    username: "",
                    email: "",
                    password: ""
                })
                setActive(1)
            } else {
                toast.error("Something went wrong", errorMessajeContainer)
            }
        }
    }

    const { getBasketState } = useBasketStore();

    const login = async (loggedInUser) => {
        if (loggedInUser.email.trim().length < 3) {
            toast.error("Email must contain three letters at least", errorMessajeContainer)
        } else if (loggedInUser.password.trim().length < 10) {
            toast.error("Password must contain at least ten character", errorMessajeContainer)
        } else {
            const response = await loginUser(loggedInUser);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setCurrentUser(response.data.user)
            if (response.status === 200) {
                toast.success("Successfully logged in", succesMessajeContainer)
                getBasketState();
                setShowSidebarModal(false)
                router.back();
            } else {
                toast.error(response.data.error, errorMessajeContainer)
            }
        }
    }
    return (
        <div>
            <header className={styles.loginHeader}>
                <div className=' flex flex-row ps-[15px] items-center'>
                    <div className='sm:hidden hover:scale-75' onClick={() => { router.push("/") }}>
                        <Image src={back} width={14} height={13} />
                    </div>
                    <div className={`${styles.loginHeaderName} ${mukta.className}`}>Foody.</div>
                </div>
                <div className={styles.loginLanguage}>
                    <div className={styles.images} onClick={() => {
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
                        <div className={`absolute bg-[#27283C] mt-2 w-[40px] h-[40px] flex items-center justify-center ${styles.images}`} onClick={() => {

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
            </header>
            <main className='flex flex-col sm:flex-row w-calc(100%-24px) sm:w-calc(100%-60px) m-[12px] sm:m-[30px]'>
                <div className={styles.aside}>
                    {active === 1 ?
                        <div className={styles.asideImages}>
                            <Image src={loginImage} width={0} height={0} style={{ width: '100%', height: '100%' }} />
                        </div>

                        :
                        <div className={styles.asideImages}>
                            <Image src={registerImage} width={0} height={0} style={{ width: '100%', height: '100%' }} />
                        </div>
                    }
                </div>
                <div className={`${styles.login} ${roboto.className} flex sm:flex-1 justify-center `}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        active === 1 ? login(loggedInUser) : register(registeredUser);
                    }}>
                        {active === 1 ?
                            <div>
                                <div className={`flex justify-center gap-8 my-[100px] ${styles.heading}`}>
                                    <div className={`${active === 1 ? styles.active : ""}`} onClick={() => { setActive(1) }}>{t("login")}</div>
                                    <div className={`${active === 2 ? styles.active : ""}`} onClick={() => { setActive(2) }}>{t("register")}</div>
                                </div>
                                <div className='flex flex-col gap-3'>
                                    <label htmlFor='email' >{t("email")}</label>
                                    <input value={loggedInUser.email} type='text' id='email' onChange={(e) => { setLoggedInUser({ ...loggedInUser, email: e.target.value }) }} />
                                </div>
                                <div className='flex flex-col gap-3 mt-5'>
                                    <label htmlFor='password' >{t("password")}</label>
                                    <input type='password' id='password' value={loggedInUser.password} onChange={(e) => { setLoggedInUser({ ...loggedInUser, password: e.target.value }) }} />
                                </div>
                                <div>
                                    <button>{t("log in")}</button>
                                </div>
                            </div> :
                            <div>
                                <div className={`flex justify-center gap-8 my-[100px] ${styles.heading}`}>
                                    <div className={`${active === 1 ? styles.active : ""}`} onClick={() => { setActive(1) }}>{t("login")}</div>
                                    <div className={`${active === 2 ? styles.active : ""}`} onClick={() => { setActive(2) }}>{t("register")}</div>
                                </div>
                                <div className='flex flex-col gap-3'>
                                    <label htmlFor='fullName' >{t("full name")}</label>
                                    <input type='text' id='fullName' value={registeredUser.fullName} onChange={(e) => { setRegisteredUser({ ...registeredUser, fullName: e.target.value }) }} />
                                </div>
                                <div className='flex flex-col gap-3 mt-5'>
                                    <label htmlFor='username' >{t("username")}</label>
                                    <input type='text' id='username' value={registeredUser.username} onChange={(e) => { setRegisteredUser({ ...registeredUser, username: e.target.value }) }} />
                                </div>
                                <div className='flex flex-col gap-3 mt-5'>
                                    <label htmlFor='email' >{t("email")}</label>
                                    <input type='text' id='email' value={registeredUser.email} onChange={(e) => { setRegisteredUser({ ...registeredUser, email: e.target.value }) }} />
                                </div>
                                <div className='flex flex-col gap-3 mt-5'>
                                    <label htmlFor='password' >{t("password")}</label>
                                    <input type='password' id='password' value={registeredUser.password} onChange={(e) => { setRegisteredUser({ ...registeredUser, password: e.target.value }) }} />
                                </div>
                                <div>
                                    <button>{t("login")}</button>
                                </div>
                            </div>
                        }
                    </form>
                </div>
            </main>
        </div>
    )
}

export default UserLogin