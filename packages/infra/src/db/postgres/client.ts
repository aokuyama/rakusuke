import postgres from "postgres";

let client: postgres.Sql | null = null;

export const getClient = (): postgres.Sql => {
  if (!client) {
    if (!process.env.DATABASE_URL) {
      throw new Error("undefined DATABASE_URL");
    }
    client = postgres(process.env.DATABASE_URL);
  }
  return client;
};
