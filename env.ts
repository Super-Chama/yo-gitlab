import { load } from "https://deno.land/std@0.208.0/dotenv/mod.ts";

const env = await load();

export const envObj = {
  GITLAB_HOST: env["GITLAB_HOST"],
  GITLAB_TOKEN: env["GITLAB_TOKEN"],
  OPENAI_API_KEY: env["OPENAI_API_KEY"],
  GITLAB_USERNAME: env["GITLAB_USERNAME"],
  GITLAB_WEBHOOK_TOKEN: env["GITLAB_WEBHOOK_TOKEN"],
} as const;
