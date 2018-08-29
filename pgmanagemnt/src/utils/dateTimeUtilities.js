import moment from 'moment';

const monthNamesLong = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const monthNamesShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function monthNameShortFromDate(date) {
  return monthNamesShort[date.getMonth()];
}

export function monthNameLongFromDate(date) {
  return monthNamesLong[date.getMonth()];
}

export function getWeekDays() {
  return weekDays;
}

export function weekDaysShort() {
  return weekDays.map(day => day.substr(0, 3));
}

export function msToTime(duration) {
  let seconds = parseInt((duration / 1000) % 60);
  let minutes = parseInt((duration / (1000 * 60)) % 60);
  let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${hours}:${minutes}:${seconds}`;
}

export function inCurrentTimezone(date) {
  if (typeof date === 'object') {
    date = new Date(date).getTime();
  }
  const offset = -1 * new Date().getTimezoneOffset() * 60 * 1000;
  return date + offset;
}

export function dateFormatToMs(date, format) {
  switch (format) {
    case 'YYYY-MM-DD':
      return new Date(date).getTime();
  }
}

export function getDateSuffix(dayOfMonth) {
  if (dayOfMonth >= 11 && dayOfMonth <= 13) {
    return 'th';
  }
  switch (dayOfMonth % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export function getDateInFormat(date, format) {
  let month,
    dateString,
    time;
  switch (format) {
    case 'YYYY-MM-DD':
      month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
      dateString = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      return `${date.getFullYear()}-${month}-${dateString}`;

    case 'DD/MM/YYYY':
      month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
      dateString = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      return `${dateString}/${month}/${date.getFullYear()}`;

    case 'DD MMM YYYY':
      return `${date.getDate()} ${monthNameShortFromDate(date)} ${date.getFullYear()}`;

    case 'MMM YYYY':
      return `${monthNameShortFromDate(date)} ${date.getFullYear()}`;

    case 'DD MMM':
      return `${date.getDate()} ${monthNameShortFromDate(date)}`;

    case 'MMMM DD':
      return `${monthNameLongFromDate(date)} ${date.getDate()}`;

    case 'HH MM':
      if (date.getHours() === 0) {
        return `12:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()} AM`;
      }
      if (date.getHours() < 12) {
        return `${(date.getHours() < 10 ? '0' : '') + date.getHours()}:${
          date.getMinutes() < 10 ? '0' : ''
        }${date.getMinutes()} AM`;
      } else if (date.getHours() === 12) {
        return `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()} PM`;
      }
      return `${date.getHours() - 12}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()} PM`;

    case 'HH mm':
      if (date.getHours() < 12) {
        return `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}am`;
      } else if (date.getHours() === 12) {
        return `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}pm`;
      }
      return `${date.getHours() - 12}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}pm`;

    case 'HH mm ss':
      return `${date.getHours() - 12}:${date.getMinutes()}:${date.getSeconds()}`;

    case 'hh mm':
      const hours = date / 3600;
      const minutes = (date - hours * 3600) / 60;
      return hours < 1 ? `${hours * 60} m` : hours ? `${hours} h${minutes}m` : '';

    case 'DD MMM YYYY HH:MM:a':
      const dated = `${date.getDate()} ${monthNameShortFromDate(date)} ${date.getFullYear()}`;
      if (date.getHours() > 12) {
        time = `${date.getHours() - 12 < 10 ? `0${date.getHours() - 12}` : date.getHours() - 12}:${
          date.getMinutes() === 0
            ? '00'
            : date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        }PM`;
      } else {
        time = `${
          date.getHours() < 10
            ? date.getHours() === 0 ? 12 : `0${date.getHours()}`
            : date.getHours()
        }:${
          date.getMinutes() === 0
            ? '00'
            : date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        }${date.getHours() === 12 ? 'PM' : 'AM'}`;
      }

      return `${dated}, ${time}`;

    case 'WWWW DD MMM':
      const www = weekDays[date.getDay()];
      const dd = date.getDate();
      const mmm = monthNamesLong[date.getMonth()];
      return `${www}, ${dd} ${mmm}`;

    case 'WWWW DD':
      const weekDay = weekDays[date.getDay()];
      const d = date.getDate();
      return `${weekDay}, ${d}`;

    default:
      return `${date.getDate()} ${monthNameShortFromDate(date)} ${date.getFullYear()}`;
  }
}

export function getTimeInFormat(time, format) {
  let hours,
    minutes,
    seconds;
  switch (format) {
    case 'hh mm':
      hours = Math.floor(time / 3600000);
      minutes = Math.floor((time - hours * 3600000) / 60000);
      return hours < 1 ? `${minutes} m` : hours ? `${hours}h ${minutes}m` : '';

    case 'hh mm ss':
      hours = Math.floor(time / 3600000);
      minutes = Math.floor((time - hours * 3600000) / 60000);
      seconds = hours || minutes ? undefined : Math.floor(time / 1000);
      return seconds !== undefined
        ? `${seconds} s`
        : hours < 1 ? `${minutes} m` : hours ? `${hours}h ${minutes}m` : '';

    case '00:00:00':
      hours = time / (1000 * 60 * 60);
      const absoluteHours = Math.floor(hours);
      const h = absoluteHours > 9 ? absoluteHours : `0${absoluteHours}`;

      minutes = (hours - absoluteHours) * 60;
      const absoluteMinutes = Math.floor(minutes);
      const m = absoluteMinutes > 9 ? absoluteMinutes : `0${absoluteMinutes}`;

      seconds = (minutes - absoluteMinutes) * 60;
      const absoluteSeconds = Math.floor(seconds);
      const s = absoluteSeconds > 9 ? absoluteSeconds : `0${absoluteSeconds}`;

      return `${h}:${m}:${s}`;

    case 'HH MM SS':
      hours = Math.floor(time / 3600000);
      minutes = Math.floor((time - hours * 3600000) / 60000);
      seconds = hours || minutes ? undefined : Math.floor(time / 1000);
      return seconds !== undefined
        ? `${seconds} S`
        : hours < 1 ? `${minutes} M` : hours ? `${hours}H ${minutes}M` : '';

    case 'HH MM':
      hours = Math.floor(time / 3600000);
      minutes = Math.floor((time - hours * 3600000) / 60000);
      return hours < 1 ? `${minutes}M` : hours ? `${hours}H ${minutes}M` : '';

    case 'msToTime':
      seconds = parseInt((time / 1000) % 60);
      minutes = parseInt((time / (1000 * 60)) % 60);
      hours = parseInt((time / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? `0${hours}` : hours;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      return `${hours}:${minutes}:${seconds}`;

    case 'AM PM':
      hours = time.getHours();
      minutes = time.getMinutes();
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours %= 12;
      hours = hours || 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${hours}:${minutes} ${ampm}`;

    default:
      return time;
  }
}

