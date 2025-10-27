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

export default SessionFilters;
