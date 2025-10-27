import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../../src/App';

describe('Timer flow', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('creates a session after starting and stopping the timer', async () => {
    render(<App />);
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime.bind(vi) });

    const startButton = screen.getByRole('button', { name: /start/i });
    await user.click(startButton);

    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    const stopButton = screen.getByRole('button', { name: /stop/i });
    await user.click(stopButton);

    expect(await screen.findByText(/categorize session/i)).toBeInTheDocument();

    const saveButton = screen.getByRole('button', { name: /save session/i });
    await user.click(saveButton);

    const sessionsLink = screen.getAllByRole('link', { name: /sessions/i })[0];
    await user.click(sessionsLink);

    expect(await screen.findByText(/development/i)).toBeInTheDocument();
  });
});
