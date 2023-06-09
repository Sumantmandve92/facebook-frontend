import { LOADING_FAILURE, LOADING_START, LOADING_SUCCESS } from "../ActionType";

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case LOADING_START: 
            return {
                user: null,
                isFetching: true,
                error: ''
            }
        
        case LOADING_SUCCESS: 
            return {
                user: action.payload,
                isFetching: false,
                error: ''
            }
        
        case LOADING_FAILURE: 
            return {
                user: null,
                isFetching: false,
                error: action.payload
            }
        
        default:
            return state;
    }
}
