import { Worklogs } from "../../services/models/Worklog/worklog";
import {ActionsTypes} from '../index'

export const worklogActions={
    setWorklog:(worklogs: Worklogs[])=>({
        type: 'worklogs/SET_WORKLOGS',
        payload: worklogs,
    } as const)
};

export type WorklogActions = ActionsTypes<typeof worklogActions>;