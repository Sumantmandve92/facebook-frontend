import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useContext, useEffect, useReducer, useState } from 'react';
import { AuthContext } from '../../../context/loginState/AuthContext';
import { CHANNEL_INITIAL_STATE, ChannelContext, channelReducer } from '../../../context/channelState/channelReducer';
import { getMessagesOfThisChannel } from '../../../API-Messanger-globle-states';

/**
 * 
 */
const Channel = ({ channel }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const { channeldispatch } = useContext(ChannelContext);

    // ====================================================
    useEffect(() => {
        // find another chanel user to give channel name by that user name
        channel.channelUsers.map(channelUser => {
            if (channelUser._id !== user._id) {
                setName(channelUser.name);
                setProfilePic(channelUser.profilePic);
            }
        })
    }, [channel])


    // =========================================================
    return (
        <>
            <ListItem alignItems="flex-start" sx={{ width: "100%" }} onClick={()=>getMessagesOfThisChannel(channel._id,channeldispatch)}>
                <ListItemAvatar>
                    {

                    profilePic ? <img src={`${PF}` + profilePic} alt="" className='profilePic' /> :
                    <Avatar sx={{ width: 32, height: 32 }}>{name.toUpperCase()[0]}</Avatar>
                    }

                </ListItemAvatar>
                <ListItemText
                    primary={`${name}`}
                    secondary={" last message"}
                />
            </ListItem>



            <Divider variant="inset" component="li" />
        </>
    );
}


// #endregion

export default Channel;