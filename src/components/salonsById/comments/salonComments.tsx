


import Link from "next/link"
import {SalonCommentsType,UserCommentType} from "../salonType"
import { FaArrowLeft } from "react-icons/fa"
import Image from "next/image"
import UserComment from "./userComment";
import AllComment from "./allComments";
import { SetStateAction, useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import LoadingAnimation from "@/assets/other/spinner";
import { loadMoreComments } from "@/lib/actions/misc.action";

export default function SalonComments({salon,userId,userComment,setSalon}:{
    salon:SalonCommentsType | null;
    userId?:string;
    userComment?:UserCommentType,
    setSalon:React.Dispatch<SetStateAction<SalonCommentsType| null>>
}) {
    const [loading,setLoading] = useState<boolean>(false)
    const commentsRef = useRef<HTMLDivElement>(null)
    const handleMoreComments = async() => {
        try {
            const res = await loadMoreComments(
                {
                    barberId:salon?.id as string,
                    lastCommentId:salon?.comments[salon.comments.length -1].id as string
                }
            )
            if(res) {
                setSalon((prev:any) => ({...prev,comments:[...prev.comments,...res]}))
                setLoading(false)
            }
        } catch (error) {
            toast(
                {
                    variant:"destructive",
                    title:'Error',
                    description:"Error loading more comments"
                }
            )
        }
    }
    const handleScroll = () => {
        if(salon?.comments.length !==10) return
        const scrollTop = commentsRef?.current?.scrollTop || 0;
        const scrollHeight = commentsRef?.current?.scrollHeight || 0;
        const clientHeight = commentsRef?.current?.clientHeight || 0;
        if (scrollTop + clientHeight >= scrollHeight) {
            setLoading(true);
            handleMoreComments();
            commentsRef?.current?.scrollTo(0, scrollHeight - clientHeight - 10); 
        }
    }
    
    const barberImage = salon?.images[0]
    return (
        <div className="pb-32 overflow-y-auto custom-scrollbar h-screen" ref={commentsRef} onScroll={handleScroll}>
            <div className="py-4 flex  justify-between  mx-2 items-center px-4  md:justify-end border-b border-white/10 md:hidden">
                <Link href={"/"} className="flex gap-2 items-center md:hidden cursor-pointer group">
                    <FaArrowLeft className="text-xl group-hover:opacity-70 transition-all duration-300 group-hover:scale-125"/>
                    <p className="font-bold text-lg cursor-pointer group-hover:opacity-70 transition-all duration-300">Back</p>
                </Link>   
            </div>
            <div className="flex justify-center items-center pt-4 gap-6 md:pt-24 flex-col max-w-[1200px] mx-auto">
                <div className="flex flex-col md:flex-row gap-4 w-full md:items-center">
                    <div className="flex justify-start items-center gap-2 flex-col md:w-[350px] pl-2">
                        <p className="mt-2 text-white/90 text-lg">{salon?.salonName}</p>
                        <Image 
                        src={barberImage as string} 
                        alt={`${salon?.salonName} image`}
                        width={200}
                        priority={true}
                        height={200}
                        className="rounded-lg w-[200px] h-[200px] object-cover" />
                        
                    </div>
                    
                    <div className="w-full h-px bg-white/10 md:hidden " />
                    {userId&&userComment&&<div className="w-full flex gap-4 flex-col items-center md:pr-2">
                        <p className="text-lg">Your comment</p>
                        <UserComment 
                        salonId={salon?.id as string} 
                        userId={userId}
                        userComment={userComment}
                        setSalon={setSalon}/>
                        
                    </div>}

                </div>
                <h1 className="text-lg font-semibold">Comments</h1>
                <div className="w-full h-px bg-white/10" />
                <AllComment comments={salon?.comments as any[]}/>
                {loading&&<LoadingAnimation />}
            </div>
        </div>
    )
}