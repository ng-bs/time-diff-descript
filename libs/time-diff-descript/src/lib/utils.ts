export function makeRelativeFormat(
  locale: string,
  options: Intl.RelativeTimeFormatOptions
): Intl.RelativeTimeFormat | void {
  try {
    const IntlRef = getIntl();
    if (IntlRef) {
      return new IntlRef.RelativeTimeFormat(locale, options);
    }
  } catch (e) {
    if (!(e instanceof RangeError)) {
      throw e;
    }
  }
}

function getIntl() {
  return typeof window !== 'undefined' ? window?.Intl : global?.Intl;
}
