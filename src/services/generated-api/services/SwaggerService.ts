/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class SwaggerService {

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static async getSwaggerService({
email,
password,
}: {
email?: string,
password?: string,
}): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/api/Swagger/GetWorklog`,
            headers: {
                'email': email,
                'password': password,
            },
        });
        return result.body;
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static async postSwaggerService({
email,
password,
timeSpent,
comment,
}: {
email?: string,
password?: string,
timeSpent?: string,
comment?: string,
}): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/api/Swagger/AddWorklog`,
            headers: {
                'email': email,
                'password': password,
            },
            query: {
                'timeSpent': timeSpent,
                'comment': comment,
            },
        });
        return result.body;
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static async deleteSwaggerService({
idworklog,
email,
password,
}: {
idworklog: number,
email?: string,
password?: string,
}): Promise<any> {
        const result = await __request({
            method: 'DELETE',
            path: `/api/Swagger/DeleteLoan/${idworklog}`,
            headers: {
                'email': email,
                'password': password,
            },
        });
        return result.body;
    }

}