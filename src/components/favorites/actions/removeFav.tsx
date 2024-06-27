import { SetStateAction } from "react";
import { IoMdHeartDislike } from "react-icons/io";
import { useToast } from "@/components/ui/use-toast";
import { addFavorite } from "@/lib/actions/user.action";


export default function RemoveFav({
    userId,
    favId,
    setFavorites
    }:{
        userId:string,
        favId:string
        setFavorites:React.Dispatch<SetStateAction<any[] |null>>}) {
    
    const {toast} = useToast()
    const handleUnFavorite = async() => {
        try {
            setFavorites((prev:any) => {
                const data = prev.filter((fav:any) => fav.barber.id !== favId)
                return data
            })
            await addFavorite(userId,favId)
        } catch (error) {
            toast({
                variant:"destructive",
                title:"Error",
                description:"Error in server"
            })
        }
    }
    return (
        <div className="rounded-full border border-white/20 p-2 cursor-pointer hover:opacity-60 transition-all duration-300 active:opacity-30" onClick={handleUnFavorite}>
            <IoMdHeartDislike />

        </div>
    )
}