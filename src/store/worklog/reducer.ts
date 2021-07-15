import { Worklogs } from "../../services/models/Worklog/worklog";
import { WorklogActions } from "./actions";
import { Reducer } from 'redux';
import produce, { Draft } from 'immer';

export type WorklogState = {
    worklogs: Worklogs[];
};

export const initialState: Readonly<WorklogState> = {
    worklogs: [],
};

export const worklogsReducer: Reducer<WorklogState, WorklogActions> = produce(
    (state: Draft<WorklogState>, action: WorklogActions) => {
    switch (action.type) {
        case 'worklogs/SET_WORKLOGS':
        state.worklogs = action.payload;
        break;
    }
    },
    initialState,
);