// railwayTime {hours, minutes}
export function railWayTimeToNormalTime(railwayTime) {
  const normalTime = {
    hours: railwayTime.hours,
    minutes: railwayTime.minutes,
    meridiem: 'AM',
  };
  if (railwayTime.hours > 12) {
    normalTime.hours = railwayTime.hours % 12;
    normalTime.meridiem = 'PM';
  } else if (railwayTime.hours === 0) {
    normalTime.hours = 12;
    normalTime.meridiem = 'AM';
  } else if (railwayTime.hours < 12) {
    normalTime.hours = railwayTime.hours;
    normalTime.meridiem = 'AM';
  } else {
    normalTime.meridiem = 'PM';
  }
  return normalTime;
}

// railwayTime {hours, minutes, meridiem}
export function normalTimeToRailWayTime(normalTime) {
  if (normalTime.hours !== '' || normalTime.minutes !== '') {
    const railwayTime = {
      hours: normalTime.hours,
      minutes: normalTime.minutes,
    };

    if (railwayTime.hours === 12) {
      if (normalTime.meridiem === 'AM') {
        railwayTime.hours = 0;
      }
    } else if (normalTime.meridiem === 'PM') {
      railwayTime.hours += 12;
    } else if (normalTime.meridiem === 'AM') {
      railwayTime.hours = normalTime.hours;
    }
    return railwayTime;
  }
}

export function msToWDHM(ms) {
  const WDHM = {
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
  };
  WDHM.weeks = parseInt(ms / (1000 * 60 * 60 * 24 * 7));
  WDHM.days = parseInt((ms / (1000 * 60 * 60 * 24)) % 7);
  WDHM.hours = parseInt((ms / (1000 * 60 * 60)) % 24);
  WDHM.minutes = parseInt((ms / (1000 * 60)) % 60);

  return WDHM;
}

export function msToWDHMString(ms, lowerCase) {
  const WDHM = msToWDHM(ms);
  const msString = `${WDHM.weeks > 0 ? `${WDHM.weeks}W ` : ''}${
    WDHM.days > 0 ? `${WDHM.days}D ` : ''
  }${WDHM.hours > 0 ? `${WDHM.hours}H ` : ''}${WDHM.minutes > 0 ? `${WDHM.minutes}M` : ''}`;
  if (msString.length && lowerCase) {
    return msString.toLowerCase();
  } else if (msString.length) {
    return msString;
  }
  return `${parseInt((ms / 1000) % 60)}S`;
}

export function WDHMtoMs(WDHM) {
  const ms =
    (WDHM.weeks || 0) * 7 * 24 * 60 * 60 * 1000 +
    (WDHM.days || 0) * 24 * 60 * 60 * 1000 +
    (WDHM.hours || 0) * 60 * 60 * 1000 +
    (WDHM.minutes || 0) * 60 * 1000;

  return ms;
}

/* Returns time in milliseconds from date in milliseconds */
export function timeFromDate(date) {
  date = new Date(date);
  return date.getHours() * 3600 * 1000 + date.getMinutes() * 60 * 1000 + date.getSeconds() * 1000;
}

export function timestampOnOffset({ timestamp, h, m }) {
  return timestamp + h * 60 * 60 * 1000 + m * 60 * 1000;
}

export function getDateFormat(milliseconds) {
  return moment(milliseconds).format('DD MMM YY').toUpperCase();
}

export function getHours(milliseconds) {
  return moment(milliseconds).format('HH');
}

export function getLogDateFormat(milliseconds) {
  return moment(milliseconds).format('DD/MM/YY');
}

export function getDateMonth(milliseconds) {
  return moment(milliseconds).format('DD MMM').toUpperCase();
}

export function getDateMonYear(milliseconds) {
  return moment(milliseconds).format('DD MMM YYYY');
}

export function getMonDateYear(milliseconds) {
  return moment(milliseconds).format('MMM DD, YY');
}

export function getMonDateFullYear(milliseconds) {
  return moment(milliseconds).format('MMM DD, YYYY');
}

export function getTimeDate(milliseconds) {
  return moment(milliseconds).format('h:mm a, DD MMM YY');
}
