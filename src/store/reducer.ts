import { combineReducers } from "redux";
import { RootState } from "./interfaces";
import { worklogsReducer } from "./worklog";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/es/storage";
import { PersistConfig } from "redux-persist/es/types";
import { persistReducer } from "redux-persist";

const persistConfig: PersistConfig<RootState> = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['worklogs'],
};

export const rootReducer = combineReducers<RootState>({
    worklogs: worklogsReducer,
});

export default persistReducer<RootState>(persistConfig, rootReducer);