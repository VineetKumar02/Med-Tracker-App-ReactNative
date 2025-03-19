export const FormatDateFromTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    date.setHours(0, 0, 0, 0); // Set time to midnight
    return date; // Return the Date object
}

export const FormatDateForText = (date: Date) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
        return null; // Return null if the date is invalid
    }

    return date.toLocaleString('default', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

export const FormatTimeForText = (date: Date) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
        return null; // Return null if the date is invalid
    }

    return date.toLocaleString('default', {
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const getDateRangeToDisplay = () => {
    const dateList = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        dateList.push({
            date: currentDate.toLocaleDateString('en-GB'),
            day: currentDate.getDate().toString().padStart(2, '0'),
            dayName: currentDate.toLocaleString('default', { weekday: 'short' }),
            year: currentDate.getFullYear().toString(),
        });
    }
    return dateList;
}