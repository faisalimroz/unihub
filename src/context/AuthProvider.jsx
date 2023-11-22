import  { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import {app} from '../Firebase/firebase.config';
// import axios from 'axios';
export const AuthContext= createContext();
const auth =getAuth(app)
// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
   const [loading,setLoading]=useState()
   const createUser =(email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password)
}
const signIn =(email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
}
const updateUser =(userInfo)=>{
    return updateProfile(auth.currentUser,userInfo)
}
   
const logOut =()=>{
    return signOut(auth);
}
const verifyEmail=()=>{
    return  sendEmailVerification(auth.currentUser)
    

  }
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,currentUser=>{
        setUser(currentUser);
        console.log('current user',currentUser)
        setLoading(false)
       })
       return ()=>{
        return unsubscribe()
       }
   })
   
   
const authInfo={
  user,
  loading,
  createUser,
  updateUser,
  signIn,
  verifyEmail,
  logOut
}
    return (
       <AuthContext.Provider value={authInfo}>
           {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;