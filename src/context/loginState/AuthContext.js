import { createContext, useReducer } from 'react';
import { AuthReducer } from './AuthReducer';

const INITIAL_STATE = {
    user: null,
    isFetching: false,
    error: ''
}

export const AuthContext = createContext(INITIAL_STATE);


// make provider to wrap whole application 
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    return (
        <AuthContext.Provider value={{ user: state.user, isFetching: state.isFetching, error: state.error, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}