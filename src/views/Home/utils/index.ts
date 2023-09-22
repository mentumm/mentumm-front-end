import getWeek from "date-fns/getWeek";

export const getCurrentFeatured = <T>(
  objects: T[],
  amount: number,
  weekOffset = 0
): T[] => {
  if (!objects.length) {
    return objects;
  }
  const total = objects.length;
  const sets = Math.ceil(total / amount);
  const week = getWeek(new Date()) + weekOffset;
  const endIndex = Math.min(((week % sets) + 1) * amount, total);
  const startIndex = endIndex - amount;
  return objects.slice(startIndex, endIndex);
};
