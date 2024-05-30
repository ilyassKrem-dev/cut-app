
import Image from "next/image"

interface Props {
    barber:{
        salonName:string;
        images:string[];
        time:string[];
        phoneNumber:string;
        id:string;
        holidays:boolean;
        openDays:string[]
    }
}

export default function TopChat({barber}:Props) {
    function isCurrentTimeBetween(startTime:any, endTime:any) {
        const currentTime = new Date();
        
        const start = new Date();
        const [startHours, startMinutes, startPeriod] = startTime.match(/(\d+):(\d+)\s*(AM|PM)/i).slice(1);
        start.setHours((startPeriod === 'PM' && +startHours !== 12 ? +startHours + 12 : +startHours) % 24);
        start.setMinutes(+startMinutes);
        start.setSeconds(0);
        
        const end = new Date();
        const [endHours, endMinutes, endPeriod] = endTime.match(/(\d+):(\d+)\s*(AM|PM)/i).slice(1);
        end.setHours((endPeriod === 'PM' && +endHours !== 12 ? +endHours + 12 : +endHours) % 24);
        end.setMinutes(+endMinutes);
        end.setSeconds(0);
    
        return currentTime >= start && currentTime <= end;
    }

    return (
        <div className="flex gap-2 items-center border-b border-b-white/10 p-2 py-[0.85rem] w-full">
            <div>
                <Image
                src={barber.images[0]} 
                alt="Solon Image"
                width={100}
                height={100}
                className="w-[40px] h-[40px] rounded-full object-cover"
                />
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-sm">{barber.salonName}</p>
                <div>
                    {isCurrentTimeBetween(barber.time[0],barber.time[1]) 
                    ?  
                    <div className="flex items-center gap-1 cursor-pointer w-fit">
                        <div className="rounded-full p-1 bg-green-1"/>
                        <p className="text-xs text-green-1 cursor-pointer">Open</p>
                    </div>
                    :
                    <div className="flex items-center gap-1 cursor-pointer w-fit">
                        <div className="rounded-full p-1 bg-accent"/>
                        <p className="text-xs text-accent cursor-pointer">Close</p>
                    </div>}
                </div>
            </div>
        </div>
    )
}