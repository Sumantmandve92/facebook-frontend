import { useContext } from "react";

import { AuthContext } from "./context/loginState/AuthContext";
import { ProfileContextProvider } from "./context/profileState/ProfileContext";

import Home from "./pages/home/Home";
import LandingPage from "./pages/landingPage/LandingPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from "./components/navbar/Navbar";
import { PostsContextProvider } from "./context/postsState/PostsContext";
import OutletDashboard from "./pages/home/OutletDashboard";
import ProfileDashboard from "./components/userProfile/ProfileDashboard";
import SearchFriends from "./pages/searchFriend/SearchFriends";
import MessangerDashboard from "./pages/messanger/MessangerDashboard";
import { ChannelContextProvider } from "./context/channelState/channelReducer";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div >
      <ProfileContextProvider>
        <PostsContextProvider>
          <ChannelContextProvider>

            <BrowserRouter>



              {
                user ? <>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<OutletDashboard />}>
                      <Route exact path="" element={<Home />} />
                      <Route path="editProfile" element={<ProfileDashboard />} />
                      <Route path="searchFriend/:username" element={<SearchFriends />} />
                      <Route path="/messanger" element={<MessangerDashboard />} />
                    </Route>
                  </Routes>

                </> :
                  <LandingPage />


              }



            </BrowserRouter>
          </ChannelContextProvider>
        </PostsContextProvider>
      </ProfileContextProvider>
    </div>
  );
}

export default App;
