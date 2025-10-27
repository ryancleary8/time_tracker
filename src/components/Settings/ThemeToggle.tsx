import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Theme</h2>
        <p className="text-sm text-slate-500 dark:text-slate-300">Switch between light and dark appearance.</p>
      </div>
      <button
        type="button"
        onClick={toggleTheme}
        className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white"
      >
        {theme === 'light' ? 'Enable Dark' : 'Enable Light'}
      </button>
    </div>
  );
};

export default ThemeToggle;
