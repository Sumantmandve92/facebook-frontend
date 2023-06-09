// create initial state

import { createContext, useReducer } from "react"
import { postsReducer } from "./PostsReducer";

const POSTS_INITIAL_STATE = {
    posts: [],
    isFetchingPosts: false,
    postsError: null
}
// create context store 

export const PostsContext = createContext(POSTS_INITIAL_STATE);


// create provider to wrap child components
export const PostsContextProvider = ({ children }) => {
    const [state, postdispatch] = useReducer(postsReducer, POSTS_INITIAL_STATE);
    return (
        <PostsContext.Provider value={{ posts: state.posts, isFetchingPosts: state.isFetchingPosts, postsError: state.postsError, postdispatch }}>
            {children}
        </PostsContext.Provider>
    )
}