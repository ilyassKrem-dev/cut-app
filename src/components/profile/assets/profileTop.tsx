
import { FaCheckCircle,FaTimesCircle,FaExternalLinkAlt ,FaUser  } from "react-icons/fa";import { MdHistory } from "react-icons/md";
import Link from "next/link"
import Image from "next/image"
import { SetStateAction } from "react";
import ProfileSettings from "./settings/profileSettings";

export default function ProfileTop({profileImage,profileName,profileBarber,profileCompelted,setTab,tab}:{
    profileImage:string;
    profileName:string;
    profileCompelted:boolean
    profileBarber:{
        isBarber:boolean;
        barberId:string|null
    };
    setTab:React.Dispatch<SetStateAction<string>>;
    tab:string;
}) {

    return (
        <div className="flex gap-10  md:flex-row items-center md:gap-12 md:items-start h-full justify-between md:w-full">
            <div className="flex gap-10 flex-col md:flex-row items-center md:gap-12 md:items-start h-full">
                <div>
                    <Image 
                    src={profileImage} 
                    alt={`${profileName} image`} 
                    width={500}
                    height={500}
                    className="w-[200px] h-[200px] rounded-lg object-cover"/>
                </div>
                <div className="flex flex-col justify-between h-[100px] md:h-[200px] items-center gap-10">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2  flex-col items-center md:items-start">
                            <div className="flex gap-2 items-center  md:gap-4">
                                <p className="text-xl font-semibold capitalize">{profileName}</p>
                                {profileCompelted?<div className="flex gap-2 items-center text-green-1 text-sm">
                                    <FaCheckCircle />
                                    <p className="hidden md:inline-block">Completed</p>
                                </div>
                                :
                                <div className="flex gap-2 items-center text-accent text-sm">
                                    <FaTimesCircle />
                                    <p className="hidden md:inline-block">incompleted</p>
                                </div>}
                                
                            </div>
                            {!profileBarber.isBarber&&
                            <Link className="flex gap-2 text-white/60 underline cursor-pointer hover:opacity-60 transition-all duration-300 text-sm md:text-base items-center   " href={`salons/${profileBarber.barberId}`}>
                                <FaExternalLinkAlt/>
                                <p className="cursor-pointer">Salon</p>
                            </Link>}
                        </div>

                    </div>
                    <div className="border-b border-b-white/10 flex items-center gap-6">
                            <div className={`flex gap-3 items-center   py-2 cursor-pointer font-bold hover:bg-white/10 hover:rounded-lg hover:border-white/10 p-1 transition-all duration-300 ${tab=="history"?"border-white border-b":""}`} onClick={() => setTab("history")}>
                                <MdHistory className="text-xl"/>History
                            </div>
                            <div className={`flex gap-3 items-center  py-2 cursor-pointer font-bold hover:bg-white/10 hover:rounded-lg hover:border-white/10 p-1 transition-all duration-300 ${tab=="about"?"border-white border-b":""}`} onClick={() => setTab("about")}>
                                <FaUser className="text-xl"/>About
                            </div>
                    </div>
                </div>
                                
            </div>
            <ProfileSettings/>
        </div>
    )
}