export const generatePast14Days = (): string[] => {
  const dates: Date[] = [];
  const today = new Date();

  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date);
  }

  const formattedDates = dates.map((date) => date.toISOString().split('T')[0]);

  return formattedDates.reverse();
};
