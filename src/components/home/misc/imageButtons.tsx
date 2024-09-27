"use client"
import { LuShare } from "react-icons/lu";

import FavoritesIcon from "@/components/salonsById/assets/aboveImages/favorites";
import { getUserFavorites } from "@/lib/actions/user.action";
import { useEffect, useState } from "react";
import ShareLink from "@/assets/other/shareLink";



export default function ImageButtons({userId,barberId,barberImage,barberName}:{
    userId:string|null;
    barberId:string;
    barberImage:string;
    barberName:string;
}) {
    const [userFav,setUserFav] = useState<boolean|null>(null)
    const [showShare,setShowShare] = useState<boolean>(false)
    useEffect(() => {
        if(!userId) return setUserFav(false)
        const fetchingUser = async() => {
                try {
                    const res = await getUserFavorites(userId,barberId as string)
                    setUserFav(res)
                    
                } catch (error) {
                    console.error(error)
                }
        }
        fetchingUser()
    },[userId,barberId])
    return (
        <>
            {userFav!==null?<div>
                {userId?
                <div className="absolute top-3 right-3 bg-transparent rounded-full p-1 hover:opacity-60 transition-all duration-300 cursor-pointer">
                    <FavoritesIcon 
                    userId={userId}
                    barberId={barberId}
                    favState={userFav || false}/>
                </div>
                :
                <div className="absolute top-3 right-3 bg-transparent rounded-full p-1 hover:opacity-60 transition-all duration-300 cursor-pointer" onClick={() => setShowShare(true)}>
                <LuShare className="text-xl text-black"/>
                </div>}
                {showShare&&<ShareLink
                barberImage={barberImage}
                barberName={barberName}
                setShowShare={setShowShare}
                barberId={"/salons/"+barberId}/>}
                
            </div>:
            <div className="flex justify-end gap-4 absolute  top-3 right-3">
                {!userId?
                <div className=" rounded-full p-1 hover:opacity-60 transition-all duration-300 cursor-pointer flex items-center gap-2">
                    <div className="bg-gray-500/50 w-[28px] h-[28px] text-xl rounded-full "/>
                </div>:
                <div className=" rounded-full p-1 hover:opacity-60 transition-all duration-300 cursor-pointer flex items-center gap-2">
                    <div className="bg-gray-500/50 w-[34px] h-[34px] text-xl rounded-full "/>
                </div>}
            </div>}
        </>
    )
}