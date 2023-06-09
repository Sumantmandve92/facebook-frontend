import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import {io} from 'socket.io-client'
import './chatroom.css';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Divider from '@mui/material/Divider';
import { AuthContext } from '../../../context/loginState/AuthContext';
import { CHANNEL_INITIAL_STATE, ChannelContext, channelReducer } from '../../../context/channelState/channelReducer';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import EmojiPicker from 'emoji-picker-react';
import MicNoneIcon from '@mui/icons-material/MicNone';
import SendIcon from '@mui/icons-material/Send';
// for emoji picker box 

import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import axios from 'axios';
import CallIcon from '@mui/icons-material/Call';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { sendMyMessage } from '../../../API-Messanger-globle-states';
import { MessageContext } from '../../../context/messageState/MessageContext';
import { addMessage } from '../../../context/channelState/ChannelActions';

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}
/**
 * 
 */

const Chatroom = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { channel ,channeldispatch} = useContext(ChannelContext);
    const { user } = useContext(AuthContext);
    const { messagedispatch } = useContext(MessageContext);
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [messages, setMessages] = useState([]);
    const [friend,setFriend] =useState(null);
    const [textMessage, setTextMessage] = useState("");
    const [showEmojiContainer, setShowEmojiContainer] = useState(false);
    const socket=useRef();
    // ====================================================
    useEffect(() => {
        // find another chanel user to give channel name by that user name
        console.log(channel)
        if (channel) {

            channel.channelUsers.map(channelUser => {
                if (channelUser._id !== user._id) {
                    setName(channelUser.name);
                    setProfilePic(channelUser.profilePic);
                    setFriend(channelUser);
                }
            });
            console.log(channel.messages);
            setMessages(channel.messages)
            console.log(messages);
        }
        console.log("channel rendered")
    }, [channel])

    

    // =============================for emiji picker==================================
    const [open, setOpen] = React.useState(false);
    const addtoTextMessage = (event, emojiobj) => {
        setTextMessage(textMessage + event.emoji);
    }
    // ===================================send message=====================================
    const sendMessage = () => {
        if (textMessage) {
            const newMessage = {
                messageType: "TEXT",
                message: textMessage,
                senderId: user._id
            }
            sendMyMessage(channel._id, newMessage, messagedispatch,channeldispatch ,socket.current,friend._id);
            
        }
    }
    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        // this will send msg to all users that you are online on server when you logged in
        socket.current.emit("addUser", user._id)
        // you will get all users that are online as you logged in
        socket.current.on("getUsers", users => {
            console.log(users);
        })
    }, [])
    useEffect(()=>{
      
        socket.current.on("getMessage",(data)=>{
            console.log(data.message)
            channeldispatch(addMessage(data.message))
        })
    },[socket])
  
    return (
        <>
            <div className="chatroom">

                {
                    <div className="chatmessages-container">
                        <div className="chat-header">
                            <div className="chat-header-left">


                                <ListItem alignItems="flex-start" sx={{ width: "100%" }}>
                                    <ListItemAvatar>
                                        {
                                            profilePic ? <img src={`${PF}` + profilePic} alt="" className='profilePic' /> :
                                                <Avatar sx={{ width: 32, height: 32 }}>{name.toUpperCase()[0]}</Avatar>
                                        }
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${name}`}
                                        secondary={" last seen"}
                                    />
                                </ListItem>
                            </div>
                            <div className="chat-header-right">

                                <div className="header-right-icons">
                                    <VideocamOutlinedIcon />
                                    <CallIcon />
                                    <Divider orientation="vertical" flexItem />
                                    <SearchIcon />
                                </div>
                            </div>
                        </div>
                        <hr className='hr-line' />
                        <div className="room">
                            <div className="room-container">
                                {
                                  channel.messages &&  channel.messages.map((message) => {
                                     return   <div className={message.senderId === user._id ? "my-message-container" : "friend-message-container"}>

                                            <div className={message.senderId === user._id ? "my-message" : "friend-message"}>
                                               <div className=""> {message.message}</div>
                                            <div className="time">07.12 am</div>
                                            </div>
                                        </div>
                                    })
                                }

                            </div>
                        </div>

                        <div className="input-container">
                            <SentimentSatisfiedAltIcon onClick={() => setOpen(true)} />
                            <Dialog
                                open={open}
                                onClose={() => setOpen(false)}
                                PaperComponent={PaperComponent}
                                aria-labelledby="draggable-dialog-title"
                            >
                                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                    <EmojiPicker className="emoji-picker" onEmojiClick={addtoTextMessage} />
                                </DialogTitle>

                                <DialogActions>
                                    <Button autoFocus onClick={() => setOpen(false)}>
                                        Cancel
                                    </Button>

                                </DialogActions>
                            </Dialog>
                            <AttachFileIcon />
                            <input type="text" placeholder='Type your message' required className='message-input' value={textMessage} onChange={(e) => setTextMessage(e.target.value)} />
                            <SendIcon className='send-button' onClick={sendMessage} />
                            {/* <MicNoneIcon /> */}


                        </div>
                    </div>

                }

            </div>
        </>
    );
}



export default Chatroom;