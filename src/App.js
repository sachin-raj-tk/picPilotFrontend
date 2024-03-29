import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import OtpVerification from "./components/OtpVerification/OtpVerification.jsx";
import Auth from "./pages/Auth/Auth";
import Chat from "./pages/Chat/Chat";
import { Home } from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import AdminPage from "./pages/AdiminPage/AdminPage.jsx"
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";
function App() {
  const user = useSelector((state) => state.authReducer.authData);
  const admin = user?.user.isAdmin?true:false
 

  return (
    <div className="App">
      <>
        <div className="blur" style={{ top: "-18%", right: "0" }}></div>
        <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          
          <Route
            path="/"
            element={admin && user ? <Navigate to="/admin" />:user && !admin?<Navigate to="home" /> : <Navigate to="auth" />}
          />
          <Route
            path="/home"
            element={admin && user ? <Navigate to="/admin" />:user && !admin ? <Home /> : <Navigate to="../auth" />}
          />
          <Route
            path="/auth"
            element={user ? <Navigate to="../home" /> : <Auth />}
          />
          <Route
            path="/profile/:id"
            element={user ? <Profile /> : <Navigate to="../auth" />}
          />
          <Route
            path="/chat"
            element={user ? <Chat /> : <Navigate to="../auth" />}
          />
          <Route
            path="/otpverification"
            element={user ? <Navigate to="../home" /> : <OtpVerification />}
          />
          <Route path="/admin" element={admin && user?<AdminPage/>:<Navigate to="../auth"/>}/>
        </Routes>
      </>
      
    </div>
  );
}

export default App;
