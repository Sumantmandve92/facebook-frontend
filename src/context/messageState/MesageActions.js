import { SENDING_MESSAGE, SENDING_MESSAGE_FAILED, SENT_MESSAGE } from "./ActionTypes";

export const sendingMessage=()=>({
type:SENDING_MESSAGE
})
export const messageSent=(message)=>({
type:SENT_MESSAGE,
payload:message
})
export const sendingMessageFailed=(error)=>({
type:SENDING_MESSAGE_FAILED,
payload:error
})