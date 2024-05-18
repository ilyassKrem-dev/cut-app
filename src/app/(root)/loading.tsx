import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {

    return (
      <div className="md:py-48 p-4 py-32">
        <div 
        className="flex   gap-3 flex-col 
        w-full sm:max-w-[280px] cursor-pointer " >
            <div className="w-full h-full relative">
                <Skeleton className="h-[310px] sm:h-[200px] repeat-1 bg-white/50"/>
            </div>
            <div 
            className="flex justify-between items-start w-full">
                <div className="flex flex-col gap-1 text-sm w-full">
                    <Skeleton className="w-full h-3 repeat-1 bg-white/50"/>
                    <Skeleton className="w-[200px] h-3 repeat-1 bg-white/50"/>
                    <Skeleton className="w-[100px] h-3 repeat-1 bg-white/50"/>
                    <Skeleton className="w-[100px] h-3 repeat-1 bg-white/50"/>
                </div>
                <div className="flex gap-1 items-center cursor-pointer">
                    <div className="text-lg"/>
                    <p className="text-sm cursor-pointer"></p>
                </div>
            </div>

        </div> 

      </div>
    )
}