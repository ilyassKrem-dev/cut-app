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
            initial={{ height: '96px', background: 'rgba(0,0,0,0.6)' }}
            animate={{ height: scrolling ? '68px' : '96px' }}
            transition={{ ease: 'easeOut', duration: 0.28 }}
            className={`hidden md:block fixed left-0 right-0 top-0 z-50`}
        >
            <div className={`backdrop-blur-md bg-gradient-to-b from-black/60 to-black/40 border-b border-white/6`}> 
                <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-6 px-6 py-3">
                    {/* left - logo + tagline */}
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="flex items-center gap-3">
                            <Logo />
                        </div>
                        <div className="hidden lg:block">
                            <p className="text-sm text-white/60 truncate">Find the best barbers near you</p>
                        </div>
                    </div>

                    {/* center - search */}
                    <div className="flex-1 px-4">
                        <Suspense>
                            <SearchBar scrolling={scrolling} />
                        </Suspense>
                    </div>

                    {/* right - actions */}
                    <AuthProvider>
                        <div className="flex items-center gap-4">
                            <div className="hidden lg:flex items-center gap-4">
                                {/* keep LoggedInIcons but hide when compact */}
                                {!scrolling && <LoggedInIcons />}
                            </div>
                            <div className="flex items-center">
                                <ProfileIcon />
                            </div>
                        </div>
                    </AuthProvider>
                </div>
            </div>
        </motion.header>
    )
}