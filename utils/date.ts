export function extractDate(time: Date) {
  const date = new Date(time);
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  return { day, month, year };
};