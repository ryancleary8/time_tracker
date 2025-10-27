<<<<<<< ours
import { ChangeEvent } from "react";
import { startOfToday, startOfWeek, toDateInputValue } from "../../utils/datetime";

export type DateRangeOption = "today" | "week" | "custom";

export interface FilterState {
  range: DateRangeOption;
  startDate?: string;
  endDate?: string;
  categories: string[];
}

interface SessionFiltersProps {
  filters: FilterState;
  availableCategories: string[];
  onChange: (filters: FilterState) => void;
}

const SessionFilters = ({ filters, availableCategories, onChange }: SessionFiltersProps) => {
  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as DateRangeOption;
    if (value === "today") {
      const today = startOfToday();
      onChange({
        range: value,
        startDate: toDateInputValue(today),
        endDate: toDateInputValue(today),
        categories: filters.categories,
      });
      return;
    }
    if (value === "week") {
      const start = startOfWeek();
      const today = new Date();
      onChange({
        range: value,
        startDate: toDateInputValue(start),
        endDate: toDateInputValue(today),
        categories: filters.categories,
      });
      return;
    }
    onChange({ range: value, startDate: filters.startDate, endDate: filters.endDate, categories: filters.categories });
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onChange({ ...filters, range: "custom", [name]: value });
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      onChange({ ...filters, categories: [...filters.categories, value] });
    } else {
      onChange({ ...filters, categories: filters.categories.filter((category) => category !== value) });
    }
  };

  return (
    <section
      aria-label="Session filters"
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "0.5rem",
        padding: "1rem",
        backgroundColor: "#f8fafc",
        marginBottom: "1.5rem",
      }}
    >
      <h3 style={{ marginBottom: "0.75rem", fontSize: "1rem", fontWeight: 600 }}>Filter sessions</h3>
      <fieldset style={{ border: "none", padding: 0, marginBottom: "1rem" }}>
        <legend style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Date range</legend>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <label>
            <input
              type="radio"
              name="date-range"
              value="today"
              checked={filters.range === "today"}
              onChange={handleRangeChange}
            />
            <span style={{ marginLeft: "0.25rem" }}>Today</span>
          </label>
          <label>
            <input
              type="radio"
              name="date-range"
              value="week"
              checked={filters.range === "week"}
              onChange={handleRangeChange}
            />
            <span style={{ marginLeft: "0.25rem" }}>This week</span>
          </label>
          <label>
            <input
              type="radio"
              name="date-range"
              value="custom"
              checked={filters.range === "custom"}
              onChange={handleRangeChange}
            />
            <span style={{ marginLeft: "0.25rem" }}>Custom</span>
          </label>
        </div>
        {filters.range === "custom" && (
          <div style={{ display: "flex", gap: "1rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
            <label>
              <span style={{ display: "block", fontSize: "0.875rem" }}>From</span>
              <input
                type="date"
                name="startDate"
                value={filters.startDate ?? ""}
                onChange={handleDateChange}
              />
            </label>
            <label>
              <span style={{ display: "block", fontSize: "0.875rem" }}>To</span>
              <input type="date" name="endDate" value={filters.endDate ?? ""} onChange={handleDateChange} />
            </label>
          </div>
        )}
      </fieldset>

      <fieldset style={{ border: "none", padding: 0 }}>
        <legend style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Categories</legend>
        {availableCategories.length === 0 ? (
          <p style={{ fontSize: "0.875rem", color: "#64748b" }}>No categories yet. Sessions will populate this list.</p>
        ) : (
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {availableCategories.map((category) => (
              <label key={category} style={{ textTransform: "capitalize" }}>
                <input
                  type="checkbox"
                  value={category}
                  checked={filters.categories.includes(category)}
                  onChange={handleCategoryChange}
                />
                <span style={{ marginLeft: "0.25rem" }}>{category}</span>
              </label>
            ))}
          </div>
        )}
      </fieldset>
    </section>
  );
};
=======
interface SessionFiltersProps {
  category: string;
  from: string;
  to: string;
  categories: string[];
  onChange: (filters: { category: string; from: string; to: string }) => void;
}

const SessionFilters = ({ category, from, to, categories, onChange }: SessionFiltersProps) => (
  <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
    <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">Filters</h2>
    <div className="mt-3 grid gap-3 md:grid-cols-3">
      <label className="text-sm text-slate-600 dark:text-slate-200">
        Category
        <select
          value={category}
          onChange={(event) => onChange({ category: event.target.value, from, to })}
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
        >
          <option value="all">All</option>
          {categories.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm text-slate-600 dark:text-slate-200">
        From
        <input
          type="date"
          value={from}
          onChange={(event) => onChange({ category, from: event.target.value, to })}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
        />
      </label>
      <label className="text-sm text-slate-600 dark:text-slate-200">
        To
        <input
          type="date"
          value={to}
          onChange={(event) => onChange({ category, from, to: event.target.value })}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
        />
      </label>
    </div>
  </div>
);
>>>>>>> theirs

export default SessionFilters;
