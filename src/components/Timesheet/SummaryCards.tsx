import { formatDuration } from '../../utils/dateUtils';

interface SummaryCardsProps {
  totalMs: number;
  averageMs: number;
  sessionCount: number;
}

const SummaryCards = ({ totalMs, averageMs, sessionCount }: SummaryCardsProps) => {
  const summary = [
    {
      label: 'Total time',
      value: formatDuration(totalMs),
      description: 'Tracked within the selected range',
    },
    {
      label: 'Average session',
      value: formatDuration(averageMs),
      description: 'Mean duration of tracked sessions',
    },
    {
      label: 'Sessions',
      value: sessionCount.toLocaleString(),
      description: 'Count of tracked sessions',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {summary.map((item) => (
        <div
          key={item.label}
          className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="text-sm font-medium text-slate-500">{item.label}</div>
          <div className="mt-2 text-2xl font-semibold text-slate-800">{item.value}</div>
          <div className="mt-1 text-xs text-slate-400">{item.description}</div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
