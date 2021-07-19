import { Author } from "./author";
import { Comments } from "./comment";

export type Worklogs={
    id?: number;
    timeSpent: string;
    author: Author;
    created: string;
    comment: Comments;
    project: string;
}