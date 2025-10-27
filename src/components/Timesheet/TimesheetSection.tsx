interface TimesheetSectionProps {
  title: string;
  data: Record<string, string>;
}

const TimesheetSection = ({ title, data }: TimesheetSectionProps) => (
  <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
    {Object.keys(data).length === 0 ? (
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">No data for this range.</p>
    ) : (
      <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-200">
        {Object.entries(data).map(([label, value]) => (
          <li key={label} className="flex items-center justify-between">
            <span>{label}</span>
            <span className="font-semibold">{value}</span>
          </li>
        ))}
      </ul>
    )}
  </section>
);

export default TimesheetSection;
