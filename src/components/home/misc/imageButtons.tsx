import { LuShare } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";




export default function ImageButtons({userId}:{
    userId:string|null
}) {

    return (
        <>
            {userId?<div className="absolute top-3 right-3 bg-transparent rounded-full p-1 hover:opacity-60 transition-all duration-300 cursor-pointer">
                <CiHeart className="text-xl text-black"/>
            </div>
            :
            <div className="absolute top-3 right-3 bg-transparent rounded-full p-1 hover:opacity-60 transition-all duration-300 cursor-pointer">
            <LuShare className="text-xl text-black"/>
        </div>}
        </>
    )
}