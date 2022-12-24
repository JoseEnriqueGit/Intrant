// 'https://api.adamix.net/apec/cedula/00100782788'
// 00112851662
// 402-4215106-2
// 01100276250
export const disableBeforeDays = () => {
	const today = new Date();
	const format = new Date(today.getTime()).toISOString();
    
	return format.slice(0, 10);
};

export function bornDateUser(ok, data) {
    if (ok === true) {
        return data.FechaNacimiento.slice(0, 10);
    } else {
        return null;
    }
}

export const Holidays = [
    'Jan 1',
    'Jan 6',
    'Jan 21',
    'Jan 26',
    'Feb 27',
    'Apr 1',
    'Apr 2',
    'Apr 3',
    'Apr 4',
    'Apr 5',
    'Apr 6',
    'Apr 7',
    'Apr 8',
    'May 1',
    'Aug 16',
    'Sep 24',
    'Nov 6',
    'Dec 24',
    'Dec 25',
    'Dec 31'
];

export function isWorkingDay(date) {
    let isWeekend = false;
    let isHolyday = false;
    
    const selectedDay = new Date(date);
    const newDate = new Date(selectedDay.getFullYear(), (selectedDay.getMonth()), (selectedDay.getDate() + 1));

    const weekendDay = newDate.toLocaleDateString('en-us', {weekday: 'short'});
    const holiday = newDate.toLocaleDateString('en-us', {month: 'short', day: 'numeric'});

    if(weekendDay === 'Sat' || weekendDay === 'Sun'){
        isWeekend = true;
    }else if(Holidays.find(day => day === holiday)){
        isHolyday = true;
    }
    return {isWeekend, isHolyday}
}
