import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import leftBanner from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuchContext } from '../../providers/AuthProvider';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';



const Login = () => {
   const { loginUser } = useContext(AuchContext);
   const location = useLocation();
   const from = location.state?.from?.pathname || '/';
   const navigate = useNavigate()
   // navigate(from, { replace: true });


   const handleLogin = (event) => {
      event.preventDefault();
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;

      loginUser(email, password)
         .then(result => {
            const user = result.user;
            console.log(user);
            navigate(from, { replace: true });
         })
         .catch(error => {
            console.error(error.message)
         })


   };


   return (
      <div className="hero min-h-screen bg-base-200">
         <div className="hero-content flex-col lg:flex-row ">
            <div className="w-1/2 m-12">
               <img src={leftBanner} alt="" />
            </div>

            <div className="card flex-shrink-0 w-full max-w-sm shadow-md border border-lime-200 rounded-none bg-base-100">
               <div className="card-body">
                  <h1 className="text-3xl font-bold text-center">Login</h1>
                  <form onSubmit={handleLogin} >
                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Email</span>
                        </label>
                        <input type="text" name='email' placeholder="email" className="input input-bordered" />
                     </div>
                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Password</span>
                        </label>
                        <input type="text" name='password' placeholder="password" className="input input-bordered" />
                        <label className="label">
                           <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                     </div>
                     <div className="form-control mt-6">
                        <input className="btn btn-primary" type="submit" value="Login" />
                     </div>
                  </form>
                  <label className="label text-center">
                     <p className='label-text-alt'>New to card doctors? <span href="#" className="label-text-alt link link-hover text-orange-600 font-bold"><Link to='/signUp'>Sign Up!</Link></span></p>
                  </label>
                  <SocialLogin />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;