import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuchContext } from '../../providers/AuthProvider';

const BookService = () => {
   const data = useLoaderData()
   const { price, title, _id, img } = data;
   const { user } = useContext(AuchContext);
   console.log(user);

   const handleBookOrder = event => {
      event.preventDefault()
      const form = event.target;
      const name = form.name.value;
      const email = user?.email;
      const date = form.date.value;
      const price = form.due.value;
      const booking = { customerName: name, email, img, date, service: title, service_id: _id, price: price };

      console.log(booking);
      fetch('https://car-doctors-server-iota.vercel.app/bookings', {
         method: 'POST',
         headers: {
            "content-type": "application/json"
         },
         body: JSON.stringify(booking)
      })
         .then(res => res.json())
         .then(data => {
            console.log(data);
            if (data.insertedId) {
               alert("Service book successfully!!!")

            }
         })

   };

   return (
      <div>
         <h2 className='text-center text-3xl'>Book Service: Automatic Service</h2>

         <div className="card-body">
            <form onSubmit={handleBookOrder}>
               <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Name</span>
                     </label>
                     <input type="text" name='name' defaultValue={user && user.displayName} placeholder="name" className="input input-bordered" />
                  </div>

                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Date</span>
                     </label>
                     <input type="date" name='date' className="input input-bordered" />
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Email</span>
                     </label>
                     <input type="email" name='email' readOnly defaultValue={user?.email} placeholder="email" className="input input-bordered" />
                  </div>

                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Due Amount</span>
                     </label>
                     <input type="number" name='due' defaultValue={price} className="input input-bordered" />
                  </div>
               </div>

               <div className="form-control mt-6">
                  <input className="btn btn-primary btn-block" type="submit" value="Order Confarm" />
               </div>

            </form>
         </div>
      </div>

   );
};

export default BookService;