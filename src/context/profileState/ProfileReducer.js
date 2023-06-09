import { LOADING_FAILURE, LOADING_START, LOADING_SUCCESS } from "../ActionType";

export const profileReducer=(state,action)=>{
    switch (action.type) {
        case LOADING_START:
            return {
                profile:null,
                isFetchingProfile:true,
                error:null
                
            }
        case LOADING_SUCCESS:
            return {
                profile:action.payload,
                isFetchingProfile:false,
                error:null
            }
        case LOADING_FAILURE:
            return {
                profile:null,
                isFetchingProfile:false,
                error:action.payload
            }
         
    
        default:
            return state;
    }
}