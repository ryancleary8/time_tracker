import BarChart from './Charts/BarChart';
import type { TimesheetCategoryAggregate } from '../../hooks/useTimesheet';
import { formatDuration } from '../../utils/dateUtils';

interface CategoryBreakdownProps {
  data: TimesheetCategoryAggregate[];
}

const CategoryBreakdown = ({ data }: CategoryBreakdownProps) => {
  if (!data.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-800">Category breakdown</h3>
        <p className="text-sm text-slate-500">How tracked time is distributed across categories.</p>
      </div>
      <BarChart
        data={data.map((item) => ({
          label: item.name,
          value: item.totalMs,
          color: item.color,
          tooltipLabel: `${item.name} (${item.sessionCount} session${item.sessionCount === 1 ? '' : 's'})`,
        }))}
        formatValue={formatDuration}
        height={200}
      />
    </div>
  );
};

export default CategoryBreakdown;
