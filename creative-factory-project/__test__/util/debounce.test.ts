import { debounce } from '@/app/util/debounce';
import '@testing-library/jest-dom';

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should delay function execution', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn();
    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(999);
    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
