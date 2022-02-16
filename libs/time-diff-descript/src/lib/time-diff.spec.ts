import { getTimeDiff, setConfig } from './time-diff';

describe('time-diff', () => {
  describe('getTimeDiff', () => {
    it('should get a time diff for almost immediately (1ms)', () => {
      const now = new Date();
      const date = new Date(now);
      date.setMilliseconds(date.getMilliseconds() + 1);
      const result = getTimeDiff(date, { locale: 'en-US', referenceDate: now });
      expect(result).toEqual('now');
    });

    it('should get a time diff for almost immediately (9s)', () => {
      const now = new Date();
      const date = new Date(now);
      date.setSeconds(date.getSeconds() + 9);
      const result = getTimeDiff(date, { locale: 'en-US', referenceDate: now });
      expect(result).toEqual('now');
    });

    it('should get a time diff for 10 seconds in the future', () => {
      const now = new Date();
      const date = new Date(now);
      date.setSeconds(date.getSeconds() + 10);
      const result = getTimeDiff(date, { locale: 'en-US', referenceDate: now });
      expect(result).toEqual('in 10 seconds');
    });

    it('should get a time diff for 10 seconds in the past', () => {
      const now = new Date();
      const date = new Date(now);
      date.setSeconds(date.getSeconds() - 10);
      const result = getTimeDiff(date, { locale: 'en-US', referenceDate: now });
      expect(result).toEqual('10 seconds ago');
    });

    it('should get a time diff for 1 minute in the future', () => {
      const now = new Date();
      const date = new Date(now);
      date.setMinutes(date.getMinutes() + 1);
      const result = getTimeDiff(date, { locale: 'en-US', referenceDate: now });
      expect(result).toEqual('in 1 minute');
    });

    it('should get a time diff for 1 minute in the past', () => {
      const now = new Date();
      const date = new Date(now);
      date.setMinutes(date.getMinutes() - 1);
      const result = getTimeDiff(date, { locale: 'en-US', referenceDate: now });
      expect(result).toEqual('1 minute ago');
    });

    it('should get a time diff for 1 hour in the future', () => {
      const now = new Date();
      const date = new Date(now);
      date.setHours(date.getHours() + 1);
      const result = getTimeDiff(date, { locale: 'en-US', referenceDate: now });
      expect(result).toEqual('in 1 hour');
    });

    it('should get a time diff for 1 hour in the past', () => {
      const now = new Date();
      const date = new Date(now);
      date.setHours(date.getHours() - 1);
      const result = getTimeDiff(date, { locale: 'en-US', referenceDate: now });
      expect(result).toEqual('1 hour ago');
    });

    it('should get a time diff for 1 day in the future', () => {
      const now = new Date();
      const date = new Date(now);
      date.setDate(date.getDate() + 1);
      const result = getTimeDiff(date, { locale: 'en-US', referenceDate: now });
      expect(result).toEqual('tomorrow');
    });

    it('should get a time diff for 1 day in the past', () => {
      const now = new Date();
      const date = new Date(now);
      date.setDate(date.getDate() - 1);
      const result = getTimeDiff(date, { locale: 'en-US', referenceDate: now });
      expect(result).toEqual('yesterday');
    });

    it('should get a time diff for 2 days in the future', () => {
      const now = new Date();
      const date = new Date(now);
      date.setDate(date.getDate() + 2);
      const result = getTimeDiff(date, { locale: 'en-US', referenceDate: now });
      expect(result).toEqual('in 2 days');
    });

    it('should get a time diff for 2 days in the past', () => {
      const now = new Date();
      const date = new Date(now);
      date.setDate(date.getDate() - 2);
      const result = getTimeDiff(date, { locale: 'en-US', referenceDate: now });
      expect(result).toEqual('2 days ago');
    });

    it('should get a time diff for 2 months in the future', () => {
      const now = new Date();
      const date = new Date(now);
      date.setDate(date.getDate() + 60);
      const result = getTimeDiff(date, { locale: 'en-US', referenceDate: now });
      expect(result).toEqual('in 2 months');
    });

    it('should get a time diff for 2 months in the past', () => {
      const now = new Date();
      const date = new Date(now);
      date.setDate(date.getDate() - 60);
      const result = getTimeDiff(date, { locale: 'en-US', referenceDate: now });
      expect(result).toEqual('2 months ago');
    });
  });

  describe('setting config', () => {
    it('should use a previously set config to set the locale to es-ES (Spain)', () => {
      const now = new Date();
      const date = new Date(now);
      date.setMinutes(date.getMinutes() + 1);

      setConfig({ locale: 'es-ES' });

      const result = getTimeDiff(date, { referenceDate: now });
      expect(result).toEqual('dentro de 1 minuto');
    });

    it('should use a previously set config to set the locale to es-AR (Argentina)', () => {
      const now = new Date();
      const date = new Date(now);
      date.setMinutes(date.getMinutes() + 1);

      setConfig({ locale: 'es-AR' });

      const result = getTimeDiff(date, { referenceDate: now });
      expect(result).toEqual('dentro de 1 minuto');
    });

    it('should use a previously set config to set the locale to fr-FR (France)', () => {
      const now = new Date();
      const date = new Date(now);
      date.setMinutes(date.getMinutes() + 1);

      setConfig({ locale: 'fr-FR' });

      const result = getTimeDiff(date, { referenceDate: now });
      expect(result).toEqual('dans 1 minute');
    });
  });
});
