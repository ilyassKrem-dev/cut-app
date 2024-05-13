
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';

import dayjs, { Dayjs } from 'dayjs';

import {  SetStateAction } from 'react';
interface Preferences {
    value:number[];
    time:{
        open:string;
        close:string;
    },
    dates:{
        week:string[];
        holidays:boolean
    }
}
interface Props {
    time:{
        open:string;
        close:string;
    }
    setPrefences:React.Dispatch<SetStateAction<Preferences>>
}
export default function TimePre({time,setPrefences}:Props) {

    const handleChangeOpen = (value: Dayjs | null) => {
        if(value ==null) return
        const formattedTime = value?.format('h:mm A');
        setPrefences((prev:any) => {
            return {...prev,time:{...prev.time,open:formattedTime?.toString()}}
        })
        
    };
    const handleChangeClose = (value: Dayjs | null) => {
        if(value ==null) return
        const formattedTime = value?.format('h:mm A');
        setPrefences((prev:any) => {
            return {...prev,time:{...prev.time,close:formattedTime?.toString()}}
        })
        
    };
    const openTime = time.open ? dayjs(time.open, 'h:mm A') : null;
    const closeTime = time.close ? dayjs(time.close, 'h:mm A') : null;
    
    return (
        <div className="md:flex items-center justify-between space-y-3 md:space-y-0 border border-white/20 md:border-0 p-6 md:p-0 rounded-lg md:rounded-none">
            <div className="flex items-center gap-10 w-full md:gap-5">
                <div className="flex gap-1">
                    <p className="">Time</p>
                    <span className='text-xs text-accent'>*</span>
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
            <div className="text-sm md:w-[455px] text-white/80 max-w-[400px] leading-6">
                <p>Set up time your salon opens and closes</p>
            </div>
        </div>
    )
}