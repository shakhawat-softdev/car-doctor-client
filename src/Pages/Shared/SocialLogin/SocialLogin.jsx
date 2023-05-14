import React, { useContext } from 'react';
import { AuchContext } from '../../../providers/AuthProvider';

const SocialLogin = () => {
   const { loginWithGoogle } = useContext(AuchContext);

   const handleGoogleLogin = () => {
      loginWithGoogle()
         .then(result => {
            const user = result.user;
            console.log(user)
         })
         .catch(error => {
            console.error(error.message)
         })
   };

   return (
      <div>
         <div className="divider">OR</div>
         <div className='text-center'>
            <button className="btn btn-circle btn-outline" onClick={handleGoogleLogin}>
               G
            </button>
         </div>
      </div>

   );
};

export default SocialLogin;