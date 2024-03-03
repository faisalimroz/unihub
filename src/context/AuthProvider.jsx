import  { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth,  updateProfile, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {app} from '../Firebase/firebase.config';
// import axios from 'axios';
import axios from 'axios';
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
// const updateUser =(userInfo)=>{
//     return updateProfile(auth.currentUser,userInfo)
// }
   
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
        if(currentUser){
            axios.post('unihub-server.vercel.app/jwt',{email:currentUser.email})
            .then(data=>{
                console.log(data.data.token)
                
                console.log('current user',currentUser)
                localStorage.setItem('access-token',data.data.token)
            })
        }
        else{
            localStorage.removeItem('access-token')
        }
        setLoading(false)
       })
       return ()=>{
        return unsubscribe()
       }
   })
   const updateUser = (userInfo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, userInfo)
      .then(() => {
        // Update user object with photoUrl if available
        const updatedUser = auth.currentUser;

        // Access the photoUrl from the user object
        const photoUrl = updatedUser.photoURL;

        // Optionally, you can also update the local state with the new user object
        setUser(updatedUser);

        // Return the updated user object or photoUrl as needed
        return updatedUser;
      })
      .catch((err) => {
       
        throw err;
      })
      .finally(() => setLoading(false));
  };
   
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