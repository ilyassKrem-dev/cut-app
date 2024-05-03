"use client"
import Logo from "../../Logo/logo"
import ProfileIcon from "./misc/profile-icon"
import { useEffect, useState } from "react"
import SearchBar from "./misc/SearchBar"
import { motion } from "framer-motion"
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
        className={`hidden md:flex  bg-black  shadow-sm p-5 flex-col  items-center  fixed left-0 right-0`}>
            <div className="flex justify-between items-center w-full">
                <Logo />
                <SearchBar scrolling={scrolling}/>
                <div>
                    <ProfileIcon />
                </div>
            </div>
           
        </motion.header>
    )
}