export const nullToUndefined = <T>(v: T | null): T | undefined =>
  v === null ? undefined : v;
