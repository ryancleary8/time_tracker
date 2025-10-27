export interface Session {
  id: string;
  title: string;
  description?: string;
  startedAt: string;
  endedAt?: string | null;
}

export type SessionId = Session['id'];

export type CreateSessionInput = Omit<Session, 'id'>;

export type UpdateSessionInput = Partial<Omit<Session, 'id'>>;
