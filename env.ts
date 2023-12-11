// import { load } from "https://deno.land/std@0.208.0/dotenv/mod.ts";

// const env = await load({
//   allowEmptyValues: true,
// });

export const envObj = {
  GITLAB_HOST: Deno.env.get("GITLAB_HOST") || "",
  GITLAB_TOKEN: Deno.env.get("GITLAB_TOKEN") || "",
  OPENAI_API_KEY: Deno.env.get("OPENAI_API_KEY") || "",
  GITLAB_USERNAME: Deno.env.get("GITLAB_USERNAME") || "",
  GITLAB_WEBHOOK_TOKEN: Deno.env.get("GITLAB_WEBHOOK_TOKEN") || "",
} as const;
