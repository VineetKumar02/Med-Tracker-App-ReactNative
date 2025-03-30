import { Timestamp } from 'firebase/firestore';

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

export const getDateRangeArray = (startDate: Date, endDate: Date) => {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dateArray.push(currentDate.toLocaleDateString('en-GB'));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
};

export const FormatTimestampToTimeString = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};

export const FormatTimestampToDateString = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-GB');
};