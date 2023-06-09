export const nullToUndefined = <T>(v: T | null): T | undefined =>
  v === null ? undefined : v;

export const undefinedToNull = <T>(v: T | undefined): T | null =>
  v === undefined ? null : v;

export const emptyToNull = (v: string | undefined): string | null | undefined =>
  v === null || v === undefined ? v : v.length === 0 ? null : v;
