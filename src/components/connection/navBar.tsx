"use client"
import Logo from "@/assets/Logo/logo"
import ProfileIcon from "@/assets/big-sc/Nav/misc/profile-icon"
import LoggedInIcons from "../AuthFeatures/loggedInIcons"
import AuthProvider from "@/assets/wrappers/AuthWrapper"
export default function NavBar() {
    

    
    return (
        <header
        className={`hidden md:flex  bg-black   p-5 flex-col  items-center  fixed left-0 right-0   shadow-[0px_0px_2px_1px_rgba(255,255,255,0.3)] z-50`}>
            <nav className="flex justify-between items-center w-full">
                <Logo />
                <AuthProvider>
                    <div className="flex justify-between items-center gap-5">
                        <LoggedInIcons />
                        <ProfileIcon />

                    </div>
                </AuthProvider>
            </nav>
        </header>
    )
}