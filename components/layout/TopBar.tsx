"use client"
import { navLinks } from "@/lib/constants"
import { UserButton } from "@clerk/nextjs"
import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

const TopBar = () => {
    const [dropDownOpen,setDropDown]=useState(false)
    const pathname=usePathname();
    const router = useRouter()
  return (
    <>
    <div className="sticky top-0 z-30 w-full flex justify-between items-center px-8 py-2 bg-slate-50 shadow-xl lg:hidden">
    <div onClick={()=>router.push("/")} className="relative w-24 h-10">
      <Image src='/logo.gif' alt='logo' fill={true} />
      </div>
      
        <div className='flex gap-8 max-md:hidden'>
            {navLinks.map((link,index)=>(
                <Link href={link.url} key={index} 
                className={`flex gap-2 text-body-medium cursor-pointer ${pathname === link.url? 'text-blue-1': ""}`}
                >
                    
                <p>{link.label}</p>
                    
                </Link>
            ))}

        </div>
        <div className='relative flex gap-2 items-center'>
            <Menu className="cursor-pointer md:hidden" onClick={()=>setDropDown((prev)=>!prev)}/>
            {dropDownOpen && (
                <div className='absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg'>
            {navLinks.map((link,index)=>(
                <Link onClick={()=>setDropDown((prev)=>!prev)} href={link.url} key={index} className={` ${pathname === link.url? 'text-blue-1': ""} cursor-pointer`}  >
                    
                <span className='flex flex-nowrap gap-2'>{link.icon}
                <p className='flex gap-4 text-body-medium'>{link.label}</p></span>
                    
                </Link>
            ))}

        </div>
            )}
            <UserButton/>
        </div>
    </div>
    </>
  )
}

export default TopBar