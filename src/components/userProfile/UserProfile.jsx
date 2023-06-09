import './userprofile.css'
import { Table } from 'react-bootstrap'
import { useContext, useEffect, useReducer } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/loginState/AuthContext';
import Avatar from '@mui/material/Avatar';
import { getMyProfile, getOnlyUsersPosts } from '../../API-globle-state';
import { ProfileContext } from '../../context/profileState/ProfileContext';
import { PostsContext } from '../../context/postsState/PostsContext';
import { LoginSuccess } from '../../context/loginState/AuthActions';
import EditIcon from '@mui/icons-material/Edit';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Tooltip from '@mui/material/Tooltip';
import { Link, useNavigate } from 'react-router-dom'
import ForumIcon from '@mui/icons-material/Forum';
import Button from '@mui/material/Button';
import { CHANNEL_INITIAL_STATE, ChannelContext, channelReducer } from '../../context/channelState/channelReducer';
import { getChannel } from '../../API-Messanger-globle-states';



/**
 * 
 */
const UserProfile = () => {
    const {channelstate, channeldispatch} = useContext(ChannelContext)
    const [friends, setFriends] = useState([]);
    const { user, dispatch } = useContext(AuthContext);
    const { profile, profileDispatch } = useContext(ProfileContext);
    const { postdispatch } = useContext(PostsContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const navigate=useNavigate();


    useEffect(() => {
        console.log(profile)
        if (profile.accountType === "public" || profile.userId === user._id) {

            function getFriendsOfThisUser() {
                const url = `http://localhost:8080/api/users/followingUsers/${profile.userId}`;
                axios.get(url)
                    .then((res) => {
                        console.log(res.data);
                        setFriends(res.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
            getFriendsOfThisUser();
            getOnlyUsersPosts(profile.userId, postdispatch)
        }


    }, [profile])

    const checkThisProfileuserIsYourFriend = () => {

        return user.followings.includes(profile.userId)
    }
    const followUnfollow = () => {
        const url = `http://localhost:8080/api/users/${profile.userId}/follow`;
        axios.put(url, { userId: user._id })
            .then((res) => {
                user.followings = res.data;
                console.log(res.data, user);
                getMyProfile(profileDispatch, profile.userId, user._id)
            })
            .catch((error) => {
                console.log(error);
            })

    }

    return (
        <>
            <div className="rightbar">
                <div className="profile-container">
                    <div className="img-container">

                        <img className='coverPic' src={profile.coverPic ? `${PF}` + profile.coverPic : "/assets/img/dubai.jpg"} alt="" />
                        <div className="profilePic-container">

                            <img className='profiePic' src={profile.profilePic ? `${PF}` + profile.profilePic : "/assets/img/profilePic.jpg"} alt="" />
                        </div>
                    </div>
                    <div className="personal-info">
                        <div className="personal-info-container">


                            <div className="edit-container">
                                <b className='personal-info-heading'>Personal Info :</b>
                                {
                                    profile.userId !== user._id ? <div className='follow-chat-buttons'>
                                      
                                        <Tooltip title="send message">

                                            <ForumIcon size='70px' onClick={() => {
                                                getChannel(profile.userId, user._id, channeldispatch);
navigate("/messanger");
                                            }} />
                                        </Tooltip>
                                      
                                        {

                                            checkThisProfileuserIsYourFriend() ?
                                                <Button variant="contained" size='sm' className='btn' onClick={followUnfollow}>Unfollow</Button>
                                                : <Button variant="contained" onClick={followUnfollow} className='btn' size='sm'>Follow</Button>

                                        }
                                    </div> :
                                        <div className='icons-right' >
                                            <Link to={"editProfile"}>
                                                <Tooltip title="Edit">
                                                    <EditIcon />
                                                </Tooltip>
                                            </Link>
                                            <Link to={"editProfile"}>
                                                <Tooltip title="Lock profile">
                                                    <LockPersonIcon />
                                                </Tooltip>
                                            </Link>
                                        </div>
                                }
                            </div>
                            <hr style={{ margin: "5px 0" }} />
                            <Table striped>
                                <tbody>
                                    {
                                        profile.username && <tr>
                                            <td>Name :</td>
                                            <td>{profile.username}</td>
                                        </tr>
                                    }
                                    {
                                        profile.dateOfBirth && <tr>
                                            <td>Date of Birth :</td>
                                            <td>{profile.dateOfBirth}</td>
                                        </tr>
                                    }
                                    {
                                        profile.relationships && <tr >
                                            <td>Marital status :</td>
                                            <td>{profile.relationships}</td>
                                        </tr>
                                    }
                                    {
                                        profile.desc && <tr >
                                            <td>Status :</td>
                                            <td>{profile.desc}</td>
                                        </tr>
                                    }
                                    {
                                        profile.city && <tr >
                                            <td>Lives in :</td>
                                            <td>{profile.city}</td>
                                        </tr>
                                    }
                                    {
                                        profile.from && <tr >
                                            <td>Birth place :</td>
                                            <td> {profile.from}</td>
                                        </tr>
                                    }
                                    {
                                        profile.education && <tr >
                                            <td>Education : </td>
                                            <td> {profile.education}</td>
                                        </tr>
                                    }
                                    {
                                        profile.profession && <tr>
                                            <td>Profession :</td>
                                            <td> {profile.profession}</td>
                                        </tr>
                                    }
                                </tbody>
                            </Table>
                            <b>Close Friends</b>
                            <hr style={{ margin: "5px 0" }} />

                            {friends ? <div className="friends">

                                {
                                    friends.map((friend) => (
                                        <div className="friend" key={friend._id} onClick={() => getMyProfile(profileDispatch, friend._id, user._id)}>
                                            <div className="friend-profile-container">
                                                {
                                                    friend.profilePic ? <img src={`${PF}` + friend.profilePic} alt="" className='friend-profilePicture' /> :

                                                        <Avatar sx={{ width: 60, height: 60 }}>{friend.username[0].toUpperCase()}</Avatar>
                                                }
                                            </div>
                                            <div className="friend-name">{friend.username}</div>
                                        </div>
                                    ))
                                }



                            </div>
                                : <p>New User</p>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}


// #endregion

export default UserProfile;