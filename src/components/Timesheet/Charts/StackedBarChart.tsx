import { useMemo, useState } from 'react';
import ChartTooltip from './ChartTooltip';
import { formatDurationCompact } from '../../../utils/dateUtils';

export interface StackedBarSegment {
  key: string;
  name: string;
  value: number;
  color?: string;
}

export interface StackedBarDatum {
  label: string;
  segments: StackedBarSegment[];
}

interface StackedBarChartProps {
  data: StackedBarDatum[];
  height?: number;
  formatValue?: (value: number) => string;
}

const DEFAULT_SEGMENT_COLORS = [
  '#6366F1',
  '#22C55E',
  '#F97316',
  '#0EA5E9',
  '#EC4899',
  '#F59E0B',
];

const StackedBarChart = ({ data, height = 180, formatValue = formatDurationCompact }: StackedBarChartProps) => {
  const [hovered, setHovered] = useState<{ bar: number; segment: number } | null>(null);

  const { bars, chartHeight, chartWidth } = useMemo(() => {
    const chartHeightValue = Math.max(height - 24, 100);
    const barWidth = 32;
    const gap = 18;
    const totals = data.map((bar) => bar.segments.reduce((sum, segment) => sum + segment.value, 0));
    const maxTotal = totals.reduce((max, value) => Math.max(max, value), 0) || 1;
    const width = data.length * (barWidth + gap) + gap;
    const processed = data.map((bar, index) => {
      let currentY = chartHeightValue;
      const segments = bar.segments
        .filter((segment) => segment.value > 0)
        .map((segment, segmentIndex) => {
          const heightValue = (segment.value / maxTotal) * (chartHeightValue - 12);
          currentY -= heightValue;
          const color = segment.color ?? DEFAULT_SEGMENT_COLORS[segmentIndex % DEFAULT_SEGMENT_COLORS.length];
          return {
            ...segment,
            color,
            x: gap + index * (barWidth + gap),
            y: currentY,
            width: barWidth,
            height: heightValue,
          };
        });
      return {
        label: bar.label,
        total: totals[index],
        segments,
      };
    });
    return {
      bars: processed,
      chartHeight: chartHeightValue,
      chartWidth: width,
    };
  }, [data, height]);

  return (
    <div className="relative flex flex-col">
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="h-48 w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {bars.map((bar, barIndex) =>
          bar.segments.map((segment, segmentIndex) => (
            <rect
              key={`${bar.label}-${segment.key}`}
              x={segment.x}
              y={segment.height === 0 ? chartHeight - 2 : segment.y}
              width={segment.width}
              height={segment.height === 0 ? 2 : segment.height}
              fill={segment.color}
              rx={6}
              onMouseEnter={() => setHovered({ bar: barIndex, segment: segmentIndex })}
              onMouseLeave={() => setHovered((prev) =>
                prev && prev.bar === barIndex && prev.segment === segmentIndex ? null : prev
              )}
            />
          ))
        )}
      </svg>
      <div
        className="mt-2 grid gap-3 text-xs text-slate-500"
        style={{ gridTemplateColumns: `repeat(${Math.max(data.length, 1)}, minmax(0, 1fr))` }}
      >
        {data.map((bar) => (
          <div key={bar.label} className="text-center">
            {bar.label}
          </div>
        ))}
      </div>
      {hovered ? (
        <div className="pointer-events-none absolute left-0 top-0 w-full -translate-y-2">
          {(() => {
            const bar = bars[hovered.bar];
            const segment = bar.segments[hovered.segment];
            if (!segment) {
              return null;
            }
            const percent = (segment.x + segment.width / 2) / chartWidth;
            return (
              <div
                className="absolute"
                style={{
                  left: `${Math.min(Math.max(percent * 100, 5), 95)}%`,
                  transform: 'translate(-50%, -100%)',
                }}
              >
                <ChartTooltip label={`${segment.name} · ${bar.label}`} value={formatValue(segment.value)} />
              </div>
            );
          })()}
        </div>
      ) : null}
    </div>
  );
};

export default StackedBarChart;
