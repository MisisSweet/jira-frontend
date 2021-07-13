import { SwaggerService } from "../../services/generated-api";
import { worklogActions, WorklogActions } from "./actions";
import { Dispatch } from 'redux';

export const worklogApi = {
    getAll: () => async (
        dispatch: Dispatch<WorklogActions>,
    ) => {
        const response = await SwaggerService.getSwaggerService({
    });
    dispatch(worklogActions.setWorklog(response));
    },
}