
import { SetStateAction } from 'react'
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { IoIosArrowBack } from "react-icons/io";
import { RiEqualLine } from "react-icons/ri";

export default function StarsFilter({
    rating, 
    hover,
    version,
    setRating,
    setHover,
    setVersion}:{
        rating:number | null;
        hover:number;
        version:string;
        setRating:React.Dispatch<SetStateAction<number | null>>
        setHover:React.Dispatch<SetStateAction<number>>
        setVersion:React.Dispatch<SetStateAction<string>>
    }) {
    const handleClick = (value:string) => {
        if(version == value) {
            return setVersion("")
        }
        setVersion(value)
    }
    
    return (
        <div className="p-4 flex flex-col gap-5 bg-black/50 mx-3 rounded-xl border border-white/10">
            <div className="flex flex-col px-2">
                <h1 className="font-bold text-lg">Stars</h1>
                <p className="text-sm text-gray-500">Filter by stars</p>
            </div>
            <div className='flex flex-col gap-5'>
                <div className='w-full text-center text-2xl flex items-center justify-center gap-5'>
                    <Rating
                        name="hover-feedback"
                        value={rating}
                        precision={0.5}
                        
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                        className='ml-6 text-accent'
                        emptyIcon={<StarIcon className='text-white/50' style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    <p className='text-sm w-6'>{hover > -1 ? hover:rating}</p>
                </div>
                <div className='flex items-center justify-center text-3xl gap-10'>
                    <div className='flex flex-col gap-1 items-center cursor-pointer group' onClick={() => handleClick("below")}>
                        <IoIosArrowBack className={`group-hover:bg-white/20 rounded-full p-1 transition-all duration-300 active:opacity-60 ${version == "below"&&"bg-white/20 rounded-full p-1"}`}/>
                        <p className='text-sm cursor-pointer'>Below</p>
                    </div>
                    <div className='flex flex-col gap-1 items-center group cursor-pointer' onClick={() => handleClick("same")}>
                        <RiEqualLine className={` group-hover:bg-white/20 rounded-full p-1 transition-all duration-300 active:opacity-60 ${version == "same"&&"bg-white/20 rounded-full p-1"}`}/>
                        <p className='text-sm cursor-pointer'>Same</p>
                    </div>
                    <div className='flex flex-col gap-1 items-center cursor-pointer group' onClick={() => handleClick("above")}>
                        <IoIosArrowBack  className={`rotate-180 group-hover:bg-white/20 rounded-full p-1 transition-all duration-300 active:opacity-60 ${version == "above"&&"bg-white/20 rounded-full p-1"}`}/>
                        <p className='text-sm cursor-pointer'>Above</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

