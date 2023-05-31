export function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function getLocalISOString(date) {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
}
