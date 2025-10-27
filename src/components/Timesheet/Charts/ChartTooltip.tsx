import type { PropsWithChildren } from 'react';

interface ChartTooltipProps extends PropsWithChildren {
  label: string;
  value: string;
}

const ChartTooltip = ({ label, value, children }: ChartTooltipProps) => {
  return (
    <div className="pointer-events-none rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-lg">
      <div className="font-medium text-slate-700">{label}</div>
      <div className="text-slate-500">{value}</div>
      {children ? <div className="mt-1 text-xs text-slate-400">{children}</div> : null}
    </div>
  );
};

export default ChartTooltip;
