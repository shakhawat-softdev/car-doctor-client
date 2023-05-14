import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../Firebase/FirebaseConfig";

export const AuchContext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();



const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true)

   const signUpUser = (email, password) => {
      setLoading(true)
      return createUserWithEmailAndPassword(auth, email, password);
   };

   const loginUser = (email, password) => {
      setLoading(true)
      return signInWithEmailAndPassword(auth, email, password)
   };

   const loginWithGoogle = () => {
      return signInWithPopup(auth, provider)
   }

   const logOut = () => {
      setLoading(true);
      return signOut(auth);
   }

   useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, currentUser => {
         setUser(currentUser);
         console.log('Current User In Auth: ', currentUser);
         setLoading(false);

         if (currentUser && currentUser.email) {
            const loggedUser = { email: currentUser.email };
            fetch(`https://car-doctors-server-iota.vercel.app/jwt/`, {
               method: 'POST',
               headers: { 'content-type': 'application/json' },
               body: JSON.stringify(loggedUser)
            })
               .then(res => res.json())
               .then(data => {
                  console.log('jwt Responce: ', data);
                  //warning local storage is not secure for this
                  localStorage.setItem('car-access-token', data.token);

               })
         } else {
            localStorage.removeItem('car-access-token')
         }

      });
      return () => { unSubscribe() }
   }, [])


   const authInfo = { user, loading, signUpUser, loginUser, logOut, loginWithGoogle }

   return (
      <AuchContext.Provider value={authInfo} >
         {children}
      </AuchContext.Provider>
   );
};

export default AuthProvider;