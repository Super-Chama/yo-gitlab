import { envObj } from "./env.ts";
import { glClient } from "./gitlab.ts";
import { MergeRequestPayload } from "./types.ts";

const getLastNote = async (
  projectId: number,
  mergeReqId: number,
  username: string
) => {
  const notes = await glClient.MergeRequestNotes.all(projectId, mergeReqId, {
    perPage: 20,
  });
  return notes.filter((v) => !v.system && v.author.username === username)[0] ?? null;
};

const handle = async (payload: MergeRequestPayload) => {
  if (
    payload.object_attributes.action === "open" ||
    payload.object_attributes.action === "update"
  ) {
    const lastNote = await getLastNote(
      payload.project.id,
      payload.object_attributes.iid,
      envObj.GITLAB_USERNAME
    );

    if (lastNote) {
      await glClient.MergeRequestNotes.edit(
        payload.project.id,
        payload.object_attributes.iid,
        lastNote.id,
        {
          body: "its a new note!",
          showExpanded: true,
        }
      );
    } else {
      await glClient.MergeRequestNotes.create(
        payload.project.id,
        payload.object_attributes.iid,
        "hello world note!",
        { showExpanded: true }
      );
    }
  }
};

export { handle };
