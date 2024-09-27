import { format, addDays } from 'date-fns';


export const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const getDaysOfWork = (barberDays:string[]) => {
    const today = new Date();
    const startDayIndex = today.getDay(); 
    const daysNew:string[] = [];
    for (let i = 0; i < 7; i++) {
        const currentDay = addDays(today, i);
        const dayName = daysOfWeek[(startDayIndex + i) % 7];
        const date = format(currentDay, 'MMMM d');
        const fullDate = `${dayName} / ${date}`;
        daysNew.push(fullDate);
    }
    return daysNew.filter((day) => barberDays.includes(day.substring(0,2)))
}

export const getAvailableHours = (barberTime:string[],findDates:any[]) => { 
    const times:string[] = [];
    const minTime = Number(barberTime[0].split(":")[0])
    const maxTime = Number(barberTime[1].split(":")[0])
    for(let i = minTime;i <= maxTime;i++) {
        
        if(minTime!==i || minTime!==i && Number(barberTime[0].split(":")[1]) >= 30 ){
            
            if(maxTime != i ) {
                if(!findDates.find(dates => dates.time == i.toString()+":00")) {
                    times.push(i.toString()+":00")

                }

            }
        }
    }

    const minuteAdded = times.map(time => {
        if(Number(barberTime[1].split(":")[0]) == Number(time.split(":")[0]) || findDates && findDates.find(dates => dates.time == time.split(":")[0]+":30")) return
        return time.split(":")[0]+":30"})
        
    return [...times,...minuteAdded].sort().filter(times => times !==undefined)
}