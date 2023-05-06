import crypto from "crypto";

const seed = "abcdefghijklmnopqrstuvwxyz0123456789";

export const createToken = (length: number): string =>
  Array.from(crypto.randomBytes(length))
    .map((n) => seed[n % seed.length])
    .join("");

export const makeHash = (value: string, pepper: string): string => {
  const sha256 = crypto.createHash("sha256");
  sha256.update(value + pepper);
  return sha256.digest("hex");
};
