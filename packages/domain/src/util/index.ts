export const notNull = <T>(item: T | null): item is T => item !== null;

export const arrayMax = (array: number[], min = 0) =>
  array.length ? Math.max.apply(null, array) : min;
