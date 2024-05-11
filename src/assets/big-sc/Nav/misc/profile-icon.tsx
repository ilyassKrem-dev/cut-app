"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import Login from "./profile/login"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
export default function ProfileIcon() {
    const [show,setShow] = useState<boolean>(false)
    const session = useSession()

    const pathname = usePathname()
    useEffect(() => {
        function handleOutsideClick(event: any) {
          const overlay = document.querySelector(".profile-tabs");
          if (overlay && !overlay.contains(event.target)) {
            
            setShow(false);
          }
        }
    
        document.body.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    if(session.status === 'loading') {
        return (
        <div className="relative">
            <div className="bg-black rounded-full py-2 px-3 flex gap-4 items-center cursor-pointer  hover:opacity-80 transition-all duration-300 border border-dark shadow-[0px_0px_1px_0.5px_rgba(255,255,255,0.2)]" onClick={() => setShow(!show)}>
                <div className="flex flex-col gap-[0.1rem]">
                    <div className="h-[0.2rem] w-5 bg-white/70 rounded-full" />
                    <div className="h-[0.2rem] w-5  rounded-full bg-white/70" />
                    <div className="h-[0.2rem] w-5  rounded-full bg-white/70" />
                </div>
                <div 
                className="rounded-full w-[30px] h-[30px] bg-white/70" />
                
            </div>
        </div>)

    }
    return (
        <div className="relative profile-tabs">
            <div className="bg-black rounded-full  px-3 flex gap-4 items-center cursor-pointer py-2 hover:opacity-80 transition-all duration-300 border border-dark shadow-[0px_0px_1px_0.5px_rgba(255,255,255,0.2)]" onClick={() => setShow(!show)}>
                <div className="flex flex-col gap-[0.1rem]">
                    <div className="h-[0.2rem] w-5 bg-white/70 rounded-full" />
                    <div className="h-[0.2rem] w-5  rounded-full bg-white/70" />
                    <div className="h-[0.2rem] w-5  rounded-full bg-white/70" />
                </div>
                <Image 
                src={session?.data?.user?.image || "/profile.jpg"} 
                alt="profile image"
                width={30}
                height={30}
                className="rounded-full w-[30px] h-[30px] bg-white/70" />

            </div>
            {show&&
            <>
                {!session.data?
                <div className="absolute -bottom-36 bg-black shadow-[0px_0px_1px_0.5px_rgba(255,255,255,0.2)] rounded-xl w-[200px] right-0 ">
                    <div className="flex flex-col   border-b border-white/40">
                        {pathname === "/login"||pathname==="/signup"
                        ? 
                        <>
                            <div  className="p-3  hover:bg-white/30 cursor-pointer group text-sm rounded-t-xl">
                                Login
                            </div>
                            <div  className="p-3  hover:bg-white/30 cursor-pointer group text-sm">
                                Sign Up
                            </div>
                        </>
                        :
                        <>
                            <Login setShow={setShow}/>
                            <Link href={'/signup'} className="p-3  hover:bg-white/30 cursor-pointer group text-sm">
                                Sign Up
                            </Link>
                        </>
                        }
                    </div>
                    <div className="flex flex-col  p-3 hover:bg-white/30 rounded-b-xl cursor-pointer group text-sm">
                        <p className="cursor-pointer">More info</p>
                    </div>
                </div>
                :
                <div className="absolute -bottom-24 36 bg-black shadow-[0px_0px_1px_0.5px_rgba(255,255,255,0.2)] rounded-xl w-[200px] right-0">
                    <div className="flex flex-col  p-3 border-b border-white/40 hover:bg-white/30 rounded-t-xl cursor-pointer group text-sm transition-all duration-300" >
                       Profile
                    </div>
                    
                    <div className="flex flex-col  p-3 hover:bg-accent rounded-b-xl cursor-pointer group text-sm text-accent hover:text-white transition-all duration-300" onClick={() => signOut()}>
                        SignOut
                    </div>
                </div>}
            </>}
        </div>
    )
}
