import moment from 'moment-timezone';

// Set a default timezone to Dubai
export const DUBAI_TIMEZONE = 'Asia/Dubai';

// Helper function to create a DateTime in the Dubai timezone
// export function getDubaiDateTime() {
//     return DateTime.now().setZone(DUBAI_TIMEZONE);
// }

export const listaHoursCollect=(date,range)=>{
    try {
    let dateselect = new Date(date.split('T')[0]);
        if(dateselect > new Date()){
            const time = new Date(dateselect.getTime() - 4 * 60 * 60 * 1000)
            // console.log('____', time)
            return time
        }
        const dateCollectPlusRange = new Date();
        dateCollectPlusRange.setHours(dateCollectPlusRange.getHours() + range);
        // console.log("dateCollectPlusRange",dateCollectPlusRange)
        return dateCollectPlusRange;
    } catch (error) {
    }
    return moment(new Date()).tz(DUBAI_TIMEZONE).toDate()
}

export const minHourDelivery = (date,range=3)=>{
    // let date0 = new Date(date.split('T')[0]);
    
    // if(date0 > new Date().setHours(0,0,0,0)){


    // }

    return new Date( date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours()+range,
    date.getMinutes()
    )
}
export const createDateTimeZoneDubai=(date,time)=>{
    
    // const times= time?.split(' ')
    // let [hour,minute]=parseInt(times[0].split(':')) 
    // hour= times[1]==='PM'?hour+12: hour
    let date1 = moment(`${date} ${time}`)//tz(DUBAI_TIMEZONE).set({hour:hour===24?0:hour,minute:minute}).toDate()
    

    return date1;
}

 