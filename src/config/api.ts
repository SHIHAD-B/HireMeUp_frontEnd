import axios, { AxiosError } from 'axios'
import { BASE_URL } from './constant'
import { ApiError, handleError } from './configuration'

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

export const reduxRequest = async (
    method: string,
    route: string,
    config: any,
    rejectWithValue: any,
    body?: any
) => {
    const requestConfig = {
        method,
        url: route,
        data: body,
        config
    }
    try {
        const response = await instance(requestConfig);
        return response.data.user
    } catch (error: any) {
        const axiosError = error as AxiosError<ApiError>
        return handleError(axiosError, rejectWithValue)
    }
}