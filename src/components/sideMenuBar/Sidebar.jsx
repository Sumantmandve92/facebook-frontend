import './sidebar.css';
import { BagFill, BookmarkFill, Calendar2Fill, ChatLeftTextFill, MortarboardFill, PersonFillAdd, PlayCircleFill, QuestionCircleFill, RssFill } from 'react-bootstrap-icons';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/loginState/AuthContext';
import { useState } from 'react';
import axios from 'axios';
import { profileFetchingSuccess } from '../../context/profileState/ProfileAction';
import { getUsersPosts } from '../../API-globle-state';
import Avatar from '@mui/material/Avatar';
import { ProfileContext } from '../../context/profileState/ProfileContext';
import { PostsContext } from '../../context/postsState/PostsContext';
import { NavLink, Link, useNavigate } from 'react-router-dom'
/**
 * 
 */
const Sidebar = () => {
    const { user } = useContext(AuthContext);
    const [followings, setFollowings] = useState([]);
    const { profile, profileDispatch } = useContext(ProfileContext);
    const { postdispatch } = useContext(PostsContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const navigate=useNavigate();
    useEffect(() => {
        function getFollowingUsers() {
            const url = `http://localhost:8080/api/users/followingUsers/${user._id}`
            axios.get(url)
                .then((res) => {
                    console.log(res.data)
                    setFollowings(res.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        getFollowingUsers();

    }, [user])
    // ==========================================================================================
    const getFriendProfile = (friendId) => {
        console.log(friendId);
        const url = `http://localhost:8080/api/profile/${friendId}`;
        axios.post(url, { userId: user._id })
            .then((res) => {
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <div className="sidebar-left">
                <div className="sidebar-container">
                    <div className="sidebarMenuList">
                        <Link className="sidebarItem" onClick={() => {
                            profileDispatch(profileFetchingSuccess(null));
                            getUsersPosts(user._id, postdispatch)
                        }} >
                            <RssFill className='sidebarIcon' />
                            <span className='sidebar-icon-name'>Feed</span>
                        </Link>
                        <NavLink className="sidebarItem" to={"messanger"}>
                            <ChatLeftTextFill className='sidebarIcon' />
                            <span className='sidebar-icon-name'>Chats</span>
                        </NavLink>
                        <NavLink className="sidebarItem">
                            <PlayCircleFill className='sidebarIcon' />
                            <span className='sidebar-icon-name'>Videos</span>
                        </NavLink>
                        <NavLink className="sidebarItem">
                            <PersonFillAdd className='sidebarIcon' />
                            <span className='sidebar-icon-name'>Groups</span>
                        </NavLink>
                        <NavLink className="sidebarItem">
                            <BookmarkFill className='sidebarIcon' />
                            <span className='sidebar-icon-name'>Saved</span>
                        </NavLink>
                        {/* <NavLink className="sidebarItem">
                            <QuestionCircleFill className='sidebarIcon' />
                            <span className='sidebar-icon-name'>Questions</span>
                        </NavLink>
                        <NavLink className="sidebarItem">
                            <BagFill className='sidebarIcon' />
                            <span className='sidebar-icon-name'>Jobs</span>
                        </NavLink>
                        <NavLink className="sidebarItem">
                            <Calendar2Fill className='sidebarIcon' />
                            <span className='sidebar-icon-name'>Events</span>
                        </NavLink>
                        <NavLink className="sidebarItem">
                            <MortarboardFill className='sidebarIcon' />
                            <span className='sidebar-icon-name'>Courses</span>
                        </NavLink> */}
                    </div>
                    <hr />
                    <Link className='followings-heading'><b>My Followings</b> </Link>
                    <hr/>
                    <div className="sidebarFriendList">
                        {
                            followings.map((followingUser) => (
                                <div className="sidebarFriend" key={followingUser._id} onClick={() => getFriendProfile(followingUser._id)}>
                                    {
                                        followingUser.profilePic ? <img src={`${PF}` + followingUser.profilePic} alt="" className='sidebarFriend-img' /> :
                                            <Avatar sx={{ width: 60, height: 60 }}>{followingUser.username[0].toUpperCase()}</Avatar>
                                    }
                                    <span className='sidebarFriend-name'>{followingUser.username}</span>
                                </div>
                            ))
                        }


                    </div>
                </div>

            </div>
        </>
    );
}


export default Sidebar;