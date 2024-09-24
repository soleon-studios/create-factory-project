import { generatePast14Days } from '@/app/api/currency/historical/helper';

describe('generatePast14Days', () => {
  const mockDate = new Date('2024-09-24T12:00:00Z');
  const realDate = Date;

  beforeAll(() => {
    global.Date = class extends Date {
      constructor() {
        super();
        return mockDate;
      }
    } as DateConstructor;
  });

  afterAll(() => {
    global.Date = realDate;
  });

  it('should generate an array of 14 dates', () => {
    const result = generatePast14Days();
    expect(result).toHaveLength(14);
  });

  it('should format dates as YYYY-MM-DD', () => {
    const result = generatePast14Days();
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    result.forEach((date) => {
      expect(date).toMatch(dateRegex);
    });
  });
});
