
const timeUnits = {
    year: 365 * 4 * 7 * 24 * 60 * 60 * 1000,
    month: (365 / 12) * 7 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
};

const relativeTime = new Intl.RelativeTimeFormat("en", {style: "short", numeric: "always"});

// compute the relative time from to the current date
export const getRelativeTime = (dateFrom) => {
    if (dateFrom){
        const since = new Date(dateFrom) - new Date();
        for(let unit in timeUnits){
            if(Math.abs(since) > timeUnits[unit] || unit === "second"){
                const time = relativeTime.format(Math.round(since / timeUnits[unit]), unit);
                return time;
            }
        }
    }
};