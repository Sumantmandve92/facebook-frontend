
import { LOADING_FAILURE, LOADING_START, LOADING_SUCCESS } from "../ActionType";

export const postsReducer = (state, action) => {
    switch (action.type) {
        case LOADING_START:
            return {
                posts: [],
                isFetchingPosts: false,
                postsError: null
            }
        case LOADING_SUCCESS:
            return {
                posts: sortPostByTime(action.payload),
                isFetchingPosts: false,
                postsError: null
            }
        case LOADING_FAILURE:
            return {
                posts: [],
                isFetchingPosts: false,
                postsError: action.payload
            }
        case "ADD_POST":
            return {
                posts: sortPostByTime([...state.posts, action.payload]),
                isFetchingPosts: false,
                postsError: null
            }
        case "DELETE_POST":
            return {
                posts: sortPostByTime(state.posts.filter((post)=>post._id!==action.payload._id)),
                isFetchingPosts: false,
                postsError: null
            }

        default:
            return state;
    }
}

// sort coming posts
const sortPostByTime = (randomPosts) => {
    return randomPosts.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
            return -1;
        }
        else {
            return 1;
        }
    })
}

