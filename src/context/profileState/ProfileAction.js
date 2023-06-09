import { LOADING_FAILURE, LOADING_START, LOADING_SUCCESS } from "../ActionType";

export const profileFetchingStarts = () => ({
    type: LOADING_START
})
export const profileFetchingSuccess = (profile) => ({
    type: LOADING_SUCCESS,
    payload: profile

})
export const profileFetchingFailure = (error) => ({
    type: LOADING_FAILURE,
    payload: error
})