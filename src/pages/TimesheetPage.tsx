import { useMemo, useState } from 'react';
import SessionFilters from '../components/Sessions/SessionFilters';
import SummaryCards from '../components/Timesheet/SummaryCards';
import TimesheetSection from '../components/Timesheet/TimesheetSection';
import { useSessions } from '../context/SessionContext';
import { formatDuration, formatISODate, getWeekKey } from '../utils/time';

const TimesheetPage = () => {
  const { sessions, categories } = useSessions();
  const [filters, setFilters] = useState({ category: 'all', from: '', to: '' });

  const filtered = useMemo(() => {
    return sessions.filter((session) => {
      if (filters.category !== 'all' && session.category !== filters.category) {
        return false;
      }
      if (filters.from && new Date(session.start) < new Date(`${filters.from}T00:00:00`)) {
        return false;
      }
      if (filters.to && new Date(session.end) > new Date(`${filters.to}T23:59:59`)) {
        return false;
      }
      return true;
    });
  }, [sessions, filters]);

  const totalDuration = filtered.reduce((sum, session) => sum + session.durationMs, 0);
  const categoriesUsed = new Set(filtered.map((session) => session.category)).size;

  const byDay = useMemo(() => {
    const record: Record<string, number> = {};
    filtered.forEach((session) => {
      const key = formatISODate(session.start);
      record[key] = (record[key] ?? 0) + session.durationMs;
    });
    return Object.fromEntries(
      Object.entries(record).map(([key, duration]) => [key, formatDuration(duration)])
    );
  }, [filtered]);

  const byWeek = useMemo(() => {
    const record: Record<string, number> = {};
    filtered.forEach((session) => {
      const key = getWeekKey(session.start);
      record[key] = (record[key] ?? 0) + session.durationMs;
    });
    return Object.fromEntries(
      Object.entries(record).map(([key, duration]) => [key, formatDuration(duration)])
    );
  }, [filtered]);

  const byCategory = useMemo(() => {
    const record: Record<string, number> = {};
    filtered.forEach((session) => {
      record[session.category] = (record[session.category] ?? 0) + session.durationMs;
    });
    return Object.fromEntries(
      Object.entries(record).map(([key, duration]) => [key, formatDuration(duration)])
    );
  }, [filtered]);

  return (
    <div className="space-y-6">
      <SessionFilters
        category={filters.category}
        from={filters.from}
        to={filters.to}
        categories={categories}
        onChange={setFilters}
      />
      <SummaryCards
        totalDuration={formatDuration(totalDuration)}
        sessionCount={filtered.length}
        categoriesUsed={categoriesUsed}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <TimesheetSection title="By Day" data={byDay} />
        <TimesheetSection title="By Week" data={byWeek} />
        <TimesheetSection title="By Category" data={byCategory} />
      </div>
    </div>
  );
};

export default TimesheetPage;
