import {  EmojiExpressionlessFill, GeoAltFill, ImageFill,  TagFill } from 'react-bootstrap-icons';
import './share.css';
import { Button } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from '../../context/loginState/AuthContext';
import Picker from 'emoji-picker-react';
import { PostsContext } from '../../context/postsState/PostsContext';
import { addPost } from '../../context/postsState/PostsAction';
/**
 * 
 */
const Share = () => {
    const { user } = useContext(AuthContext);
    const {posts,postdispatch} =useContext(PostsContext);
    const text = useRef();
    const [file, setFile] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    useEffect(() => {
    console.log(file)
    }, [file])

    async function shareYourPost(e) 
    {
        e.preventDefault();
        console.log(file);

        const newPost = {
            userId: user._id,
            desc: text.current.value
        }
        if (file) {
            // make object of that file with its name
            console.log(file);

            try {
                const filename = Date.now() + file.name;
                let data = new FormData();
                // make unique name so that no ambiguity between file name for different users
                data.append("name", filename);
                data.append("file", file);

                newPost.img = filename;
                console.log(data.get("file"))
                // now upload this file to server then only name of this file is uploaded into DB
                const url = "http://localhost:8080/api/post/saveFile";

                const result = await axios.post(url, data);
                console.log(result);


            } catch (error) {
                console.log(error);
            }
        }
        // noe upload post data i.e. desc and file name 
      

            try {
                const url = "http://localhost:8080/api/post/uploadPost";
                axios.post(url, newPost)
                    .then((res) => {
                        console.log(res.data);
                        // concatNewPost(res.data);
                        postdispatch(addPost(res.data))
                        text.current.value = "";
                        setFile(null);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } catch (error) {
                console.log(error)
            
        }

    }
    // ======================================================================
    const pickEmoji = (event, emojiObj) => {
        text.current.value += event.emoji;
    }


    return (
        <>
            <div className="share">
                <div className="share-container">
                    <div className="share-top">
                        <img src="/assets/img/profilePic.jpg" alt="" className="share-profilePic" />
                        <input type="textarea" placeholder="what is in your mind ?"  className='share-input' ref={text} />
                    </div>
                    <hr />
                    {
                        file && (
                            <div className="img-preview">
                                <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                                <CloseIcon className='cancel-img-button' onClick={()=>setFile(null)}/>
                            </div>
                        )
                    }
                    <form className="share-bottom" onSubmit={shareYourPost}>
                        <div className="share-options">
                            <label htmlFor='file' className="share-option">
                                <ImageFill color="tomato" className='share-icon' />
                                <span className="share-name">media</span>
                                <input style={{ display: "none" }} type="file" id='file' accept='.png,.jpeg,.jpg' onChange={(e) => setFile(e.target.files[0])} />
                            </label>

                            <div className="share-option">
                                <TagFill color='blue' className='share-icon' />
                                <span className="share-name">Tag</span>
                            </div>
                            <div className="share-option">
                                <GeoAltFill color='green' className='share-icon' />
                                <span className="share-name">Location</span>
                            </div>
                            <div className="share-option" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                                <EmojiExpressionlessFill color='goldenrod' className='share-icon' />
                                <span className="share-name">Feelings</span>
                            </div>
                        </div>
                        <Button className='share-button' type='submit' >Share</Button>
                    </form>
                    {
                        showEmojiPicker && <Picker onEmojiClick={pickEmoji} />
                    }
                </div>
            </div>
        </>
    );
}



export default Share;