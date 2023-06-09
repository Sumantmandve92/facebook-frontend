import { LOADING_FAILURE, LOADING_START, LOADING_SUCCESS } from "../ActionType"

export const LoginStart = (userCredential) => ({
    type: LOADING_START
})
export const LoginSuccess = (user) => ({
    type: LOADING_SUCCESS,
    payload: user
})
export const LoginFailure = (error) => ({
    type: LOADING_FAILURE,
    payload: error
})