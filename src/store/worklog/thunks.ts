import { SwaggerService } from "../../services/generated-api";
import { worklogActions, WorklogActions } from "./actions";
import { Dispatch } from 'redux';
import loacalStorageService from "../../services/local-storage";

export const worklogApi = {
    getAll: () => async (
        dispatch: Dispatch<WorklogActions>,
    ) => {
        const response = await SwaggerService.getSwaggerService({email: loacalStorageService.getEmail()!, password: loacalStorageService.getPassword()!});
    dispatch(worklogActions.setWorklog(response));
    },
}