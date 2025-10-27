import { useState } from 'react';
import type { Session } from '../../types';
import { formatDisplayDate } from '../../utils/time';

interface SessionFormProps {
  session: Session;
  categories: string[];
  onSave: (updates: { category: string; notes?: string }) => void;
  onClose: () => void;
}

const SessionForm = ({ session, categories, onSave, onClose }: SessionFormProps) => {
  const [category, setCategory] = useState(session.category);
  const [notes, setNotes] = useState(session.notes ?? '');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({ category, notes: notes.trim() ? notes : undefined });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"
    >
      <div className="w-full max-w-lg rounded-lg border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Categorize Session</h2>
          <button type="button" onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:text-slate-300">
            ×
          </button>
        </div>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
          {formatDisplayDate(session.start)} → {formatDisplayDate(session.end)}
        </p>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
            >
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Notes
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={3}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </label>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-200 px-4 py-2 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-200"
            >
              Cancel
            </button>
            <button type="submit" className="rounded-md bg-primary-600 px-4 py-2 text-sm text-white">
              Save Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionForm;
