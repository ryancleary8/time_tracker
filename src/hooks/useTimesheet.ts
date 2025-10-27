import { useMemo } from 'react';
import {
  DateInput,
  endOfDay,
  endOfWeek,
  formatDayLabel,
  formatWeekRangeLabel,
  isWithinRange,
  startOfDay,
  startOfWeek,
  toDate,
} from '../utils/dateUtils';

export type TimesheetRangePreset = 'Today' | 'ThisWeek' | 'Custom';

export interface TimesheetRange {
  preset: TimesheetRangePreset;
  start?: DateInput;
  end?: DateInput;
}

export interface TimesheetCategory {
  id: string;
  name: string;
  color?: string;
}

export interface TimesheetSession {
  id: string;
  start: DateInput;
  end: DateInput;
  categoryId?: string | null;
}

export interface TimesheetDayAggregate {
  date: Date;
  label: string;
  totalMs: number;
  sessionCount: number;
}

export interface TimesheetWeekAggregate {
  start: Date;
  end: Date;
  label: string;
  totalMs: number;
  segments: Array<{
    categoryId: string;
    name: string;
    color?: string;
    value: number;
  }>;
}

export interface TimesheetCategoryAggregate {
  categoryId: string;
  name: string;
  color?: string;
  totalMs: number;
  sessionCount: number;
}

export interface UseTimesheetResult {
  totalsMs: number;
  avgMs: number;
  byDay: TimesheetDayAggregate[];
  byWeek: TimesheetWeekAggregate[];
  byCategory: TimesheetCategoryAggregate[];
  sessionCount: number;
}

interface NormalizedSession {
  id: string;
  start: Date;
  end: Date;
  durationMs: number;
  categoryId: string;
  category: TimesheetCategory;
}

const DEFAULT_CATEGORY: TimesheetCategory = {
  id: 'uncategorized',
  name: 'Uncategorized',
  color: '#CBD5F5',
};

const normalizeCategoryId = (value?: string | null): string => {
  if (!value) {
    return DEFAULT_CATEGORY.id;
  }
  return value;
};

export const useTimesheet = (
  sessions: TimesheetSession[],
  range: TimesheetRange,
  categories: TimesheetCategory[]
): UseTimesheetResult => {
  const categoryMap = useMemo(() => {
    const map = new Map<string, TimesheetCategory>();
    categories.forEach((category) => {
      map.set(category.id, category);
    });
    map.set(DEFAULT_CATEGORY.id, DEFAULT_CATEGORY);
    return map;
  }, [categories]);

  const normalizedSessions = useMemo<NormalizedSession[]>(() => {
    return sessions
      .map((session) => {
        const start = toDate(session.start);
        const end = toDate(session.end);
        const safeEnd = end.getTime() < start.getTime() ? start : end;
        const durationMs = Math.max(0, safeEnd.getTime() - start.getTime());
        const categoryId = normalizeCategoryId(session.categoryId ?? undefined);
        const category = categoryMap.get(categoryId) ?? DEFAULT_CATEGORY;
        return {
          id: session.id,
          start,
          end: safeEnd,
          durationMs,
          categoryId,
          category,
        };
      })
      .filter((session) => session.durationMs > 0);
  }, [sessions, categoryMap]);

  const { startDate, endDate } = useMemo(() => {
    const now = new Date();
    if (range.preset === 'Today') {
      return {
        startDate: startOfDay(now),
        endDate: endOfDay(now),
      };
    }
    if (range.preset === 'ThisWeek') {
      const start = startOfWeek(now);
      return {
        startDate: start,
        endDate: endOfWeek(now),
      };
    }
    const providedStart = range.start ? startOfDay(range.start) : startOfDay(now);
    const providedEnd = range.end ? endOfDay(range.end) : endOfDay(now);
    if (providedEnd.getTime() < providedStart.getTime()) {
      return {
        startDate: providedEnd,
        endDate: providedStart,
      };
    }
    return {
      startDate: providedStart,
      endDate: providedEnd,
    };
  }, [range]);

  const filteredSessions = useMemo(() => {
    return normalizedSessions.filter((session) =>
      isWithinRange(session.start, startDate, endDate)
    );
  }, [normalizedSessions, startDate, endDate]);

  const totalsMs = useMemo(
    () => filteredSessions.reduce((total, session) => total + session.durationMs, 0),
    [filteredSessions]
  );

  const sessionCount = filteredSessions.length;
  const avgMs = sessionCount > 0 ? totalsMs / sessionCount : 0;

  const byDay = useMemo<TimesheetDayAggregate[]>(() => {
    const map = new Map<string, TimesheetDayAggregate>();
    filteredSessions.forEach((session) => {
      const day = startOfDay(session.start);
      const key = day.toISOString();
      const existing = map.get(key);
      if (existing) {
        existing.totalMs += session.durationMs;
        existing.sessionCount += 1;
      } else {
        map.set(key, {
          date: day,
          label: formatDayLabel(day),
          totalMs: session.durationMs,
          sessionCount: 1,
        });
      }
    });
    return Array.from(map.values()).sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [filteredSessions]);

  const byCategory = useMemo<TimesheetCategoryAggregate[]>(() => {
    const map = new Map<string, TimesheetCategoryAggregate>();
    filteredSessions.forEach((session) => {
      const existing = map.get(session.categoryId);
      if (existing) {
        existing.totalMs += session.durationMs;
        existing.sessionCount += 1;
      } else {
        map.set(session.categoryId, {
          categoryId: session.categoryId,
          name: session.category.name,
          color: session.category.color,
          totalMs: session.durationMs,
          sessionCount: 1,
        });
      }
    });
    return Array.from(map.values()).sort((a, b) => b.totalMs - a.totalMs);
  }, [filteredSessions]);

  const byWeek = useMemo<TimesheetWeekAggregate[]>(() => {
    const map = new Map<string, TimesheetWeekAggregate>();
    filteredSessions.forEach((session) => {
      const weekStart = startOfWeek(session.start);
      const weekEnd = endOfWeek(session.start);
      const key = weekStart.toISOString();
      let aggregate = map.get(key);
      if (!aggregate) {
        aggregate = {
          start: weekStart,
          end: weekEnd,
          label: formatWeekRangeLabel(weekStart, weekEnd),
          totalMs: 0,
          segments: [],
        };
        map.set(key, aggregate);
      }
      aggregate.totalMs += session.durationMs;
      const existingSegment = aggregate.segments.find(
        (segment) => segment.categoryId === session.categoryId
      );
      if (existingSegment) {
        existingSegment.value += session.durationMs;
      } else {
        aggregate.segments.push({
          categoryId: session.categoryId,
          name: session.category.name,
          color: session.category.color,
          value: session.durationMs,
        });
      }
    });
    return Array.from(map.values()).sort((a, b) => a.start.getTime() - b.start.getTime());
  }, [filteredSessions]);

  return {
    totalsMs,
    avgMs,
    byDay,
    byWeek,
    byCategory,
    sessionCount,
  };
};

export default useTimesheet;
