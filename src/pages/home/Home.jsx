import { useEffect, useState } from 'react';
import Feed from '../../components/feeds/Feed';
import Navbar from '../../components/navbar/Navbar';
import Rightbar from '../../components/rightSidebar/Rightbar';
import Sidebar from '../../components/sideMenuBar/Sidebar';
import UserProfile from '../../components/userProfile/UserProfile';
import './home.css';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/loginState/AuthContext';
import { PostsContextProvider } from '../../context/postsState/PostsContext'
import { ProfileContext } from '../../context/profileState/ProfileContext';

import { Routes, Route } from 'react-router-dom'
/**
 * 
 */
const Home = () => {

  const { profile } = useContext(ProfileContext);
  const [posts, setPosts] = useState([]);
  // ==================================================

  useEffect(() => {


    const getMyPosts = () => {
      const url = `http://localhost:8080/api/post/getMyPosts`;
      profile && axios.post(url, { userId: profile.userId })
        .then((res) => {
          setPosts(res.data);
          console.log(res.data)
        })
        .catch((error) => {
          console.log(error);
        })
    }
    getMyPosts();
  }, [profile])

  return (
    <>

      

        <div className="home-container">




          <Sidebar />
          <Feed />
          {
            profile ? <UserProfile profile={profile} /> : <Rightbar />
          }

        </div>
     

    </>
  );
}


// #endregion

export default Home;