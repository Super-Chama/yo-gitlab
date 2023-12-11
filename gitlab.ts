import { envObj } from "./env.ts";
import { Gitlab } from "https://esm.sh/@gitbeaker/rest@39.26.0?dts";

const client = new Gitlab({
  host: envObj.GITLAB_HOST,
  token: envObj.GITLAB_TOKEN,
});

export { client as glClient };
