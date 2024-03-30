"use client"
import { navLinks } from '@/lib/constants'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const LeftSideBar = () => {
    const pathname=usePathname();
    const router=useRouter()
    // console.log(pathname)
  return (
    <div className='h-screen left-0 top-0 sticky p-8 flex flex-col gap-10 bg-blue-2 shadow-xl max-lg:hidden' >
        <div className='cursor-pointer' onClick={() => router.push('/')}>
        <Image src='/logo.gif' alt='logo' width={100} height={30} unoptimized/>
        </div>
        <hr className="h-[3px] bg-grey-2  border-0" />
        <div className='flex
         flex-col gap-8'>
            {navLinks.map((link,index)=>(
                <Link href={link.url} key={index} className={` ${pathname === link.url? 'text-blue-1': ""}`} >
                    <span className='flex flex-nowrap gap-2'>{link.icon}
                <p className='flex gap-4 text-body-medium'>{link.label}</p></span>
                    
                </Link>
            ))}

        </div>
        <div className='flex gap-2 text-body-medium items-center'>
            <UserButton/>
            <p>Edit Profile</p>
        </div>
        </div>
  )
}

export default LeftSideBar