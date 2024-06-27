
import { FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";
import RemoveFav from "./actions/removeFav";
import Link from "next/link";
import { SetStateAction } from "react";
interface Props {
    favorites:Favorites[];
    userId:string;
    setFavorites:React.Dispatch<SetStateAction<Favorites[] | null>>
}
type Favorites = {
    id:string;
    barber:Barber
}
type Barber = {
    id:string;
    images:string;
    Prices:string[];
    salonName:string;
    time:string[]

}

export default function Favorites({favorites,userId,setFavorites}:Props) {
   
    return (
        <>
            {favorites.length > 0?
            <div className="md:py-24 flex justify-center items-center gap-10 flex-col  pb-32 custom-scrollbar">
                <h1 className="mt-10 text-xl text-center">Favorites</h1>
                <div className="flex flex-col gap-5 w-full px-2"> 
                    {favorites.map((fav,index) => {
                        const {id,barber}:{id:string,barber:Barber} = fav
                        return (
                            <div key={id+""+index} className="flex justify-between items-center h-[150px] w-full border-2 border-white/20 rounded-lg">
                                <div className="flex-1 h-full w-full flex items-start relative">
                                    <div className="relative h-full w-full seperator overflow-hidden max-w-[500px] rounded-l-lg opacity-40"
                                    >
                                        <Image 
                                        src={barber.images} 
                                        alt=""
                                        width={1000}
                                        height={1000}
                                        className="h-full w-full object-cover"/>
                                        
                                    </div>
                                    <div className="absolute flex flex-col gap-4 opacity-100 top-0 bottom-0  justify-center items-center text-sm sm:text-base max-[360px]:pl-1">
                                        <div className="flex gap-2 items-center ml-4 max-[360px]:flex-col max-[360px]:ml-2">
                                            <p className="font-semibold">{barber.salonName}</p>
                                            <p className="text-white/80">{barber.time[0]} - {barber.time[1]}</p>
                                        </div>
                                        <p className="text-white max-[360px]:text-xs max-[360px]:ml-2">{barber.Prices[0]} DH - {barber.Prices[1]} DH</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 text-lg sm:text-xl sm:mr-10 mr-2">
                                    <Link target="_blank" href={`/salons/${barber.id}`} className="rounded-full border border-white/20 p-2 cursor-pointer hover:opacity-60 transition-all duration-300 active:opacity-30">
                                        <FaExternalLinkAlt />
                                    </Link>
                                    <RemoveFav 
                                    userId={userId} 
                                    favId={barber.id}
                                    setFavorites={setFavorites}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            :
            <div className="md:py-24 flex justify-center items-center gap-10 flex-col  pb-32 custom-scrollbar h-full">
                <h1 className="mt-10 text-xl text-center">Favorites</h1>
                <h3 className="my-auto flex-1 flex justify-center items-center font-semibold text-lg">You have no favorite barber</h3>
            </div>}
        </>
    )
}