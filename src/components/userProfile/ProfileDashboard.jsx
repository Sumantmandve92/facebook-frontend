import { useEffect, useState } from "react";
import './profileDashboard.css'
import { useRef } from "react";
import { Button } from "react-bootstrap";
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from "react";
import { ProfileContext } from "../../context/profileState/ProfileContext";
import { AuthContext } from "../../context/loginState/AuthContext";
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { LoginSuccess } from "../../context/loginState/AuthActions";
/**
 *   
 */
const ProfileDashboard = () => {
    // ================================input states===========================================
    const city = useRef();
    const from = useRef();
    const education = useRef();
    const profession = useRef();
    const dateOfBirth = useRef();
    const relationships = useRef();
    const [profilePic, setProfilePic] = useState(null);
    const [coverPic, setCoverPic] = useState(null);
    const { profile } = useContext(ProfileContext);
    const { user ,dispatch} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    // ================================Methods========================================
    const saveProfile = (e) => {
        e.preventDefault();
        console.log({
            city: city.current.value,
            from: from.current.value,
            education: education.current.value,
            profession: profession.current.value,
            dateOfBirth: dateOfBirth.current.value,
            relationships: relationships.current.value
        })

    }

    useEffect(() => {
        console.log(profilePic);
        if(window.confirm("do you want to update profile/cover picture")){

            async function shareYourPost() {
              
        
        
                const updateImagesOfProfile = {
                    userId: user._id,
                  
                }
                if (profilePic ) {
                    // make object of that file with its name
                    try {
                        const filename = Date.now() + profilePic.name;
                        let data = new FormData();
                        // make unique name so that no ambiguity between file name for different users
                        data.append("name", filename);
                        data.append("file", profilePic);
        
                        updateImagesOfProfile.profilePic = filename;
                        // now upload this file to server then only name of this file is uploaded into DB
                        const url = "http://localhost:8080/api/post/saveFile";
        
                        const result = await axios.post(url, data);
                        console.log(result);
        
        
                    } catch (error) {
                        console.log(error);
                    }
                }
                if (coverPic ) {
                    // make object of that file with its name
                    try {
                        const filename = Date.now() + coverPic.name;
                        let data = new FormData();
                        // make unique name so that no ambiguity between file name for different users
                        data.append("name", filename);
                        data.append("file", coverPic);
        
                        updateImagesOfProfile.coverPic = filename;
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
                    const url = `http://localhost:8080/api/users/update/${profile.userId}`;
                    axios.put(url, updateImagesOfProfile)
                        .then((res) => {
                            console.log(res.data);

                            // res.data=>updated currentuser
                            dispatch(LoginSuccess(res.data))
                           
                            setProfilePic(null);
                            setCoverPic(null);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                } catch (error) {
                    console.log(error)
                }
        
            }
            shareYourPost();
        }
    
    }, [profilePic,coverPic])

    return (
        <>
            <div className="editProfile">
                <div className="editProfile-container">
                    <div className="image-container">


                        <label htmlFor="coverPic" className="coverPicture">
                            <img src={user.coverPic ? `${PF}`+user.coverPic : "/assets/img/coverPic.jpg"} alt="" className="previous-coverPic" />
                            <Tooltip title="Edit cover picture">

                                <EditIcon className="editIcon-coverPic" />

                            </Tooltip>
                            <input type="file" id="coverPic" 
                                onChange={(e) => setCoverPic(e.target.files[0])}
                                style={{ display: "none" }}
                            />
                        </label>


                        <label htmlFor="profilePic" className="profilePicture">
                            <img src={user.profilePic ? `${PF}`+ user.profilePic : "/assets/img/profilePic.jpg"} alt="" className="previous-profilePic" />
                            <Tooltip title="Edit profile picture">
                                <EditIcon className="editIcon-profilePic" />
                            </Tooltip>
                            <input type="file" id="profilePic" 
                                onChange={(e) => setProfilePic(e.target.files[0])}
                                style={{ display: "none" }}
                            />
                        </label>

                    </div>
                    <div className="form-container">
                        <h3>Edit Your Profile</h3>
                        <form onSubmit={saveProfile} className="profile-info-form">
                            <div className="profile-input-container">

                                <label >Birth City :</label>
                                <input className="profile-inputs" type="text" placeholder="Enter your birth place" ref={from} />
                            </div>
                            <div className="profile-input-container">

                                <label >Current City :</label>
                                <input className="profile-inputs" type="text" placeholder="Enter your current city" ref={city} />
                            </div>
                            <div className="profile-input-container">

                                <label > Education :</label>
                                <input className="profile-inputs" type="text" placeholder="Enter your last education" ref={education} />
                            </div>
                            <div className="profile-input-container">

                                <label > Profession :</label>
                                <input className="profile-inputs" type="text" placeholder="e.g. Student" ref={profession} />
                            </div>
                            <div className="profile-input-container">

                                <label > Relation :</label>
                                <input className="profile-inputs" type="text" placeholder="Married/unmarried" ref={relationships} />
                            </div>
                            <div className="profile-input-container">

                                <label > Date of birth :</label>
                                <input className="profile-inputs" type="date" placeholder="Date Of Birth" ref={dateOfBirth} />
                            </div>
                            <Button type="submit">Save and Submit</Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}


// #endregion

export default ProfileDashboard;