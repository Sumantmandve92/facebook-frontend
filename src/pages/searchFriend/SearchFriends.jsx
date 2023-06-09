import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { Fragment as div } from 'react'
import './searchFriends.css';
// ======================for a card======================

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import { AuthContext } from "../../context/loginState/AuthContext";
import { ProfileContext } from "../../context/profileState/ProfileContext";
import { getMyProfile, getUsersPosts } from "../../API-globle-state";
import { PostsContext } from "../../context/postsState/PostsContext";
import UserProfile from "../../components/userProfile/UserProfile";
import Feed from "../../components/feeds/Feed";

/**
 * 
 */
const SearchFriends = () => {

    const friendName = useParams();
    const [friends, setFriends] = useState([]);
    const [showProfile, setShowProfile] = useState(false);
    const { user } = useContext(AuthContext);
    const { profile, profileDispatch } = useContext(ProfileContext);
    const { postdispatch } = useContext(PostsContext);
    const navigate = useNavigate();

    useEffect(() => {

        if (friendName.username) {
            const url = `http://localhost:8080/api/users/searchFriends/${friendName.username}`;
            axios.get(url)
                .then((res) => {
                    console.log(res.data);
                    setFriends(res.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [friendName])

    useEffect(() => {

    }, [profile])
    const seeProfile = (friendId) => {

        getMyProfile(profileDispatch, friendId, user._id)
        getUsersPosts(friendId, postdispatch)
        setShowProfile(true);
    }

    return (
        <>
            <div className="allFriends">
                <div className="serachedResults">


                    {
                        friends.length > 0 ? friends.map((friend) => (
                            <div className="friend-card">
                             
                                    <div sx={{ fontSize: 14 }} color="text.secondary" >
                                        {friend.username}
                                    </div>
                                    <Button size="small" color="success"  onClick={() => seeProfile(friend._id)}>see profile</Button>
                                
                            </div>

                        ))
                            : <h1>No friend found ....</h1>
                    }
                </div>
                <div className="friendPosts">
                    {
                        showProfile && <Feed />
                    }
                </div>
                <div className="showProfile">
                    {
                        (profile && showProfile) && <UserProfile profile={profile} />
                    }

                </div>

            </div>

        </>
    );
}



export default SearchFriends;