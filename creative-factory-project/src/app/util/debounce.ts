/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = <T extends (...args: any[]) => Promise<any>>(
  func: T,
  delay: number = 1000
): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let pendingPromise: Promise<ReturnType<T>> | null = null;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    clearTimeout(timeoutId);

    if (!pendingPromise) {
      pendingPromise = new Promise<ReturnType<T>>((resolve, reject) => {
        timeoutId = setTimeout(async () => {
          try {
            const result = await func(...args);
            resolve(result);
          } catch (error) {
            reject(error);
          } finally {
            pendingPromise = null;
          }
        }, delay);
      });
    }

    return pendingPromise;
  };
};
