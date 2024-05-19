"use client"
import { LuShare } from "react-icons/lu";

import { FaArrowLeft  } from "react-icons/fa";
import Link from "next/link";
import {  getUserFavorites } from "@/lib/actions/user.action";
import FavoritesIcon from "./favorites";

import { useEffect, useState } from "react";
export default function AboveView({userId,barberId}:{
    userId:string | null | undefined;
    barberId:string|undefined
}) {
    const [userFav,setUserFav] = useState<boolean|null>(null)
   
    useEffect(() => {
        if(!userId) return setUserFav(false)
        const fetchingUser = async() => {
                try {
                    const res = await getUserFavorites(userId)
                    setUserFav(res)
                    
                } catch (error) {
                    console.error(error)
                }
        }
        fetchingUser()
    },[userId])
    
    return (
        <div className="my-4 flex  justify-between  mx-2 items-center px-4  md:justify-end">
            <Link href={"/"} className="flex gap-2 items-center md:hidden cursor-pointer group">
                <FaArrowLeft className="text-xl group-hover:opacity-70 transition-all duration-300 group-hover:scale-125"/>
                <p className="font-bold text-lg cursor-pointer group-hover:opacity-70 transition-all duration-300">Home</p>
            </Link>
            {userFav!==null?
            <div className="flex justify-end gap-4 ">
                <div className=" rounded-full p-1 hover:opacity-60 transition-all duration-300 cursor-pointer flex items-center gap-2">
                    <LuShare className="text-xl "/>
                    <p className="text-xs underline hidden md:block cursor-pointer">Share</p>
                </div>
                <FavoritesIcon 
                userId={userId}
                barberId={barberId}
                favState={userFav || false}/>

            </div>
            :
            <div className="flex justify-end gap-4 ">
                <div className=" rounded-full p-1 hover:opacity-60 transition-all duration-300 cursor-pointer flex items-center gap-2">
                    <div className="bg-gray-500 w-[20px] h-[20px] text-xl rounded-md "/>
                    <div className="bg-gray-500 w-[35px] h-[20px] text-xl rounded-md hidden md:block"/>
                </div>
                <div className=" rounded-full p-1 hover:opacity-60 transition-all duration-300 cursor-pointer flex items-center gap-2">
                    <div className="bg-gray-500 w-[24px] h-[24px] text-xl rounded-md "/>
                    <div className="bg-gray-500 w-[35px] h-[20px] text-xl rounded-md hidden md:block"/>
                </div>

            </div>}
        </div>
    )
}