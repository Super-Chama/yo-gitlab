import { envObj } from "./env.ts";
import { glClient } from "./gitlab.ts";
import { summerizeChain } from "./ai.ts";
import { MergeRequestPayload } from "./types.ts";

const getLatestNote = async (
  projectId: number,
  mergeReqId: number,
  username: string
) => {
  const notes = await glClient.MergeRequestNotes.all(projectId, mergeReqId, {
    perPage: 20,
  });
  return (
    notes.filter((v) => !v.system && v.author.username === username)[0] ?? null
  );
};

const getLatestDiff = async (projectId: number, mergeReqId: number) => {
  const diff = await glClient.MergeRequests.allDiffs(projectId, mergeReqId, {
    maxPages: 5,
  });
  return JSON.stringify(diff);
};

const getDiffSummary = async (diff: string) => {
  const result = await summerizeChain.call({ diff });
  return `:dizzy: **AI Summary** :dizzy:\n\n` + result.text;
};

const handle = async (payload: MergeRequestPayload) => {
  if (!payload.labels.find((v) => v.title === "AI")) {
    return console.info(`AI label not found in MR, skipping...`);
  }

  if (
    payload.object_attributes.action === "open" ||
    payload.object_attributes.action === "update"
  ) {
    const [diff, note] = await Promise.all([
      getLatestDiff(payload.project.id, payload.object_attributes.iid),
      getLatestNote(
        payload.project.id,
        payload.object_attributes.iid,
        envObj.GITLAB_USERNAME
      ),
    ]);

    const diffSummary = await getDiffSummary(diff);

    if (note) {
      await glClient.MergeRequestNotes.edit(
        payload.project.id,
        payload.object_attributes.iid,
        note.id,
        {
          body: diffSummary,
          showExpanded: true,
        }
      );
    } else {
      await glClient.MergeRequestNotes.create(
        payload.project.id,
        payload.object_attributes.iid,
        diffSummary,
        { showExpanded: true }
      );
    }
  } else {
    console.info(
      `Unknown MR action ${payload.object_attributes.action}, skipping...`
    );
  }
};

export { handle };
