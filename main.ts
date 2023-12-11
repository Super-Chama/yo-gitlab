import { envObj } from "./env.ts";
import { GitlabEvents } from "./types.ts";
import { handle as handleMR } from "./merge.ts";
import { Hono, HTTPException } from "https://deno.land/x/hono@v3.11.4/mod.ts";

const app = new Hono();

app.use("*", async (c, next) => {
  const token = c.req.header("X-Gitlab-Token");
  if (!token || !envObj.GITLAB_WEBHOOK_TOKEN) {
    throw new HTTPException(401, { message: "Token not set" });
  }
  if (token !== envObj.GITLAB_WEBHOOK_TOKEN) {
    throw new HTTPException(401, { message: "Invalid token" });
  }
  await next();
});

app.post("/api/:project/event", async (c) => {
  const project = c.req.param("project").toLowerCase();
  console.info(`Invoke from ${project}`);
  const body = await c.req.json();
  const event = c.req.header("X-Gitlab-Event");

  switch (event) {
    case GitlabEvents.MergeRequestEvents:
      handleMR(body).then(()=> console.info(`${event} handled ok!`))
      break;

    default:
      console.info(`Unknown event ${event}. doing nothing!`);
      break;
  }

  return c.text("OK", 200);
});

Deno.serve(app.fetch);
