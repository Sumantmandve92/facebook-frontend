import { createContext, useReducer } from "react"
import { messageReducer } from "./MessageReducer";

const MESSAGE_INITIAL_STATE={
    isSending:false,
    message:null,
    error:null
}



export const MessageContext=createContext(MESSAGE_INITIAL_STATE);


export const MessageContextProvider=({children})=>{
    const [state,messagedispatch]=useReducer(messageReducer,MESSAGE_INITIAL_STATE);
    return (
        <MessageContext.Provider value={{message:state.message,isSending:state.isSending,error:state.error,messagedispatch}}>
            {children}
        </MessageContext.Provider>
   )
}