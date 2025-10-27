import { useMemo, useState } from 'react';
import ChartTooltip from './ChartTooltip';
import { formatDurationCompact } from '../../../utils/dateUtils';

export interface BarChartDatum {
  label: string;
  value: number;
  color?: string;
  tooltipLabel?: string;
}

interface BarChartProps {
  data: BarChartDatum[];
  height?: number;
  formatValue?: (value: number) => string;
}

const DEFAULT_COLOR = '#6366F1';

const BarChart = ({ data, height = 160, formatValue = formatDurationCompact }: BarChartProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { bars, chartHeight, chartWidth } = useMemo(() => {
    const chartHeightValue = Math.max(height - 24, 80);
    const barWidth = 28;
    const gap = 16;
    const max = data.reduce((acc, item) => Math.max(acc, item.value), 0);
    const computedMax = max || 1;
    const width = data.length * (barWidth + gap) + gap;
    const barsData = data.map((item, index) => {
      const barHeight = (item.value / computedMax) * (chartHeightValue - 10);
      const x = gap + index * (barWidth + gap);
      const y = chartHeightValue - barHeight;
      return {
        ...item,
        x,
        y,
        width: barWidth,
        height: barHeight,
      };
    });
    return {
      bars: barsData,
      chartHeight: chartHeightValue,
      chartWidth: width,
    };
  }, [data, height]);

  return (
    <div className="relative flex flex-col">
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="h-40 w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {bars.map((bar, index) => (
          <rect
            key={bar.label}
            x={bar.x}
            y={bar.height === 0 ? chartHeight - 2 : bar.y}
            width={bar.width}
            height={bar.height === 0 ? 2 : bar.height}
            fill={bar.color ?? DEFAULT_COLOR}
            rx={6}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex((prev) => (prev === index ? null : prev))}
          />
        ))}
      </svg>
      <div
        className="mt-2 grid gap-3 text-xs text-slate-500"
        style={{ gridTemplateColumns: `repeat(${Math.max(data.length, 1)}, minmax(0, 1fr))` }}
      >
        {data.map((item) => (
          <div key={item.label} className="text-center">
            {item.label}
          </div>
        ))}
      </div>
      {hoveredIndex !== null ? (
        <div
          className="pointer-events-none absolute left-0 top-0 flex -translate-y-2 justify-center"
          style={{
            width: '100%',
          }}
        >
          {(() => {
            const bar = bars[hoveredIndex];
            const percent = (bar.x + bar.width / 2) / chartWidth;
            const label = bar.tooltipLabel ?? bar.label;
            return (
              <div
                className="absolute"
                style={{
                  left: `${Math.min(Math.max(percent * 100, 5), 95)}%`,
                  transform: 'translate(-50%, -100%)',
                }}
              >
                <ChartTooltip label={label} value={formatValue(bar.value)} />
              </div>
            );
          })()}
        </div>
      ) : null}
    </div>
  );
};

export default BarChart;
