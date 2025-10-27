import Navigation from './Navigation';

const Sidebar = () => (
  <aside className="hidden w-64 flex-shrink-0 border-r border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900 md:block">
    <Navigation />
  </aside>
);

export default Sidebar;
