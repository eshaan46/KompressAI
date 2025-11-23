export const formatDateInTimezone = (
  date: Date | string,
  timezone: string,
  language: string = 'en'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  try {
    return new Intl.DateTimeFormat(language, {
      timeZone: timezone,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(dateObj);
  } catch (error) {
    // Fallback to UTC if timezone is invalid
    return new Intl.DateTimeFormat(language, {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(dateObj);
  }
};

export const formatTimeInTimezone = (
  date: Date | string,
  timezone: string,
  language: string = 'en'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  try {
    return new Intl.DateTimeFormat(language, {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(dateObj);
  } catch (error) {
    // Fallback to UTC if timezone is invalid
    return new Intl.DateTimeFormat(language, {
      timeZone: 'UTC',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(dateObj);
  }
};

export const getTimezoneOffset = (timezone: string): string => {
  try {
    const now = new Date();
    const utc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
    const targetTime = new Date(utc.toLocaleString('en-US', { timeZone: timezone }));
    const offset = (targetTime.getTime() - utc.getTime()) / (1000 * 60 * 60);
    
    const sign = offset >= 0 ? '+' : '-';
    const hours = Math.floor(Math.abs(offset));
    const minutes = Math.round((Math.abs(offset) - hours) * 60);
    
    return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  } catch (error) {
    return 'UTC+00:00';
  }
};

export const getAvailableTimezones = (): { value: string; label: string; offset: string }[] => {
  const timezones = [
    'UTC',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Toronto',
    'America/Vancouver',
    'America/Mexico_City',
    'America/Sao_Paulo',
    'America/Buenos_Aires',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Europe/Rome',
    'Europe/Madrid',
    'Europe/Amsterdam',
    'Europe/Stockholm',
    'Europe/Moscow',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Asia/Hong_Kong',
    'Asia/Singapore',
    'Asia/Seoul',
    'Asia/Mumbai',
    'Asia/Dubai',
    'Asia/Bangkok',
    'Australia/Sydney',
    'Australia/Melbourne',
    'Pacific/Auckland',
  ];

  return timezones.map(tz => ({
    value: tz,
    label: tz.replace(/_/g, ' ').replace('/', ' / '),
    offset: getTimezoneOffset(tz),
  }));
};