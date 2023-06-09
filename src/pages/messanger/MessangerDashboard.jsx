import React, { useContext, useEffect, useReducer, useState } from 'react';
import Chats from '../../components/messanger_components/chats/Chats';
import Chatroom from '../../components/messanger_components/chatroom/Chatroom';
import './messangerDashboard.css';
import { ChannelContext } from '../../context/channelState/channelReducer';
import { MessageContextProvider } from '../../context/messageState/MessageContext';

/**
 * 
 */
const MessangerDashboard = () => {
    const { channel } = useContext(ChannelContext);
    useEffect(() => {
        console.log(channel)
    }, [channel])

    return (
        <>
            <div className="messanger">
                <div className="messanger-container">
                    <MessageContextProvider>

                    <Chats />
                    {
                        !channel ? <div className="default-chatroom">
                            <h1 className='default-message'>Facebook</h1>
                        </div> : <Chatroom />
                    }
                    </MessageContextProvider>

                </div>
            </div>
        </>
    );
}

// #endregion

export default MessangerDashboard;