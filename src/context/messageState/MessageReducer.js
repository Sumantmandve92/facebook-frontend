import { SENDING_MESSAGE, SENDING_MESSAGE_FAILED, SENT_MESSAGE } from "./ActionTypes";

export const messageReducer=(state,action)=>{
    switch (action.type) {
        case SENDING_MESSAGE:
           return {
            isSending:true,
            message:null,
            error:null
           }
        case SENT_MESSAGE:
           return {
            isSending:false,
            message:action.payload,
            error:null
           }
        case SENDING_MESSAGE_FAILED:
           return {
            isSending:false,
            message:null,
            error:action.payload
           }
    
        default:
            return state;
    }
}