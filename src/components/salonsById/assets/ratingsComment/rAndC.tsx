"use client"
import { FaStar } from "react-icons/fa";

import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { checkForRating } from "@/lib/actions/misc.action";
import { changeRating } from "@/lib/actions/misc.action";
export default function RatingsACommentes(
    {rating,
    nmbreComment,
    userId,
    barberId,
    show,
    barberUserId}:{
    rating:number | undefined;
    nmbreComment:number;
    show:string | undefined;
    userId:string | null | undefined;
    barberId:string;
    barberUserId:string
}) {
    const [canRate,setCanRate] = useState<boolean>(false)
    const [userRating,setUserRating] = useState<number | null>(null);
    const [hover,setHover] = useState<number>(0)
    const [changed,setChanged] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(false)
    useEffect(() => {
        if(!userId || show || barberUserId === userId) return
    
        const getCanRate = async() => {
            try {
                const res = await checkForRating(userId,barberId)
                setCanRate(res.can)
                setUserRating(res.rating as number)
            } catch (error:any) {
                toast({
                    variant:"destructive",
                    title:"Error",
                    description:error.message
                })
            }
        }
        getCanRate()
    },[userId,barberId])

    const handleRate = async() => {
        if(loading || !userId) return
        try {
            setLoading(true)
            const res = await changeRating({
                userId,
                barberId,
                rating:userRating as number
            })
            if(res.message) {
                toast({
                    variant:"success",
                    title:"Rating",
                    description:res.message
                })
            }
        } catch (error:any) {
            toast({
                variant:"destructive",
                title:"Error",
                description:error.message
            })
        }
    }
    useEffect(() => {
        if(!canRate || !userRating || !changed) return
        const id = setTimeout(() => {
                handleRate()
        }, 300);

        return () => clearTimeout(id)
    },[userRating,canRate,changed])
    return (
        <>
            <div className="border-white/20 border rounded-lg  mt-4 justify-center flex items-center">
                <div className=" max-[300px]:px-6 flex  gap-2 py-8 px-8 md:py-8 md:px-16 flex-1 justify-center items-center">    
                    <FaStar className="text-2xl text-white/30"/>
                    <p className="text-lg">{rating}</p>
                </div>
                <div className="w-px   border border-white/20 h-[96px] max-h-full"/>

                
                <div className="max-[300px]:px-6 px-8 md:py-8 md:px-16 flex flex-col items-center flex-1 justify-center ">
                    <p className="max-[300px]:text-sm">Comments</p>
                    <p className="text-sm text-white/30">{nmbreComment}</p>
                </div>
            </div>
            {canRate&&<div className='w-full text-center mt-5 text-4xl flex items-center justify-center gap-5'>
                <Rating
                    name="hover-feedback"
                    value={userRating}
                    precision={0.5}
                    
                    onChange={(event, newValue) => {
                        setUserRating(newValue);
                        setChanged(true)
                        
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    className='ml-6 !text-white !text-4xl'  
                    emptyIcon={<StarIcon className='!text-white/40 !text-4xl' style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                <p className='text-sm w-6'>{hover > 0  ? hover:userRating}</p>
            </div>}
        </>
    )
}