
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';

import dayjs, { Dayjs } from 'dayjs';
import { SetStateAction } from 'react';
type Prefernces = {
    prices:number[],
    dates:string[],
    time:string[],
    holiday:boolean
}

export default function TimeEdit({time,setNewPreferences}:{
    time:string[];
    setNewPreferences:React.Dispatch<SetStateAction<Prefernces>>
}) {

    const handleChangeOpen = (value: Dayjs | null) => {
        if(value ==null) return
        const formattedTime = value?.format('h:mm A');
        setNewPreferences((prev:any) => {
            return {...prev,time:{...prev.time,open:formattedTime?.toString()}}
        })
        
    };
    const handleChangeClose = (value: Dayjs | null) => {
        if(value ==null) return
        const formattedTime = value?.format('h:mm A');
        setNewPreferences((prev:any) => {
            return {...prev,time:{...prev.time,close:formattedTime?.toString()}}
        })
        
    };
    const openTime = time[0] ? dayjs(time[0], 'h:mm A') : null;
    const closeTime = time[1] ? dayjs(time[1], 'h:mm A') : null;
    
    return (
        <div className=" ">
            <div className="flex items-start gap-5 w-full  flex-col">
                <div className="flex gap-1 flex-col">
                    <p className="">Time</p>
                    <p className="text-xs text-white/40">Change time of work</p>
                </div>
                <div className="flex  gap-2  ">
                    <div className="max-w-[150px]">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div className="hidden md:flex">
                                <DesktopTimePicker
                                    label="Open time"
                                    name='open'
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }}
                                    value={openTime}
                                    sx={
                                        {"& .MuiSvgIcon-root":{
                                            color:"rgba(255,255,255,0.5)"
                                        },
                                        "& .MuiInputBase-input":{
                                            color:"rgba(255,255,255,0.5)"
                                        },
                                        '& .css-yjsfm1':{
                                            color:"rgba(255,255,255,0.5)"
                                        },
                                        "& .MuiOutlinedInput-notchedOutline":{
                                            borderColor:"rgba(255,255,255,0.5)"
                                        },
                                        "& .MuiFormLabel-root":{
                                            color:"rgba(255,255,255,0.5)"
                                        },
                                        "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{
                                            borderColor:"rgba(255,255,255,0.5)"
                                        }}}
                                    onChange={handleChangeOpen}
                                />

                            </div>
                            <div className="flex md:hidden">
                                <MobileTimePicker
                                    label="Open time"
                                    name='open'
                                    onChange={handleChangeOpen}
                                    value={openTime}
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }}
                                    
                                    sx={
                                        {"& .MuiSvgIcon-root":{
                                            color:"rgba(255,255,255,0.5)"
                                        },
                                        "& .MuiInputBase-input":{
                                            color:"rgba(255,255,255,0.5)"
                                        },
                                        '& .css-yjsfm1':{
                                            color:"rgba(255,255,255,0.5)"
                                        },
                                        "& .MuiOutlinedInput-notchedOutline":{
                                            borderColor:"rgba(255,255,255,0.5)"
                                        },
                                        "& .MuiFormLabel-root":{
                                            color:"rgba(255,255,255,0.5)"
                                        },
                                        "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{
                                            borderColor:"rgba(255,255,255,0.5)"
                                        }}
                                    }
                                />

                            </div>
                        </LocalizationProvider>

                    </div>
                    <div className="max-w-[150px]">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div className="hidden md:flex">
                                <DesktopTimePicker
                                value={closeTime}
                                onChange={handleChangeClose}
                                    label="Close time"
                                    name='close'
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }}
                                    
                                    sx={
                                        {"& .MuiSvgIcon-root":{
                                            color:"rgba(255,255,255,0.5)"
                                        },
                                        "& .MuiInputBase-input":{
                                            color:"rgba(255,255,255,0.5)"
                                        },
                                        '& .css-yjsfm1':{
                                            color:"rgba(255,255,255,0.5)"
                                        },
                                        "& .MuiOutlinedInput-notchedOutline":{
                                            borderColor:"rgba(255,255,255,0.5)"
                                        },
                                        "& .MuiFormLabel-root":{
                                            color:"rgba(255,255,255,0.5)"
                                        },
                                        "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{
                                            borderColor:"rgba(255,255,255,0.5)"
                                        }}
                                    }
                                />

                            </div>
                            <div className="flex md:hidden">
                                <MobileTimePicker
                                    label="Close time"
                                    value={closeTime}
                                    name='close'
                                    onChange={handleChangeClose}
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }}
                                    sx={
                                        {"& .MuiSvgIcon-root":{
                                            color:"rgba(255,255,255,0.5)"
                                        },
                                        "& .MuiInputBase-input":{
                                            color:"rgba(255,255,255,0.5)"
                                        },
                                        '& .css-yjsfm1':{
                                            color:"rgba(255,255,255,0.5)"
                                        },
                                        "& .MuiOutlinedInput-notchedOutline":{
                                            borderColor:"rgba(255,255,255,0.5)"
                                        },
                                        "& .MuiFormLabel-root":{
                                            color:"rgba(255,255,255,0.5)"
                                        },
                                        "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{
                                            borderColor:"rgba(255,255,255,0.5)"
                                        }}
                                    }
                                />

                            </div>
                        </LocalizationProvider>

                    </div>
                </div>
            </div>

        </div>
    )
}