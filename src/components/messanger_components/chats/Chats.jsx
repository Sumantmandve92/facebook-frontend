import React, { useContext, useEffect, useState } from 'react';
import './chats.css';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { AuthContext } from '../../../context/loginState/AuthContext';
import Channel from '../channel/Channel';
// =============================for box opened to get new user=============

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getChannel } from '../../../API-Messanger-globle-states';
import { ChannelContext } from '../../../context/channelState/channelReducer';


/**
 * 
 */
const Chats = () => {
    const { user } = useContext(AuthContext);
    const {channel,channeldispatch}=useContext(ChannelContext);
    const [channels, setChannels] = useState([]);
    const [open, setOpen] = useState(false);
    const [email,setEmail]=useState("");
    useEffect(() => {
        function getAllChannels() {
            const url = "http://localhost:8080/api/chat/myChannelList";
            axios.post(url, { userId: user._id })
                .then((res) => {
                    setChannels(res.data);
                    console.log(res.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        getAllChannels()
    }, [])
    // ===========================================for add new friend==============================
  
  const   createNewChannel=()=>{
    if(email){
        getChannel(email,user._id,channeldispatch)
    }
  }
  useEffect(() => {
  if(channel){
    let count=0;
    for (let index = 0; index < channels.length; index++) {
        if(channels[index]._id===channel._id){
            count++;
        }
     
        
    }
    if(!count){

        setChannels([...channels,channel]);
    }
  }
  }, [channel])
   
    return (
        <>
            <div className="chats">
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', overflowY: "scroll" }} >
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar >
                            <AddIcon sx={{ bgcolor: 'blue', borderRadius: "50%", color: "white", fontSize: "35px" }} />
                        </ListItemAvatar>
                        <ListItemAvatar>
                            <h5> Create new group</h5>
                        </ListItemAvatar>
                        {/* <ListItemText
                            primary="Create New Group"
                           
                        /> */}
                    </ListItem>
                    <ListItem alignItems="flex-start" onClick={()=>setOpen(true)}>
                        <ListItemAvatar >
                            <AddIcon sx={{ bgcolor: 'blue', borderRadius: "50%", color: "white", fontSize: "35px" }} />
                        </ListItemAvatar>
                        <ListItemAvatar>
                            <h5> Add new chat</h5>
                        </ListItemAvatar>

                    </ListItem>
                    <Dialog open={open} onClose={()=>setOpen(false)}>
                        <DialogTitle>Add to Contact</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                              Ask your friend for his/her email-Id registered on this app
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="standard"
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>setOpen(false)}>Cancel</Button>
                            <Button onClick={()=>{
                              createNewChannel();
setOpen(false);
                            }
                                
                                }>save</Button>
                        </DialogActions>
                    </Dialog>



                    {
                        channels && channels.map((channel) => <Channel key={channel._id} channel={channel} />)
                    }


                </List>
            </div>
        </>
    );
}


// #endregion

export default Chats;