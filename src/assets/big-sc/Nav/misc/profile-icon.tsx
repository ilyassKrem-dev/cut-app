"use client"

import Image from "next/image"
import { useState } from "react"
import Login from "./profile/login"
export default function ProfileIcon() {
    const [show,setShow] = useState<boolean>(false)

    return (
        <div className="relative">
            <div className="bg-black rounded-full p-[0.4rem] px-3 flex gap-4 items-center cursor-pointer hover:opacity-80 transition-all duration-300 border border-dark shadow-[0px_0px_1px_0.5px_rgba(255,255,255,0.2)]" onClick={() => setShow(!show)}>
                <div className="flex flex-col gap-[0.1rem]">
                    <div className="h-[0.2rem] w-5 bg-white/70 rounded-full" />
                    <div className="h-[0.2rem] w-5  rounded-full bg-white/70" />
                    <div className="h-[0.2rem] w-5  rounded-full bg-white/70" />
                </div>
                <Image 
                src={"/profile.jpg"} 
                alt="profile image"
                width={30}
                height={30}
                className="rounded-full w-[30px] h-[30px] bg-white/70" />

            </div>
            {show&&
            <div className="absolute -bottom-28 bg-black shadow-[0px_0px_1px_0.5px_rgba(255,255,255,0.2)] rounded-xl w-[200px] right-0">
                <Login setShow={setShow}/>
                <div className="flex flex-col  p-3 hover:bg-white/30 rounded-b-xl cursor-pointer group text-sm">
                    <p>Messages</p>
                </div>
            </div>}
        </div>
    )
}