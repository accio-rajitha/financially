import React, { useState } from 'react';
import './styles.css';
import Input from '../Input';
import  Button  from '../Button';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {auth, db} from '../../firebase';
import { toast } from "react-toastify";
import {doc, getDoc, setDoc} from 'firebase/firestore';
import {useNavigate } from "react-router-dom";



function  SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider(); 
  function signupWithEmail(){
    setLoading(true);
    console.log("Name", name);
    console.log("Email", email );
    console.log("Password", password);
    console.log("ConfirmPassword", confirmPassword);
    //Authenticate the user, or basically create a new account using email and password
    
    if(name!="" && email!="" && password!="" && confirmPassword!=""){
      if(password === confirmPassword){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          console.log("user>>>", user);
          toast.success("User Created!");
          setLoading(false); 
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          createDoc(user);
          
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error:", errorMessage);
          toast.error(errorMessage);
          setLoading(false); 
        });
      } else{
         toast.error("Password and Confirm Password don't match!");
         setLoading(false);
      }
    }else{
       toast.error("All fields are mandatory!");
       setLoading(false);
    }
   
  }
  function loginUsingEmail(){
    console.log("Email", email);
    console.log("Password", password);
    setLoading(true);
    if(email!="" && password!=""){
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        toast.success("User Logged In!");
        console.log("User Logged in", user);
        createDoc(user);
        setLoading(false);
        navigate("/dashboard");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        toast.error("errorMessage");
      });
    }else{
      toast.error("All fields are mandatory!")
      setLoading(false);
    }

  }
  
  

 async function createDoc(user){
    setLoading(true);
    if(!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if(!userData.exists()){
      try{
        await setDoc(doc(db, "users" , user.uid), {
          name : user.displayName ? user.displayName : name,
          email: user.email,
          photoURL : user.photoURL ? user.photoURL : "",
          createdAt : new Date(),
        });
        toast.success("Doc created!");
        setLoading(false);
      } catch (e){
        toast.error(e.message);
        setLoading(false);
      }
    }else{
      toast.error("Doc already exists");
      setLoading(false);
    }
  }
  function googleAuth(){
    setLoading(true);
    try{
      signInWithPopup(auth, provider)
      .then((result) => {
       // This gives you a Google Access Token. You can use it to access the Google API.
       const credential = GoogleAuthProvider.credentialFromResult(result);
       const token = credential.accessToken;
       // The signed-in user info.
       const user = result.user;
       console.log("user>>>", user)
       createDoc(user);
       setLoading(false);
       navigate("/dashboard");
       toast.success("User Authenticated!")
       // IdP data available using getAdditionalUserInfo(result)
       // ...
       }).catch((error) => {
       // Handle Errors here.
       setLoading(false);
       const errorCode = error.code;
       const errorMessage = error.message;
       toast.error(errorMessage);
   });
    }catch (e){
      setLoading(false);
      toast.error(e.message)
    }
    
  }
  return (
    <>
    {loginForm ? (
      <div className='sinup-wrapper'>
      <h2 className='title'>Login On <span style={{color:"var(--theme)"}}>Financely.</span> </h2>
    <form>
    <Input
         type = "email"
         label = {"Email"}
         state = {email}
         setState = {setEmail}
         placeholder = {"John@gmail.com"}
      />
      <Input
         type="password"
         label = {"Password"}
         state = {password}
         setState = {setPassword}
         placeholder = {"Example@123"}
      />
       <Button 
      disabled = {Loading}
      text={Loading? "Loading ...": "Login Using Email and Password"}  onClick={loginUsingEmail}/>
      <p className='p-login'>or</p>
      <Button onClick={googleAuth} text={Loading? "Loading ...":"Login Using Google"} blue={true} />
      <p className='p-login' style={{cursor:"pointer"}} onClick={() => setLoginForm(!loginForm)}>Or Don't Have An Account? Click Here</p>
      
      
    </form>
    </div>
    ):(
    <div className='sinup-wrapper'>
      <h2 className='title'>Sign Up On <span style={{color:"var(--theme)"}}>Financely.</span> </h2>
    <form>
      <Input
         label = {"Full Name"}
         state = {name}
         setState = {setName}
         placeholder = {"John Doe"}
      />
      <Input
         type = "email"
         label = {"Email"}
         state = {email}
         setState = {setEmail}
         placeholder = {"John@gmail.com"}
      />
      <Input
         type="password"
         label = {"Password"}
         state = {password}
         setState = {setPassword}
         placeholder = {"Example@123"}
      />
      <Input
         type="password"
         label = {"Confirm Password"}
         state = {confirmPassword}
         setState = {setConfirmPassword}
         placeholder = {"Example@123"}
      />
      <Button 
      disabled = {Loading}
      text={Loading? "Loading ...": "Signup Using Email and Password"}  onClick={signupWithEmail}/>
      <p className='p-login'>or</p>
      <Button  onClick={googleAuth} text={Loading? "Loading ...":"Signup Using Google"} blue={true} />
      <p className='p-login' style={{cursor:"pointer"}} onClick={() => setLoginForm(!loginForm)}>Or Don't Have An Account? Click Here</p>
    </form>
      
    </div>
   )}
    </>
  );
}

export default  SignupSigninComponent;
