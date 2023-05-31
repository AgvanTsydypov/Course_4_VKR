import {TOKEN_PAIR_KEY} from "./Consts";
import jwt_decode from "jwt-decode";


export enum RegistrationRole {
    Student, Teacher, Parent, Manager, Unknown
}


export const getTokenPair: () => TokenPairType | null = () => {
    const tokenPair: string | null = localStorage.getItem(TOKEN_PAIR_KEY)
    if (typeof tokenPair === "string") {
        return JSON.parse(tokenPair)
    }
    return null
}

export const setTokenPair: (pair: TokenPairType) => void = (pair) => {
    localStorage.setItem(TOKEN_PAIR_KEY, JSON.stringify(pair))
}

export const getRegistrationRole: () => RegistrationRole = () => {
    const authTokens = getTokenPair()
    if (authTokens !== null) {
        const user = jwt_decode(authTokens.accessToken)

        // @ts-ignore
        if (user.role === 0) {
            return RegistrationRole.Student
        }
        // @ts-ignore
        else if (user.role === 1) {
            return RegistrationRole.Teacher
        }
        // @ts-ignore
        else if (user.role === 2) {
            return RegistrationRole.Parent
        }
        // @ts-ignore
        else if (user.role === 3) {
            return RegistrationRole.Manager
        }
        // @ts-ignore
        else {
            return RegistrationRole.Unknown
        }
    }
    return RegistrationRole.Unknown
}

export interface TokenPairType {
    accessToken: string,
    refreshToken: string
}
