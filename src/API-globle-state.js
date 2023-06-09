import axios from 'axios';
import { LOADING_START } from './context/ActionType';
import { LoginFailure, LoginStart, LoginSuccess } from './context/loginState/AuthActions';
import { postFetchingFailure, postFetchingStarts, postFetchingSuccess } from './context/postsState/PostsAction';
import { profileFetchingFailure, profileFetchingStarts, profileFetchingSuccess } from './context/profileState/ProfileAction';
// =======================================================================================
export const loginAPI = async (userCredential, dispatch) => {
    dispatch(LoginStart());
    const url = "http://localhost:8080/api/auth/loginuser"
    await axios.post(url, userCredential)
        .then((res) => {
            console.log(res);
            dispatch(LoginSuccess(res.data))
        })
        .catch((error) => {
            console.log(error)
            dispatch(LoginFailure(error))
        })

}
// ======================================================================================
export const getUsersPosts = (userId, postdispatch) => {

    postdispatch(postFetchingStarts())
    const url = "http://localhost:8080/api/post"
    axios.post(url, { userId: userId })
        .then((res) => {
            postdispatch(postFetchingSuccess(res.data))

            console.log(res.data);
        })
        .catch((error) => {
            postdispatch(postFetchingFailure(error))
            console.log(error);
        })
}
export const getOnlyUsersPosts = (userId, postdispatch) => {

    postdispatch(postFetchingStarts())
    const url = "http://localhost:8080/api/post/getMyPosts"
    axios.post(url, { userId: userId })
        .then((res) => {
            postdispatch(postFetchingSuccess(res.data))

            console.log(res.data);
        })
        .catch((error) => {
            postdispatch(postFetchingFailure(error))
            console.log(error);
        })
}
// ========================================================================================
export const getMyProfile = (profileDispatch, id, userId) => {
    profileDispatch({ type: LOADING_START });
    const url = `http://localhost:8080/api/profile/${id}`;
    axios.post(url, { userId })
        .then((res) => {
            profileDispatch(profileFetchingSuccess(res.data.profile));

            console.log(res.data)
        })
        .catch((error) => {
            profileDispatch(profileFetchingFailure(error));
            console.log(error);
        })
}
//   ==================================================================================
export const deletePost = (currentUserId, post, postdispatch) => {
    try {
        if (currentUserId === post.userId) {
            console.log(currentUserId)
           
            const url = `http://localhost:8080/api/post/deletePost/${post._id}`;
            axios.post(url, { userId: currentUserId })
                .then((res) => {
                    postdispatch({ type: "DELETE_POST", payload: post });
                    console.log(res.data);
                    alert(res.data);
                })
                .catch((error) => {
                    postdispatch(postFetchingFailure(error))
                    console.log(error);
                })
        }
        else{
            alert("You can delete your own posts only .!")
        }
    } catch (error) {

    }

}