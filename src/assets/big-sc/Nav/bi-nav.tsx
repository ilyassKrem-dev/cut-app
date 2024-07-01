"use client"
import Logo from "../../Logo/logo"
import ProfileIcon from "../../header-assets/misc/profile-icon"
import { useEffect, useState } from "react"
import SearchBar from "./misc/SearchBar"
import { motion } from "framer-motion"
import { Suspense } from "react"
import AuthProvider from "@/assets/wrappers/AuthWrapper"
import LoggedInIcons from "@/components/AuthFeatures/loggedInIcons"
export default function BiMainNav() {
    const [scrolling, setScrolling] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolling(true)
            } else {
                setScrolling(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    
    return (
        <motion.header
        initial={{height:'11rem'}}
        animate={{height:scrolling?"6.313rem":"11rem"}}
        transition={{ease:"linear"}}
        className={`hidden md:flex  bg-black   p-5 flex-col  items-center  fixed left-0 right-0  shadow-[0px_0px_1px_1px_rgba(255,255,255,0.1)] z-40`}>
            <div className="flex justify-between items-center w-full">
                <Logo />
                <Suspense>
                    <SearchBar scrolling={scrolling}/>
                </Suspense>
                <AuthProvider>
                    <div className="flex justify-between items-center gap-5">
                        {!scrolling&&<LoggedInIcons />}
                        <ProfileIcon />

                    </div>
                </AuthProvider>
            </div>
           
        </motion.header>
    )
}