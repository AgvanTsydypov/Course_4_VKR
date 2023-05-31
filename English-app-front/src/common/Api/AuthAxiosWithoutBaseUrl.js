import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import {TOKEN_PAIR_KEY} from "../Auth/Consts";
import {getTokenPair} from "../Auth/LocalStorageService";
import {baseURL} from "../../config";

let authTokens = getTokenPair()

const authAxiosWithoutBaseUrl = axios.create({
    headers:{Authorization: `Bearer ${authTokens?.accessToken}`}
});

authAxiosWithoutBaseUrl.interceptors.request.use(async req => {
    authTokens = getTokenPair()
    req.headers.Authorization = `Bearer ${authTokens?.accessToken}`

    const user = jwt_decode(authTokens.accessToken)
    const dayDiff = dayjs.unix(user.exp).diff(dayjs());
    const isExpired = dayDiff < 1;


    if(!isExpired) return req

    const response = await axios.post(`${baseURL}authApi/refresh`, {
        refreshToken: authTokens.refreshToken
    });

    localStorage.setItem(TOKEN_PAIR_KEY, JSON.stringify(response.data.data))
    req.headers.Authorization = `Bearer ${response.data.data.accessToken}`
    return req
})


export default authAxiosWithoutBaseUrl;
