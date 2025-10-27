/**
 * Route keys for the application's navigation structure.
 */
export const ROUTES = {
  root: "/",
  dashboard: "/dashboard",
  timer: "/timer",
  timesheet: "/timesheet",
  settings: "/settings",
} as const;

export type RouteKey = keyof typeof ROUTES;
