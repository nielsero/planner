import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  DATABASE_URL: z.string().url(),
  API_BASE_URL: z.string().url(),
  WEB_BASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3333),
  EMAIL_USER: z.string().email().optional(),
  EMAIL_PASS: z.string().optional(),
});

export const env = envSchema.parse(process.env);
