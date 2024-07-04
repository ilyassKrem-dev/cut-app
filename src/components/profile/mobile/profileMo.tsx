import Link from "next/link";
import { IoLogOutOutline  } from "react-icons/io5";
import { FaUserEdit,FaKey,FaRegUser, FaArrowLeft,FaRegHeart  } from "react-icons/fa";
import { FiPaperclip } from "react-icons/fi";

import { useState } from "react"
import Image from "next/image";
import Profile from "../profile";
import { CiCreditCard1 } from "react-icons/ci";
import { signOut } from "next-auth/react";
type Profile  = {
    id:string;
    image:string;
    name:string;
    isBarber:boolean;
    completed:boolean;
    createdAt:any;
    email:string;
    phoneNumber:string|null;
    comments:any[];
    barberId:string|null
}


export default function ProfileM({profile}:{profile:Profile}) {
    const [tab,setTab] = useState<string>("")
  
    return (
        <>
            {!tab?
            <div className="flex h-full  flex-col pt-12 sm:w-[60%] sm:mx-auto gap-14 mx-6 sm:ml-6">
                <div className="flex gap-2">
                    <Image 
                    src={profile.image || "/profile.jpg"} 
                    alt={`${profile.name} profile picture`}
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-white/20 w-[80px] h-[80px] opacity-90" />
                    <div className="flex mt-4 flex-col gap-1 ">
                        <p className=" text-white/80">{profile.name}</p>
                        <p className=" text-white/60 text-xs truncate max-w-full max-[330px]:max-w-[50%]">{profile.email}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-6 items-start w-full  pb-32" >
                    <div className="flex gap-4 text-base w-full items-center p-2 rounded-lg active:bg-white/30 hover:bg-white/20 transition-all duration-300 cursor-pointer" onClick={() => setTab("profile")}>
                        <FaRegUser className="text-xl text-white/60"/>
                        Profile
                    </div>
                    <Link 
                    href={"/favorites"}
                    className="flex gap-4 text-base w-full items-center p-2 rounded-lg active:bg-white/30 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                        <FaRegHeart className="text-xl text-white/60 cursor-pointer"/>
                        Favorites
                    </Link>
                    <Link 
                    href={"/reserves"}
                    className="flex gap-4 text-base w-full items-center p-2 rounded-lg active:bg-white/30 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                        <FiPaperclip className="text-xl text-white/60 cursor-pointer"/>
                        Reservations
                    </Link>
                    <Link 
                        href={"/profile/edit"}
                        className="flex gap-4 text-lg w-full items-center p-2 rounded-lg active:bg-white/30 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                            <FaUserEdit className="text-xl text-white/60 cursor-pointer"/>
                            Edit Profile
                    </Link>
                    <Link  href={"/profile/password"} className="flex gap-4 text-base w-full items-center p-2 rounded-lg active:bg-white/30 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                        <FaKey className="text-xl text-white/60 cursor-pointer"/>
                        Change Passowrd
                    </Link>
                    <Link 
                    href={"/profile/payment"}
                    className="flex gap-4 text-base w-full items-center p-2 rounded-lg active:bg-white/30 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                        <CiCreditCard1 className="text-xl text-white/60 cursor-pointer"/>
                        Payment Method
                    </Link>
                    
                    <div className="flex gap-4 text-base w-full items-center p-2 rounded-lg active:bg-accent/30 hover:bg-accent/20 transition-all duration-300 cursor-pointer opacity-80 text-accent" onClick={() => signOut({callbackUrl:"/login?next=profile"})}>
                        <IoLogOutOutline className="text-xl "/>
                        Logout
                    </div>
                </div>
            </div>
            :
            <div className="py-12">
                <Profile profile={profile}/>
                <div className="fixed top-0 right-0 left-0 p-2 border-b border-white/20 z-50 bg-black">
                    <div className="text-xl cursor-pointer p-2 rounded-full hover:bg-white/20 active:bg-white/40 transition-all duration-300 w-fit " onClick={() => setTab("")}>
                        <FaArrowLeft  />
                    </div>
                    
                </div>
            </div>
            }
        </>
    )
}