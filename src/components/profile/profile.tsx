
import { useState } from "react"
import Image from "next/image";
import StarIcon from '@mui/icons-material/Star';
import ProfileTop from "./assets/profileTop"
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
export default function Profile({profile}:{
    profile:Profile
}) {
    const [tab,setTab] = useState<string>("about")

    return (
        <> 
            {profile&&
            <div className="flex flex-col pt-24 lg:p-32 md:p-12 md:pt-32 justify-center items-center md:items-start gap-10 py-36 h-full">
                <ProfileTop
                    profileImage={profile.image}
                    profileName={profile.name}
                    profileCompelted={profile.completed}
                    profileBarber={
                        {isBarber:profile.isBarber,
                        barberId:profile.barberId}
                    }
                    setTab={setTab}
                    tab={tab}
                />
                {tab=="about"
                ?
                <div className="flex justify-between w-full flex-col md:flex-row gap-5 md:gap-0 mt-10">
                    <div className="flex flex-col flex-1 gap-12 md:order-1 order-2">
                        <h4 className="text-white/60 font-bold border-b border-white/20  md:w-fit pl-4 md:pl-0 text-lg">Commentes</h4>
                        <div>
                            {profile.comments.length > 0 
                            ?
                            <div className="max-w-[500px] mx-auto">
                                {profile.comments.map((comment,index) =>{
                                const {barber} = comment
                                return (
                                    <div key={comment.id+index} className="border border-white/10 rounded-xl w-full">
                                        <div className="flex items-start gap-1 border-b border-white/10 p-2">
                                            <Image 
                                            src={barber.images[0]} 
                                            alt={`${barber.salonName} profile picture`}
                                            width={50}
                                            height={50}
                                            className="rounded-full object-cover w-[50px] h-[50px]" />
                                            <div className="flex flex-col">
                                                <p className="text-sm text-white/80">{barber.salonName}</p>
                                                <div className="flex gap-1 items-center">
                                                    <StarIcon  className="text-sm text-white/50"/>
                                                    <p className="text-sm">{comment.stars}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" break-words text-base p-4">
                                            {comment.comment}
                                        </div>
                                    </div>
                                )
                            })}
                            </div>
                            
                            :
                            <div>
                                <h2 className="text-sm text-center">You dont have any comments</h2>    
                            </div>}
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 md:order-2  order-1 gap-6">
                        <h4 className="text-white/60 font-bold border-b border-white/20 md:w-fit pl-4 md:pl-0 text-lg">Info</h4>
                        <div className="flex flex-col gap-4 px-10">
                            <div className="flex flex-col md:flex-row md:gap-10 gap-2">
                                <p className="font-bold w-[100px]">Phone:</p>
                                <p className="text-white/60">{profile.phoneNumber?profile.phoneNumber:"Add a number"}</p>
                            </div>
                            <div className="flex flex-col md:flex-row md:gap-10 gap-2 ">
                                <p className="font-bold w-[100px]">Email:</p>
                                <p className="text-white/60">{profile.email}</p>
                            </div>
                            <div className="flex flex-col md:flex-row md:gap-10 gap-2 ">
                                <p className="font-bold w-[100px]">Password:</p>
                                <p className="text-white/60">••••••••</p>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="flex justify-between w-full flex-col md:flex-row gap-5 md:gap-0">
                    
                </div>}
            </div>}
        </>
    )
}