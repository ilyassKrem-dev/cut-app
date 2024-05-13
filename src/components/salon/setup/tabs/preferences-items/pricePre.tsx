import { Slider } from "@mui/material"
import Box from '@mui/material/Box';
import { SetStateAction } from "react";

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
    value:number[];
    setPrefences:React.Dispatch<SetStateAction<Preferences>>
}
function valuetext(value: number) {
    return `${value}°C`;
}
export default function PricePre ({value,setPrefences}:Props) {

    const handleChange = (event: Event, newValue: number | number[]) => {
        setPrefences((prev:any) => {
            return {...prev,value:newValue}
        })
    };
    return (
        <div className="md:flex items-center justify-between space-y-3 md:space-y-0 border border-white/20 md:border-0 p-6 md:p-0 rounded-lg md:rounded-none">
            <div className="flex items-center gap-10 w-full md:gap-5">
                <div className="flex gap-1 self-end mb-2">
                    <p className="">Prices</p>
                    <span className='text-xs text-accent'>*</span>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center text-xs justify-between">
                        <div className=" rounded-xl text-white flex gap-1">
                            Min:
                            <span>{value[0]}Dh</span>
                        </div>
                        <div className=" rounded-xl text-white flex gap-1">
                            Max:
                            <span>{value[1]}Dh</span>
                        </div>
                    </div>
                    <div>
                        <Box sx={{ width: 300 }}>
                                <Slider
                                getAriaLabel={() => 'Price'}
                                value={value}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                max={500}
                                min={10}
                                sx={{
                                    color:"gray"
                                }}
                            />
                        </Box>

                    </div>

                </div>
            </div>
            <div className="text-sm text-white/80 max-w-[400px] leading-6">
                <p>Set up the min and max price of your haircuts or any related stuff</p>
            </div>
        </div>
    )
}