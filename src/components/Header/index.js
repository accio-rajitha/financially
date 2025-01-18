import React, { useEffect } from 'react';
import './styles.css';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import userImg from "../../assets/user.svg";

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const logoutFnc = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out: " + error.message);
    }
  };

  return (
    <div className="navbar">
      <p className="logo">Financely.</p>
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img
            src={user.photoURL || userImg} 
            alt="User Avatar"
            width="32"
            height="32"
            style={{ borderRadius: "50%" }}
          />
          <p className="logo link" onClick={logoutFnc}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
}

export default Header;
/*

import React, { useEffect } from 'react'
import './styles.css'
import {auth} from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import userImg from "../../assets/user.svg"

function Header()  {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(()=>{
      if(user){
        navigate("/dashboard");
      }
    }, [user, loading]);
    function logoutFnc(){
        try{
            signOut(auth)
            .then(()=>{
               toast.success("Logged out successfully!");
               navigate("/");
            })
        } catch (error) {

            toast.error(error.message);
        }
    }
  return (
    <div className='navbar'>
        <p className='logo'>Financely.</p>
        {user && (
          <div style={{display:"flex", alignItems:"center",gap:"0.75rem"}}>
            <img src={user.photoURL?user.photoURL : userImg} width="2rem" height="2rem" style={{borderRadius:"50%"}} />
            <p  className='logo link' onClick={logoutFnc}>Logout</p>
          </div>
        )}
        
    </div>
);
}

export default Header;
*/