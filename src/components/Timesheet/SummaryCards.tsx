<<<<<<< ours
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
=======
interface SummaryCardsProps {
  totalDuration: string;
  sessionCount: number;
  categoriesUsed: number;
}

const Card = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
    <div className="text-sm text-slate-500 dark:text-slate-300">{label}</div>
    <div className="mt-2 text-2xl font-semibold text-slate-800 dark:text-slate-100">{value}</div>
  </div>
);

const SummaryCards = ({ totalDuration, sessionCount, categoriesUsed }: SummaryCardsProps) => (
  <div className="grid gap-4 md:grid-cols-3">
    <Card label="Tracked Time" value={totalDuration} />
    <Card label="Sessions" value={String(sessionCount)} />
    <Card label="Categories" value={String(categoriesUsed)} />
  </div>
);
>>>>>>> theirs

export default SummaryCards;
