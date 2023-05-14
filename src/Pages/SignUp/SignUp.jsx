import { Link } from 'react-router-dom';
import leftBanner from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuchContext } from '../../providers/AuthProvider';

const SignUp = () => {
   const { signUpUser } = useContext(AuchContext)
   // console.log(signUpUser);

   const handleSignUp = (event) => {
      event.preventDefault(AuchContext);
      const form = event.target;
      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;
      console.log(name, email, password);

      signUpUser(email, password)
         .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
         })
         .catch(error => {
            console.error(error.massage)
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
                  <h1 className="text-3xl font-bold text-center">Sign Up</h1>
                  <form onSubmit={handleSignUp} >
                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Name</span>
                        </label>
                        <input type="text" name='name' placeholder="Name" className="input input-bordered" />
                     </div>
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
                     <p className='label-text-alt'>Already Have an account? <span href="#" className="label-text-alt link link-hover text-orange-600 font-bold"><Link to='/login'>Login!</Link></span></p>
                  </label>

               </div>

            </div>
         </div>
      </div>
   );
};

export default SignUp;