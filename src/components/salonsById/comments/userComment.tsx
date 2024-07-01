import { SetStateAction, useState } from "react"


import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { Button } from "@/components/ui/button";
import LoadingAnimation from "@/assets/other/spinner";
import { toast } from "@/components/ui/use-toast";
import { addUserComment } from "@/lib/actions/misc.action";
import {UserCommentType,SalonCommentsType} from "../salonType"
import EmotesToogle from "@/components/messages/chat-assets/inputs/emotes";
export default function UserComment(
    {
        userId,
        salonId,
        userComment,
        setSalon

    }:{
        userId:string
        salonId:string,
        userComment:UserCommentType | undefined,
        setSalon:React.Dispatch<SetStateAction<SalonCommentsType|null>>
    }
) {
    const [userRating,setUserRating] = useState<number |null |undefined>(userComment?.rating)
    const [hover,setHover] = useState<number>(0)
    const [comment,setComment] = useState<string>(userComment?.comment ||"")
    const [loading,setLoading] = useState<boolean>(false)
    const handleComment = async() => {
        if(loading || comment == userComment?.comment) return
        if(comment.length < 5) {
            return  toast(
                {
                    variant:"destructive",
                    title:"Error",
                    description:"Comment should be more than 5 character"
                }
            )
        }
        setLoading(true)
        try {
                const res = await addUserComment(
                    {
                        userId:userId,
                        barberId:salonId,
                        userComment:comment,
                        rating:userRating as number
                    }
                )
                if(res.success) {
                    setSalon((prev:any) => {
                        const findComment = prev?.comments.find((comment:any) => comment.user.id === userId)
                        if(!findComment) return prev
                        const newData = prev?.comments.map((comment:any) => {
                            if(comment.user.id === userId) {
                                return {...comment,stars:userRating,comment:comment}
                            } else {
                                return comment
                            }
                        })
                        return newData
                        
                    })
                    setLoading(false)
                    toast(
                        {
                            variant:"success",
                            title:"Added",
                            description:"Your comment has benn added"
                        }
                    )
                }
        } catch (error) {
            setLoading(false)
            toast(
                {
                    variant:"destructive",
                    title:"Error",
                    description:"Failed to add comment,try again later"
                }
            )
        }
    }
    return (
        <div className="border border-white/10 p-2 flex flex-col gap-5 w-full items-center py-4 max-w-[700px] rounded-lg">
            <div className="flex items-center gap-2">
                <Rating
                    name="hover-feedback"
                    value={userRating}
                    precision={0.5}
                    
                    onChange={(event, newValue) => {
                        setUserRating(newValue)
                        
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    className='ml-6 !text-white !text-3xl'  
                    emptyIcon={<StarIcon className='!text-white/40 !text-3xl' style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                <p className='text-sm w-6'>{hover > 0  ? hover:userRating}</p>

            </div>
            <div className="flex flex-col gap-1 w-full items-end">
                <div className="w-full relative group border border-white/10 rounded-lg">
                    <textarea name="comment" id="comment" value={comment} onChange={(e) => setComment(e.target.value)} className="w-full bg-black rounded-lg text-white resize-none p-2 focus-visible:outline-none custom-scrollbar  border-0" rows={3} placeholder="Comment" maxLength={255}></textarea>
                    <div className="p-1 px-2 border-t border-t-white/10 ">
                        <div className="w-fit mt-1">
                            <EmotesToogle setUserInput={setComment}/>

                        </div>
                    </div>
                </div>
                <p className="text-xs text-white/50">{comment.length}/255</p>
            </div>
            <Button 
            className="hover:bg-opacity-65 hover:opacity-65 transition-all duration-300 active:bg-white/40 w-[150px]"
            disabled={loading || comment.length < 5 || comment == userComment?.comment}
            onClick={handleComment}>
                    {loading ? <LoadingAnimation />:"Comment"}
            </Button>
        </div>
    )
}