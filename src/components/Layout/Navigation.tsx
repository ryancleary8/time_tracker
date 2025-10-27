import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const Navigation = () => (
  <nav className="space-y-2">
    {Object.values(ROUTES).map((route) => (
      <NavLink
        key={route.path}
        to={route.path}
        className={({ isActive }) =>
          `block rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            isActive
              ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-100'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          }`
        }
      >
        {route.label}
      </NavLink>
    ))}
  </nav>
);

export default Navigation;
