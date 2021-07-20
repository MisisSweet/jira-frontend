import { Author } from "./author";
import { Comments } from "./comment";

export type Worklogs={
    id?: number;
    author: Author;
    comment: Comments;
    created: Date,
    timeSpent: string;
    project: string;
}