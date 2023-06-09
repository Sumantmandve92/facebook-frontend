import axios from "axios";
import { addMessage, channelFetchingFailure, channelFetchingStart, channelFetchingSuccess } from "./context/channelState/ChannelActions"
import { messageSent, sendingMessage, sendingMessageFailed } from "./context/messageState/MesageActions";

export const getChannel = (friendId, myId, channeldispatch) => {
    if (friendId !== myId) {
        try {
            channeldispatch(channelFetchingStart());
            const url = `http://localhost:8080/api/chat/createChannel/${friendId}`
            axios.post(url, { userId: myId })
                .then((res) => {
                    channeldispatch(channelFetchingSuccess(res.data))
                    console.log(res.data);

                })
                .catch((error) => {
                    channeldispatch(channelFetchingFailure(error))
                    console.log("error=>"+error);
                })
        } catch (error) {
            console.log(error);
        }
    }
    else {
        alert("you can not chat with yourself")
    }
}
export const getMessagesOfThisChannel = (channelId, channeldispatch) => {
    try {
        channeldispatch(channelFetchingStart());
        const url = `http://localhost:8080/api/chat/getMessages`
        axios.post(url, { channelId: channelId })
            .then((res) => {
                channeldispatch(channelFetchingSuccess(res.data));
                console.log(res.data);
            })
            .catch((error) => {
                channeldispatch(channelFetchingFailure(error));
            })
    } catch (error) {
        console.log(error)

    }

}
export const sendMyMessage = (channelId, message, messagedispatch,channeldispatch,io,friendId) => {
    try {
        const url = `http://localhost:8080/api/chat/sendMessage/${channelId}`;
        messagedispatch(sendingMessage());
        axios.post(url, message)
            .then((res) => {
                // res.data=> sent message
                messagedispatch(messageSent(res.data))
                
                channeldispatch(addMessage(res.data))
                io.emit("sendMessage", {
             
                    receiverId:friendId,
                    message:res.data
                })
                console.log(res.data);
            })
            .catch((error) => {
                messagedispatch(sendingMessageFailed(error))
                console.log(error)
            })
    } catch (error) {
        console.log(error);
    }
}