import { makeRelativeFormat } from './utils';

export interface Config {
  locale: string;
}

export interface DiffOptions {
  locale?: string;
  referenceDate?: Date;
}

const DEFAULT_CONFIG: Config = {
  locale: 'en-us',
};

let _config: Config = DEFAULT_CONFIG;

export function setConfig(config: Config) {
  _config = {
    ...DEFAULT_CONFIG,
    ...config,
  };
}

export function getTimeDiff(date: Date, diffOptions?: DiffOptions) {
  const options = {
    ..._config,
    ...diffOptions,
    referenceDate: diffOptions?.referenceDate ?? new Date(),
  };

  const diffInMs = getDiffInMs(options.referenceDate, date);

  const diffFunction = diffInMs >= 0 ? timeAgoFromMs : timeUntilFromMs;

  return diffFunction(Math.abs(diffInMs), options.locale);
}

function getDiffInMs(date1: Date, date2: Date) {
  return date1.getTime() - date2.getTime();
}

function timeAgoFromMs(ms: number, locale: string): string | undefined {
  const sec = Math.round(ms / 1000);
  const min = Math.round(sec / 60);
  const hr = Math.round(min / 60);
  const day = Math.round(hr / 24);
  const month = Math.round(day / 30);
  const year = Math.round(month / 12);
  if (ms < 0) {
    return formatRelativeTime(locale, 0, 'second');
  } else if (sec < 10) {
    return formatRelativeTime(locale, 0, 'second');
  } else if (sec < 45) {
    return formatRelativeTime(locale, -sec, 'second');
  } else if (sec < 90) {
    return formatRelativeTime(locale, -min, 'minute');
  } else if (min < 45) {
    return formatRelativeTime(locale, -min, 'minute');
  } else if (min < 90) {
    return formatRelativeTime(locale, -hr, 'hour');
  } else if (hr < 24) {
    return formatRelativeTime(locale, -hr, 'hour');
  } else if (hr < 36) {
    return formatRelativeTime(locale, -day, 'day');
  } else if (day < 30) {
    return formatRelativeTime(locale, -day, 'day');
  } else if (month < 18) {
    return formatRelativeTime(locale, -month, 'month');
  } else {
    return formatRelativeTime(locale, -year, 'year');
  }
}

function formatRelativeTime(
  locale: string,
  value: number,
  unit: Intl.RelativeTimeFormatUnit
): string {
  const formatter = makeRelativeFormat(locale, { numeric: 'auto' });
  if (formatter) {
    return formatter.format(value, unit);
  } else {
    return formatEnRelativeTime(value, unit);
  }
}

// Simplified "en" RelativeTimeFormat.format function
//
// Values should roughly match
//   new Intl.RelativeTimeFormat('en', {numeric: 'auto'}).format(value, unit)
//
function formatEnRelativeTime(value: number, unit: string): string {
  if (value === 0) {
    switch (unit) {
      case 'year':
      case 'quarter':
      case 'month':
      case 'week':
        return `this ${unit}`;
      case 'day':
        return 'today';
      case 'hour':
      case 'minute':
        return `in 0 ${unit}s`;
      case 'second':
        return 'now';
    }
  } else if (value === 1) {
    switch (unit) {
      case 'year':
      case 'quarter':
      case 'month':
      case 'week':
        return `next ${unit}`;
      case 'day':
        return 'tomorrow';
      case 'hour':
      case 'minute':
      case 'second':
        return `in 1 ${unit}`;
    }
  } else if (value === -1) {
    switch (unit) {
      case 'year':
      case 'quarter':
      case 'month':
      case 'week':
        return `last ${unit}`;
      case 'day':
        return 'yesterday';
      case 'hour':
      case 'minute':
      case 'second':
        return `1 ${unit} ago`;
    }
  } else if (value > 1) {
    switch (unit) {
      case 'year':
      case 'quarter':
      case 'month':
      case 'week':
      case 'day':
      case 'hour':
      case 'minute':
      case 'second':
        return `in ${value} ${unit}s`;
    }
  } else if (value < -1) {
    switch (unit) {
      case 'year':
      case 'quarter':
      case 'month':
      case 'week':
      case 'day':
      case 'hour':
      case 'minute':
      case 'second':
        return `${-value} ${unit}s ago`;
    }
  }

  throw new RangeError(`Invalid unit argument for format() '${unit}'`);
}

function timeUntilFromMs(ms: number, locale: string): string {
  const sec = Math.round(ms / 1000);
  const min = Math.round(sec / 60);
  const hr = Math.round(min / 60);
  const day = Math.round(hr / 24);
  const month = Math.round(day / 30);
  const year = Math.round(month / 12);
  if (month >= 18) {
    return formatRelativeTime(locale, year, 'year');
  } else if (month >= 12) {
    return formatRelativeTime(locale, year, 'year');
  } else if (day >= 45) {
    return formatRelativeTime(locale, month, 'month');
  } else if (day >= 30) {
    return formatRelativeTime(locale, month, 'month');
  } else if (hr >= 36) {
    return formatRelativeTime(locale, day, 'day');
  } else if (hr >= 24) {
    return formatRelativeTime(locale, day, 'day');
  } else if (min >= 90) {
    return formatRelativeTime(locale, hr, 'hour');
  } else if (min >= 45) {
    return formatRelativeTime(locale, hr, 'hour');
  } else if (sec >= 90) {
    return formatRelativeTime(locale, min, 'minute');
  } else if (sec >= 45) {
    return formatRelativeTime(locale, min, 'minute');
  } else if (sec >= 10) {
    return formatRelativeTime(locale, sec, 'second');
  } else {
    return formatRelativeTime(locale, 0, 'second');
  }
}
