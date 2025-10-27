import StackedBarChart from './Charts/StackedBarChart';
import type { TimesheetWeekAggregate } from '../../hooks/useTimesheet';
import { formatDuration } from '../../utils/dateUtils';

interface WeekBreakdownProps {
  data: TimesheetWeekAggregate[];
}

const WeekBreakdown = ({ data }: WeekBreakdownProps) => {
  if (!data.length) {
    return null;
  }

  const legend = new Map<string, { name: string; color?: string }>();
  data.forEach((week) => {
    week.segments.forEach((segment) => {
      if (!legend.has(segment.categoryId)) {
        legend.set(segment.categoryId, { name: segment.name, color: segment.color });
      }
    });
  });

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-800">Weekly breakdown</h3>
        <p className="text-sm text-slate-500">Category mix of tracked time per week.</p>
      </div>
      <StackedBarChart
        data={data.map((week) => ({
          label: week.label,
          segments: week.segments.map((segment) => ({
            key: `${week.label}-${segment.categoryId}`,
            name: segment.name,
            value: segment.value,
            color: segment.color,
          })),
        }))}
        formatValue={formatDuration}
      />
      <div className="flex flex-wrap gap-3 text-xs text-slate-500">
        {Array.from(legend.entries()).map(([key, item]) => (
          <div key={key} className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: item.color ?? '#CBD5F5' }}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekBreakdown;
