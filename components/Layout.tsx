
import React, { FunctionComponent, FunctionComponentElement } from 'react'
import Navbar from './Navbar'
import { useRouter } from 'next/router'

interface Props {
    children: React.ReactNode
}


const Layout = ({ children }: Props) => {
    const router = useRouter()
    const isLoginPage = router.pathname.includes('login')
    const isRegisterPage = router.pathname.includes('register')
    const isLogoutPage = router.pathname.includes('logout')

    
    return (
        <div className='bg-green-50'>
            {!isLoginPage && !isRegisterPage && !isLogoutPage && <Navbar />}
            {children}
        </div>
    )
}

export default Layout