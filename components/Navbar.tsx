
import React from 'react'
import Navlink from './Navlink'
import { ArrowRightOnRectangleIcon, HomeIcon, PencilSquareIcon, UserIcon } from '@heroicons/react/24/solid'

const Navbar = () => {

    const links = [
        {
            name: 'Home',
            link: '/',
            icon: <HomeIcon className='h-5 w-5' />
        },
        {
            name: 'Users',
            link: '/users',
            icon: <UserIcon className='h-5 w-5' />
        },
        {
            name: 'Todos',
            link: '/todos',
            icon: <PencilSquareIcon className='h-5 w-5' />
        },
        {
            name: 'Log Out',
            link: '/logout',
            icon: <ArrowRightOnRectangleIcon className='h-5 w-5'/>
        }
    ]

    const navLinks = links.map((navlink) => (<Navlink key={navlink.link} {...navlink} />))

    return (
        <nav className='w-full h-[60px] bg-gray-100 flex flex-row justify-center gap-3 sticky'>
            {navLinks}
        </nav>
    )
}

export default Navbar