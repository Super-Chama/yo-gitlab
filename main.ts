import { env } from "https://deno.land/x/hono@v3.11.4/helper.ts";
import { Hono, HTTPException } from "https://deno.land/x/hono@v3.11.4/mod.ts";

const app = new Hono();

app.use('*', async (c, next) => {
  const token = c.req.header("X-Gitlab-Token");
  const { GITLAB_WEBHOOK_TOKEN } = env<{ GITLAB_WEBHOOK_TOKEN: string }>(c);
  if (!token || token !== GITLAB_WEBHOOK_TOKEN) {
    throw new HTTPException(401, { message: "Invalid token" });
  }
  await next();
});

app.get("/api/:project/event", (c) => {
  const project = c.req.param("project").toLowerCase();
  console.info(`Invoke from ${project}`);
  return c.text("Ok");
});

Deno.serve(app.fetch);
