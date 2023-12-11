export type User = {
  id: number;
  name: string;
  email: string;
  username: string;
  avatar_url: string;
};

export type Assignee = Omit<User, "email">;
export type Reviewer = Omit<User, "email">;
export type Author = Pick<User, "name" | "email">;

export type Project = {
  id: number;
  url: string;
  name: string;
  web_url: string;
  ssh_url: string;
  http_url: string;
  homepage: string;
  namespace: string;
  avatar_url: string;
  git_ssh_url: string;
  description: string;
  git_http_url: string;
  default_branch: string;
  ci_config_path: string;
  visibility_level: number;
  path_with_namespace: string;
};

export type Repository = {
  url: string;
  name: string;
  homepage: string;
  description: string;
};

export type Commit = {
  id: string;
  url: string;
  title: string;
  author: Author;
  message: string;
  timestamp: string;
};

export type Label = {
  id: number;
  type: string;
  title: string;
  color: string;
  group_id: number;
  template: boolean;
  project_id: number;
  created_at: string;
  updated_at: string;
  description: string;
};

export type Changes = {
  draft: DraftState;
  labels: LabelCollection;
  updated_at: UpdatedState;
  last_edited_at: UpdatedState;
  updated_by_id: UpdatedIdState;
  last_edited_by_id: UpdatedIdState;
};

export type DraftState = {
  previous: boolean;
  current: boolean;
};

export type UpdatedState = {
  previous: string | null;
  current: string;
};

export type LabelCollection = {
  previous: Label[];
  current: Label[];
};

export type UpdatedIdState = {
  previous: number | null;
  current: number;
};

export type PushEventPayload = {
  object_kind: string;
  before: string;
  after: string;
  ref: string;
  checkout_sha: string;
  user_id: number;
  user_name: string;
  user_username: string;
  user_email: string;
  user_avatar: string;
  project_id: number;
  project: Project;
  repository: Repository;
  commits: Commit[];
  total_commits_count: number;
};

export type MergeRequestPayload = {
  user: User;
  labels: Label[];
  changes: Changes;
  project: Project;
  object_kind: string;
  repository: Repository;
  object_attributes: MergeRequestAttributes;
};

export type MergeRequestAction =
  | "open"
  | "close"
  | "reopen"
  | "update"
  | "approved"
  | "unapproved"
  | "approval"
  | "unapproval"
  | "merge";

export type MergeRequestAttributes = {
  id: number;
  iid: number;
  url: string;
  state: string;
  title: string;
  draft: boolean;
  labels: Label[];
  assignee: User;
  source: Project;
  target: Project;
  state_id: number;
  author_id: number;
  created_at: string;
  updated_at: string;
  assignee_id: number;
  description: string;
  last_commit: Commit;
  merge_status: string;
  target_branch: string;
  source_branch: string;
  reviewer_ids: number[];
  assignee_ids: number[];
  last_edited_at: string;
  total_time_spent: number;
  human_time_change: string;
  target_project_id: number;
  source_project_id: number;
  last_edited_by_id: number;
  work_in_progress: boolean;
  action: MergeRequestAction;
  human_time_estimate: string;
  milestone_id: number | null;
  first_contribution: boolean;
  detailed_merge_status: string;
  human_total_time_spent: string;
  blocking_discussions_resolved: boolean;
};

/**
 * https://github.com/go-playground/webhooks/blob/master/gitlab/gitlab.go
 */
const JobEvents = "Job Hook";
const PushEvents = "Push Hook";
const BuildEvents = "Build Hook";
const TagEvents = "Tag Push Hook";
const IssuesEvents = "Issue Hook";
const CommentEvents = "Note Hook";
const ReleaseEvents = "Release Hook";
const SystemHookEvents = "System Hook";
const PipelineEvents = "Pipeline Hook";
const WikiPageEvents = "Wiki Page Hook";
const DeploymentEvents = "Deployment Hook";
const MergeRequestEvents = "Merge Request Hook";
const ConfidentialIssuesEvents = "Confidential Issue Hook";
const ConfidentialCommentEvents = "Confidential Note Hook";

export const GitlabEvents = {
  JobEvents,
  TagEvents,
  PushEvents,
  BuildEvents,
  IssuesEvents,
  CommentEvents,
  ReleaseEvents,
  PipelineEvents,
  WikiPageEvents,
  SystemHookEvents,
  DeploymentEvents,
  MergeRequestEvents,
  ConfidentialIssuesEvents,
  ConfidentialCommentEvents,
} as const;
