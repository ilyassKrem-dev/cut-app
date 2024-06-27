
import Image from "next/image"


interface Props {
    barber:{
        salonName:string;
        images:string[];
        time:string[];
        phoneNumber:string;
        id:string;
        holidays:boolean;
        openDays:string[];
        userId:string;
    }|null;
    user:{
        id:string;
        image:string;
        name:string
    }|null
}

export default function TopChat({barber,user}:Props) {
    
    return (
        <>
            {barber?
            <div className="flex gap-2 items-center border-b border-b-white/10 p-2 py-[0.85rem] w-full">
                <div>
                    <Image
                    src={barber?.images[0] || "profile.jpg"} 
                    alt="Solon Image"
                    width={100}
                    height={100}
                    className="w-[40px] h-[40px] rounded-full object-cover"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm">{barber?.salonName}</p>
                    <div>
                        {isCurrentTimeBetween(barber?.time[0],barber?.time[1]) 
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
            :
            <div className="flex gap-2 items-center border-b border-b-white/10 p-2 py-[0.85rem] w-full">
                <div>
                    <Image
                    src={user?.image || "profile.jpg"} 
                    alt="Solon Image"
                    width={100}
                    height={100}
                    className="w-[40px] h-[40px] rounded-full object-cover"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm">{user?.name}</p>
                   
                </div>
            </div>}
        </>
    )
}
function isCurrentTimeBetween(startTime:any, endTime:any) {
    const currentTime = new Date();
    
    const start = new Date();
    const [startHours, startMinutes] = startTime.match(/(\d+):(\d+)/i).slice(1);
    start.setHours(+startHours);
    start.setMinutes(+startMinutes);
    start.setSeconds(0);
    
    const end = new Date();
    const [endHours, endMinutes] = endTime.match(/(\d+):(\d+)/i).slice(1);
    end.setHours(+endHours);
    end.setMinutes(+endMinutes);
    end.setSeconds(0);
    if (start > end) {
        return currentTime >= start || currentTime <= end;
    } else {
        return currentTime >= start && currentTime <= end;
    }

}
