import { LOADING_CHANNEL_FAILURE, LOADING_CHANNEL_START, LOADING_CHANNEL_SUCCESS } from "./ActionType";

export const channelFetchingStart = () => ({
    type: LOADING_CHANNEL_START
})
export const channelFetchingSuccess = (channel) => ({
    type: LOADING_CHANNEL_SUCCESS,
    payload: channel
})
export const channelFetchingFailure = (error) => ({
    type: LOADING_CHANNEL_FAILURE,
    payload: error
})
export const addMessage = (message) => ({
    type: "ADD_MESSAGE",
    payload: message
})