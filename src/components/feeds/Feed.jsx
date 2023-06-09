import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/loginState/AuthContext';
import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css'
import axios from 'axios';
import { getUsersPosts } from '../../API-globle-state';
import { PostsContext } from '../../context/postsState/PostsContext';
import { ProfileContext } from '../../context/profileState/ProfileContext';

/**
 * 
 */
const Feed = () => {
    const { user } = useContext(AuthContext);
const {profile}=useContext(ProfileContext);
    const { posts, isFetchingPosts, postdispatch } = useContext(PostsContext);
    // =========================================================================
    useEffect(() => {

        getUsersPosts(user._id, postdispatch);


    }, [user])




    return (
        <>
            <div className="feed">
                {
                    !profile &&  <Share />
                }
               
                {
                    posts.map((post) => (


                        <Post key={post._id} post={post} />

                    ))
                }
            </div>
        </>
    );
}

// #endregion

export default Feed;