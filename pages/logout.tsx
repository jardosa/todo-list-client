import Link from 'next/link'
import React, { useEffect } from 'react'

const Logout = () => {
    useEffect(() => {
        localStorage.removeItem('authToken')
    }, [])
    return (
        <div className="grid place-items-center w-full h-screen bg-green-200">
            <div className="text-center space-y-2">
                <div className="text-lg">You have been logged out</div>
                <div>
                    <Link
                        className="hover:text-green-400 focus:text-green-400 transition cursor-pointer underline"
                        href={'/login'}
                    >
                        Click Here to go to login page
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Logout
