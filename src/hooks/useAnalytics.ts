import { useCallback } from 'react';

type AnalyticsPayload = Record<string, unknown>;

type AnalyticsHandler = (eventName: string, payload?: AnalyticsPayload) => void;

export const useAnalytics = (): { track: AnalyticsHandler } => {
  const track = useCallback<AnalyticsHandler>((eventName, payload) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug('[analytics]', eventName, payload);
    }
  }, []);

  return { track };
};
