import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../../src/App';

describe('Export sessions', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('returns a JSON array with expected keys', async () => {
    render(<App />);
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime.bind(vi) });

    await user.click(screen.getByRole('button', { name: /start/i }));
    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    await user.click(screen.getByRole('button', { name: /stop/i }));
    await user.click(await screen.findByRole('button', { name: /save session/i }));

    const settingsLink = screen.getAllByRole('link', { name: /settings/i })[0];
    await user.click(settingsLink);

    const exportButton = screen.getByRole('button', { name: /export json/i });
    await user.click(exportButton);

    const preview = await screen.findByText((content) => content.includes('"category"'), {
      selector: 'pre',
    });

    const data = JSON.parse(preview.textContent ?? '[]');
    expect(Array.isArray(data)).toBe(true);
    expect(data[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        start: expect.any(String),
        end: expect.any(String),
        durationMs: expect.any(Number),
        category: expect.any(String),
      })
    );
  });
});
