
import Link from 'next/link'
import React, { ReactNode } from 'react'

interface Props {
    name: string,
    link: string,
    icon?: ReactNode,
}

const Navlink = ({ name, link, icon }: Props) => {
    return (
        <Link href={link} className='text-black hover:text-white hover:opacity-75 hover:bg-green-400 transition p-2 flex gap-2 justify-center items-center'>
            <div>
                {icon}
            </div>
            <div className='sm:block hidden'>
                {name}
            </div>

        </Link>
    )
}

export default Navlink