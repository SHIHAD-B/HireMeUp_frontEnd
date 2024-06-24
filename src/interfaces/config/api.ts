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
        if (route !== 'auth/logout') {

            await axios.post(`${BASE_URL}auth/refreshToken`, {}, { withCredentials: true }).then((res)=>{
                console.log(res,"res from refresh token")
            })
        }
        return response.data.user
    } catch (error: any) {
        const axiosError = error as AxiosError<ApiError>
        return handleError(axiosError, rejectWithValue)
    }
}