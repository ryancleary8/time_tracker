export interface Session {
  id: string;
  start: string;
  end: string;
  durationMs: number;
  category: string;
  notes?: string;
}

export type ThemeMode = 'light' | 'dark';
