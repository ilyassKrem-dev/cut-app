import { useLoginContext } from "@/assets/wrappers/loginWrapper"
import { addFavorite } from "@/lib/actions/user.action"
import { useState } from "react"
import { FaRegHeart,FaHeart } from "react-icons/fa"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"



export default function FavoritesIcon({userId,barberId,favState}:{
    userId:string|null|undefined;
    barberId:string|undefined;
    favState:boolean
}) {
    const [favoriteState,setFavoriteState] = useState<boolean>(favState)
    const [loading,setLoading] = useState<boolean>(false)
    const {setShowLogin} = useLoginContext()
    const pathname = usePathname()
    const handleCheck = () => {
        if(!userId) {
            setShowLogin(true)
            return false
        }
        return true
    }
    
    const handleClick = async() => {
        if(!handleCheck()) return
        if(loading) return
        setLoading(true)
        const res = await addFavorite(userId,barberId as string)
        setFavoriteState(prev => !prev)
        if(res) setLoading(false)
    }
    return (
        <div className=" rounded-full p-1 hover:opacity-60 transition-all duration-300 cursor-pointer flex items-center gap-2" onClick={handleClick}>
            {favoriteState?
            <motion.div
            animate={{scale:loading?"1.2":"1"}}
            transition={{duration:0.1,ease:"easeInOut"}}
            >
                <FaHeart className={`${pathname!=="/"?"text-2xl":"text-lg text-black"}`}/>

            </motion.div>
            :
            <motion.div
            animate={{scale:loading?"1.2":"1"}}
            transition={{duration:0.1,ease:"easeInOut"}}
            >
                <FaRegHeart className={`${pathname!=="/"?"text-2xl":"text-lg text-black"}`}/>

            </motion.div>
            }
            
            {pathname!=="/"&&<p className="text-xs underline hidden md:block cursor-pointer">Favorite</p>}
        </div>
    )
}