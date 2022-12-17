
import React, { FunctionComponent, FunctionComponentElement } from 'react'
import Navbar from './Navbar'
import { useRouter } from 'next/router'

interface Props {
    children: React.ReactNode
}


const Layout = ({ children }: Props) => {
    const router = useRouter()
    const isLoginPage = router.pathname.includes('login')
    
    return (
        <div>
            {!isLoginPage && <Navbar />}
            {children}
        </div>
    )
}

export default Layout