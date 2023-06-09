import './navbar.css'
import {io} from 'socket.io-client'
import { BellFill, ChatLeftTextFill, Facebook, Messenger, PersonCheckFill, PersonFill, Search } from 'react-bootstrap-icons';
import { useContext, useState, Fragment, useEffect } from 'react';
import { AuthContext } from '../../context/loginState/AuthContext';
// =======================for user account menu====================================
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
// ============================================================
import axios from 'axios';
import { getMyProfile, getUsersPosts, gotoHomePage } from '../../API-globle-state';
import { ProfileContext } from '../../context/profileState/ProfileContext';
import { PostsContext } from '../../context/postsState/PostsContext';
import { profileFetchingSuccess } from '../../context/profileState/ProfileAction';
import { useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'


/**
 * 
 */
const Navbar = () => {
    const { user } = useContext(AuthContext);
    const { profileDispatch } = useContext(ProfileContext);
    const { postdispatch } = useContext(PostsContext);
    const searchtxt = useRef();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const navigate = useNavigate();
    const socket=useRef();
    // ====================================================
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // ====================================================
    const getProfileOfThisUser = () => {
        console.log(typeof profileDispatch)
        getMyProfile(profileDispatch, user._id, user._id);
        navigate("")
    }
    // ====================================================
    const searchFriend = () => {

    }
// ==========================for socket server connection=================================

    // ==========================================================
    return (
        <>
            <div className="navbar-container">
                <div className="navbar-left">
                    <NavLink to={"/"}>
                        <span className='logo' onClick={() => {
                            profileDispatch(profileFetchingSuccess(null));
                            getUsersPosts(user._id, postdispatch)
                            
                        }
                        }>
                            <Facebook className='facebook-logo' />
                            Facebook
                        </span>

                    </NavLink>
                </div>
                <div className="navbar-center">
                    <div className="serch-bar">
                        <Search className='search-icon' onClick={() =>
                         searchtxt.current.value &&   navigate(`searchFriend/${searchtxt.current.value}`)
                        } />
                        <input placeholder='Search your friends post' className='serch-input' ref={searchtxt} />
                    </div>
                </div>
                <div className="navbar-right">
                    <div className="navbar-links">

                        <span className="navbar-link">Homepage</span>
                        <span className="navbar-link">Timeline</span>
                    </div>
                    <div className="navbar-icons">
                        <div className="navbarIconItem">
                            <PersonFill className='notification-icons' />
                            <span className="navbarIconBadge">1</span>
                        </div>
                        <div className="navbarIconItem">
                            <ChatLeftTextFill className='notification-icons' />
                            <span className="navbarIconBadge">1</span>
                        </div>
                        <div className="navbarIconItem">
                            <BellFill className='notification-icons' />
                            <span className="navbarIconBadge">1</span>
                        </div>

                    </div>

                    <Fragment>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    {
                                        user.profilePic ? <img src={`${PF}` + user.profilePic} alt="" className='profilePic' /> :
                                            <Avatar sx={{ width: 32, height: 32 }}>{user.username[0].toUpperCase()}</Avatar>

                                    }
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1, },
                                    '&:before': {
                                        content: '""', display: 'block', position: 'absolute', top: 0, right: 14,
                                        width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={getProfileOfThisUser}>
                                {
                                    user.profilePic ? <img src={user.profilePic} alt="" className='profilePic' /> :
                                        <Avatar sx={{ width: 32, height: 32 }}>{user.username[0].toUpperCase()}</Avatar>
                                }
                                Profile
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                {
                                    user.profilePic ? <img src={user.profilePic} alt="" className='profilePic' /> :
                                        <Avatar sx={{ width: 32, height: 32 }}>{user.username[0].toUpperCase()}</Avatar>
                                }
                                My account
                            </MenuItem>
                            <Divider />

                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Fragment>
                </div>
            </div>

        </>
    );
}



export default Navbar;