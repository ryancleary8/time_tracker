import { useState } from 'react';
import ThemeToggle from '../components/Settings/ThemeToggle';
import { useSessions } from '../context/SessionContext';

const SettingsPage = () => {
  const { categories, defaultCategory, setDefaultCategory, exportSessions } = useSessions();
  const [exportPreview, setExportPreview] = useState('');

  return (
    <div className="space-y-6">
      <ThemeToggle />
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Default Category</h2>
        <p className="text-sm text-slate-500 dark:text-slate-300">
          Choose the category that will be selected when starting a timer.
        </p>
        <select
          value={defaultCategory}
          onChange={(event) => setDefaultCategory(event.target.value)}
          className="mt-3 w-full max-w-xs rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Export Sessions</h2>
          <button
            type="button"
            onClick={() => setExportPreview(exportSessions())}
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Export JSON
          </button>
        </div>
        {exportPreview && (
          <pre className="mt-3 max-h-64 overflow-y-auto rounded bg-slate-900/80 p-3 text-xs text-primary-100">
            {exportPreview}
          </pre>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
