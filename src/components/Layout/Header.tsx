import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const Header = () => (
  <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-700 dark:bg-slate-900">
    <NavLink to={ROUTES.TIMER.path} className="text-xl font-semibold text-primary-600 dark:text-primary-300">
      Time Tracker
    </NavLink>
    <div className="text-sm text-slate-500 dark:text-slate-300">Stay on top of your work</div>
  </header>
);

export default Header;
