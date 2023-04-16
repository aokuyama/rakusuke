import crypto from "crypto";

const seed = "abcdefghijklmnopqrstuvwxyz0123456789";
const length = 32;

export const createEventPath = (): string =>
  Array.from(crypto.randomBytes(length))
    .map((n) => seed[n % seed.length])
    .join("");
