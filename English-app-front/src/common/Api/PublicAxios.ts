import axios from "axios";
import {baseURL} from "../../config";

export const publicAxios = axios.create({
    baseURL,
});
