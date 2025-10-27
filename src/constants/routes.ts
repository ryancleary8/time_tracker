<<<<<<< ours
/**
 * Route keys for the application's navigation structure.
 */
export const ROUTES = {
  root: "/",
  dashboard: "/dashboard",
  timer: "/timer",
  timesheet: "/timesheet",
  settings: "/settings",
=======
export const ROUTES = {
  TIMER: { path: '/', label: 'Timer' },
  SESSIONS: { path: '/sessions', label: 'Sessions' },
  TIMESHEET: { path: '/timesheet', label: 'Timesheet' },
  SETTINGS: { path: '/settings', label: 'Settings' }
>>>>>>> theirs
} as const;

export type RouteKey = keyof typeof ROUTES;
