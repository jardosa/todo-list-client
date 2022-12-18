import { PostStatus } from './../../generated/graphql';

export const PostKeyToValue: Record<PostStatus, string> = {
    [PostStatus.NotStarted]: "Not Started",
    [PostStatus.InProgress]: "In Progress",
    [PostStatus.Completed]: "Completed",
    [PostStatus.NotCompleted]: "Not Completed",
}