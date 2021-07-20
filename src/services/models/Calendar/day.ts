import { TypeDay } from "../../data/typeDay";
import { Worklogs } from "../Worklog/worklog";

export type Day = {
    type: TypeDay,
    day: Date,
    timeSpent: string,
    worklog: Array<Worklogs>
}