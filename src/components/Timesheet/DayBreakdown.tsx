import BarChart from './Charts/BarChart';
import type { TimesheetDayAggregate } from '../../hooks/useTimesheet';
import { formatDuration } from '../../utils/dateUtils';

interface DayBreakdownProps {
  data: TimesheetDayAggregate[];
}

const DayBreakdown = ({ data }: DayBreakdownProps) => {
  if (!data.length) {
    return (
      <div className="rounded-lg border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
        No sessions recorded for the selected range.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Daily breakdown</h3>
          <p className="text-sm text-slate-500">Total tracked time per day.</p>
        </div>
      </div>
      <BarChart
        data={data.map((item) => ({
          label: item.label,
          value: item.totalMs,
          tooltipLabel: `${item.label} (${item.sessionCount} session${item.sessionCount === 1 ? '' : 's'})`,
        }))}
        formatValue={formatDuration}
      />
    </div>
  );
};

export default DayBreakdown;
