import { createContext, useReducer } from "react"
import { profileReducer } from "./ProfileReducer";



const PROFILE_INITIAL_STATE = {
    profile: null,
    isFetchingProfile: false,
    profileError: null
}


// create store in context
export const ProfileContext = createContext(PROFILE_INITIAL_STATE);

// create provider to fetch and update that states 


export const ProfileContextProvider = ({ children }) => {
    const [state, profileDispatch] = useReducer(profileReducer, PROFILE_INITIAL_STATE);
    return (

        <ProfileContext.Provider value={{ profile: state.profile, isFetchingProfile: state.isFetchingProfile, profileError: state.profileError, profileDispatch }}>
            {children}
        </ProfileContext.Provider>
    )
}
