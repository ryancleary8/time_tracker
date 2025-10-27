import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import SessionsPage from './pages/SessionsPage';
import SettingsPage from './pages/SettingsPage';
import TimerPage from './pages/TimerPage';
import TimesheetPage from './pages/TimesheetPage';

export const AppRouter = () => (
  <Routes>
    <Route path={ROUTES.TIMER.path} element={<TimerPage />} />
    <Route path={ROUTES.SESSIONS.path} element={<SessionsPage />} />
    <Route path={ROUTES.TIMESHEET.path} element={<TimesheetPage />} />
    <Route path={ROUTES.SETTINGS.path} element={<SettingsPage />} />
    <Route path="*" element={<Navigate to={ROUTES.TIMER.path} replace />} />
  </Routes>
);

export default AppRouter;
