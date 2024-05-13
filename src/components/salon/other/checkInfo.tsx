
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

export const checkPrefernces = (preferences:Preferences) => {
    const checkValue = preferences.value[1] >= preferences.value[0]+20 
    const checkTime = preferences.time.open.length !==0 && preferences.time.close.length !== 0
    const checkDates = preferences.dates.week.length >1
    return checkValue && checkTime && checkDates
}

interface Info {
    name:string;
    number:string,
    images:File[]
}

export const checkInfo = (info:Info) => {
    const checkName = info.name.length >= 4 && info.name.length <=15
    const checkphone = info.number.length === 9
    const checkImages = info.images.length == 3
    return checkImages && checkName && checkphone
}