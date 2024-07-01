

import Image from "next/image"
import StarIcon from '@mui/icons-material/Star';
import { CommentsType } from "../salonType";
export default function AllComment({comments}:{
    comments:CommentsType[]
}) {
    
    return (
        <div className="flex flex-col gap-4 w-full px-2 overflow-y-auto custom-scrollbar h-full md:grid md:grid-cols-2">
            {comments.map((comment,index) =>{
                const {user} = comment
                return (
                    <div key={comment.id+index} className="border border-white/10 rounded-xl w-full">
                        <div className="flex items-start gap-1 border-b border-white/10 p-2">
                            <Image 
                            src={user.image} 
                            alt={`${user.name} profile picture`}
                            width={50}
                            height={50}
                            className="rounded-full object-cover w-[50px] h-[50px]" />
                            <div className="flex flex-col">
                                <p className="text-sm text-white/80">{user.name}</p>
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
    )
}