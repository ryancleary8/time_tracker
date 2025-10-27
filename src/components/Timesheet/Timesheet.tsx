import { useMemo, useState } from 'react';
import useTimesheet, {
  TimesheetCategory,
  TimesheetRange,
  TimesheetRangePreset,
  TimesheetSession,
} from '../../hooks/useTimesheet';
import SummaryCards from './SummaryCards';
import DayBreakdown from './DayBreakdown';
import WeekBreakdown from './WeekBreakdown';
import CategoryBreakdown from './CategoryBreakdown';

const RANGE_PRESET_OPTIONS: TimesheetRangePreset[] = ['Today', 'ThisWeek', 'Custom'];

interface TimesheetProps {
  sessions: TimesheetSession[];
  categories: TimesheetCategory[];
}

const Timesheet = ({ sessions, categories }: TimesheetProps) => {
  const [preset, setPreset] = useState<TimesheetRangePreset>('ThisWeek');
  const [customStart, setCustomStart] = useState<string>('');
  const [customEnd, setCustomEnd] = useState<string>('');

  const range = useMemo<TimesheetRange>(() => {
    if (preset === 'Custom') {
      return {
        preset,
        start: customStart ? new Date(customStart) : undefined,
        end: customEnd ? new Date(customEnd) : undefined,
      };
    }
    return { preset };
  }, [preset, customStart, customEnd]);

  const { totalsMs, avgMs, byDay, byWeek, byCategory, sessionCount } = useTimesheet(
    sessions,
    range,
    categories
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">Timesheet</h2>
          <p className="text-sm text-slate-500">
            Explore how your time is allocated across days, weeks, and categories.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex flex-col text-sm text-slate-500">
            <span className="mb-1 font-medium text-slate-600">Range</span>
            <select
              value={preset}
              onChange={(event) => setPreset(event.target.value as TimesheetRangePreset)}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              {RANGE_PRESET_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option === 'ThisWeek' ? 'This week' : option}
                </option>
              ))}
            </select>
          </label>
          {preset === 'Custom' ? (
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="flex flex-col text-sm text-slate-500">
                <span className="mb-1 font-medium text-slate-600">Start</span>
                <input
                  type="date"
                  value={customStart}
                  onChange={(event) => setCustomStart(event.target.value)}
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </label>
              <label className="flex flex-col text-sm text-slate-500">
                <span className="mb-1 font-medium text-slate-600">End</span>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(event) => setCustomEnd(event.target.value)}
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </label>
            </div>
          ) : null}
        </div>
      </div>

      <SummaryCards totalMs={totalsMs} averageMs={avgMs} sessionCount={sessionCount} />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <DayBreakdown data={byDay} />
          <CategoryBreakdown data={byCategory} />
        </div>
        <div className="space-y-6">
          <WeekBreakdown data={byWeek} />
        </div>
      </div>
    </div>
  );
};

export default Timesheet;
