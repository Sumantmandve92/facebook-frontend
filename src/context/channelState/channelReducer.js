import { createContext, useReducer } from "react";
import { LOADING_CHANNEL_START, LOADING_CHANNEL_SUCCESS } from "./ActionType";

 const CHANNEL_INITIAL_STATE = {
    isFetchingChannel: false,
    channel: null,
    error: null,
}


export const channelReducer = (state, action) => {
    switch (action.type) {
        case LOADING_CHANNEL_START:
            return {
                channel: null,
                error: null,
                isFetchingChannel: true
            }
        case LOADING_CHANNEL_SUCCESS:
            return {
                error: null, 
                isFetchingChannel: false,
                channel: action.payload
            }
        case LOADING_CHANNEL_START:
            return {
                isFetchingChannel: false,
                channel: null,
                error: action.payload
            }
        case "ADD_MESSAGE":
            return {
                isFetchingChannel: false,
                channel: {...state.channel,messages:[...state.channel.messages,action.payload]},
                error: null
            }


        default:
            return state;
    }
}


export const ChannelContext = createContext(CHANNEL_INITIAL_STATE);


// make provider to wrap whole application 
export const ChannelContextProvider = ({ children }) => {
    const [state, channeldispatch] = useReducer(channelReducer, CHANNEL_INITIAL_STATE);
    return (
        <ChannelContext.Provider value={{ channel: state.channel, isFetchingChannel: state.isFetchingChannel, error: state.error, channeldispatch }}>
            {children}
        </ChannelContext.Provider>
    )
}