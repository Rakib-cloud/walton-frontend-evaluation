import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_GRAPHQL_ENDPOINT: z
    .string()
    .url()
    .default("https://devapi.waltonplaza.com.bd/graphql"),
  NEXT_PUBLIC_APP_NAME: z.string().default("Walton Plaza"),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_GRAPHQL_ENDPOINT: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
});

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment configuration");
}

export const env = parsed.data;
