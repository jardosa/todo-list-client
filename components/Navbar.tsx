
import React from 'react'
import Navlink from './Navlink'
import { HomeIcon, PencilSquareIcon, UserIcon } from '@heroicons/react/24/solid'

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
        }
    ]

    const navLinks = links.map((navlink) => (<Navlink key={navlink.link} {...navlink} />))

    return (
        <nav className='w-full h[40px] bg-gray-100 flex flex-row justify-center gap-3'>
            {navLinks}
        </nav>
    )
}

export default Navbar