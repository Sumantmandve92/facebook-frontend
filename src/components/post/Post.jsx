import { useState } from "react";
import { useEffect } from "react";
import { ChatLeftTextFill, HandThumbsUpFill, Heart, HeartFill, ThreeDotsVertical } from "react-bootstrap-icons";
import './post.css';
import axios from 'axios';

import { format } from 'timeago.js'
import { useContext } from "react";
import { AuthContext } from '../../context/loginState/AuthContext';
// ===================================for delete /edit post======================================

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Switch from '@mui/material/Switch';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { deletePost } from "../../API-globle-state";
import { PostsContext } from "../../context/postsState/PostsContext";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

/**
 * 
 */
const Post = ({ post }) => {
    const {postdispatch}=useContext(PostsContext)
    const {user}=useContext(AuthContext);
    // ============================for <Morevert/> icon=================================
    const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
        position: 'absolute',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
    }));

   

    const actions = [
        { icon: <EditIcon />, name: 'edit' },
        { icon: <BookmarkBorderIcon />, name: 'Save' },
        { icon: <DeleteOutlineIcon onClick={()=>deletePost(user._id,post,postdispatch)} />, name: 'delete' },
        { icon: <ShareIcon />, name: 'Share' },
    ];
    // =================================================================================

    const [postUsername, setPostUsername] = useState('');
    const [profilePic, setProfilePic] = useState('');
    // const [profilePic, setProfilePic] = useState(<PersonCircle />)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [isLiked, setIsLiked] = useState(false);
   
    // ========================================================================
    useEffect(() => {
        console.log(PF + post.img)
        async function getPostUser() {
            const url = `http://localhost:8080/api/users/${post.userId}`
            await axios.get(url)
                .then((res) => {
                    setPostUsername(res.data.username);
                    setProfilePic(res.data.profilePic);
                    console.log(res.data.username);
                })
                .catch((error) => {
                    console.log(error);
                })
        }



        getPostUser();
    }, [post])

    useEffect(() => {
        const checkIsLikedPost = () => {
            setIsLiked(post.likes.includes(user._id));
        }
        checkIsLikedPost();
    }, [])


    const likeUnlikePost = (num) => {
        const url = `http://localhost:8080/api/post/${post._id}/like`;
        axios.put(url, { userId: user._id })
            .then((res) => {
                console.log(res.data);
                if (res.data == 1) {
                    setIsLiked(true);
                    post.likes.push(user._id);
                }
                else {
                    post.likes.pop(user._id)
                    setIsLiked(false);
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }




    return (
        <>
            <div className="post">

                <div className="post-container">
                    <div className="post-topbar">
                        <div className="post-top-left">
                            {

                                profilePic ? <img src={`${PF}` + profilePic} alt="" className="postUser-profile-img" /> :
                                    <Avatar sx={{ width: 32, height: 32 }}>{postUsername.toUpperCase()[0]}</Avatar>
                            }


                            <span className="post-username">{postUsername}</span>
                            <span className="post-date">{format(post.createdAt)}</span>
                        </div>
                        <div className="post-top-right">

                            <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
                                <Box sx={{ position: 'relative', mt: 5, height: 60 }}>
                                    <StyledSpeedDial ariaLabel="SpeedDial playground example"
                                        icon={<ThreeDotsVertical className="vertical-dots" />}
                                        direction={"left"}>
                                        {actions.map((action) => (
                                            (post.userId !== user._id && action.name === "delete") ? <SpeedDialAction key={action.name} sx={{ display: "none" }} /> :
                                                <SpeedDialAction
                                                    key={action.name}
                                                    icon={action.icon}
                                                    tooltipTitle={action.name}
                                                />
                                        ))}
                                    </StyledSpeedDial>
                                </Box>
                            </Box>
                        </div>
                    </div>
                    <div className="post-centerbar">
                        <span className="post-text">{post.desc}</span>
                        <img src={`${PF}` + post.img} alt="" className="post-img" />
                    </div>
                    <div className="post-bottombar">
                        <div className="post-bottom-left">
                            <HandThumbsUpFill color="blue" />
                            {
                                isLiked ? <HeartFill color="red" onClick={() => likeUnlikePost(0)} /> : <Heart onClick={() => likeUnlikePost(1)} />
                            }
                            <span className="post-like-counter">{post.likes.length} likes</span>
                        </div>
                        <div className="post-bottom-right">
                            <ChatLeftTextFill color="goldenrod" />
                            <span className="post-comment-counter">9 comments
                            </span>

                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}



export default Post;