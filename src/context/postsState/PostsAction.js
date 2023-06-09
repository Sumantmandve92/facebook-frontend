import { LOADING_FAILURE, LOADING_START, LOADING_SUCCESS } from "../ActionType";

export const postFetchingStarts = () => ({
    type: LOADING_START
})
export const postFetchingSuccess = (posts) => ({
    type: LOADING_SUCCESS,
    payload: posts
})
export const postFetchingFailure = (error) => ({
    type: LOADING_FAILURE,
    payload: error
})
export const addPost=(post)=>({
    type:"ADD_POST",
    payload:post
})
