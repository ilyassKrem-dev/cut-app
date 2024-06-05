
import { Skeleton } from "@/components/ui/skeleton";



export default function Loading() {

    return (
        <div className="md:py-28 py-12 md:mx-auto md:w-[50%] pb-32">
            <div className=" flex justify-center flex-col items-center ">
                <Skeleton className=" h-[40px] repeat-1 bg-white/30  w-[150px] "/>

            </div>
            
            <div  className="mx-4 mt-24 flex flex-col items-center justify-center gap-10 h-full">
                <div className="flex justify-center items-center w-full h-full">
                    <Skeleton className=" h-[150px]  bg-white/30 rounded-full w-[150px] "/>
                
                </div>
                <div className="flex gap-4 flex-col  w-full px-10">
                    <div className="flex gap-2 flex-col">
                        <Skeleton className=" h-3  bg-white/30  w-[150px] "/>
                        <Skeleton className=" h-[40px]  bg-white/30  w-full "/>
                    </div>
                    <div className="flex gap-2 flex-col">
                        <Skeleton className=" h-3  bg-white/30  w-[150px] "/>
                        <Skeleton className=" h-[40px]  bg-white/30  w-full "/>
                    </div>
                    <div className="flex gap-2 flex-col">
                        <Skeleton className=" h-3  bg-white/30  w-[150px] "/>
                        <Skeleton className=" h-[40px]  bg-white/30  w-full "/>
                        
                    </div>

                    <div className="flex ">
                        <Skeleton className=" h-[40px]repeat-1 bg-white/30  flex-1 rounded-xl"/>
                        <Skeleton className=" h-[40px]  bg-white/30  flex-1 rounded-xl"/>
                    </div>
                </div>
                
                
            </div>
        </div>
    )
}

