export function toISOStringWithOffset(date: Date): string {
    const pad = (n: number) => String(Math.floor(Math.abs(n))).padStart(2, '0');
    const tz = -date.getTimezoneOffset();
    const sign = tz >= 0 ? '+' : '-';
    const abs = Math.abs(tz);
    const hh = pad(abs / 60);
    const mm = pad(abs % 60);

    return (
        date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        sign + hh + ':' + mm
    );
}

export function formatDuration(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const pad = (n: number) => String(n).padStart(2, '0');

    if (hours > 0) {
        return `${hours}h ${pad(minutes)}m`;
    }
    return `${minutes}m`;
}

