import React, { useContext, useEffect, useState } from 'react';
import { AuchContext } from '../../providers/AuthProvider';
import Row from './Row';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
   const { user } = useContext(AuchContext);
   const [booking, setBooking] = useState([]);
   const navigate = useNavigate()


   const url = `https://car-doctors-server-iota.vercel.app/bookings?email=${user.email}`;
   useEffect(() => {
      fetch(url, {
         method: 'GET',
         headers: { authorization: `Brarer ${localStorage.getItem('car-access-token')}` },

      })
         .then(res => res.json())
         .then(data => {
            if (!data.error) {
               setBooking(data)
            } else {
               navigate('/')
            }
         })
   }, [])




   const handleDelete = (id) => {
      const procced = confirm('are you sure want to delete?');
      if (procced) {
         fetch(`https://car-doctors-server-iota.vercel.app/bookings/${id}`, {
            method: 'DELETE',
         })
            .then(res => res.json())
            .then(data => {
               console.log(data)
               if (data.deletedCount > 0) {
                  alert("Delete Successfull!");
                  const reamining = booking.filter(book => book._id !== id);
                  setBooking(reamining)
               }
            })
      }
   };

   const handleConfarm = id => {
      fetch(`https://car-doctors-server-iota.vercel.app/bokings/${id}`, {
         method: 'PATCH',
         headers: {
            'content-type': 'application/json'
         },
         body: JSON.stringify({ status: 'confarm' })

      })
         .then(res => res.json())
         .then(data => {
            console.log(data)
            //update state
            const remaining = booking.filter(booking => booking._id !== id);
            const updated = booking.find(booking => booking._id === id);
            updated.status = 'confarm';
            const newBooking = [updated, ...remaining];
            setBooking(newBooking)
         })
   }

   return (
      <div>
         <h1 className='text-5xl text-center my-5'>Your Bookings: {booking.length}</h1>
         <div>
            <div className="overflow-x-auto w-full">
               <table className="table w-full">
                  <thead>
                     <tr>
                        <th>
                           <h1>Delete</h1>
                        </th>
                        <th>Name</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Price:</th>
                        <th>Status</th>
                     </tr>
                  </thead>
                  {booking.map(booking => <Row booking={booking} handleDelete={handleDelete} handleConfarm={handleConfarm} key={booking._id} />)}
               </table>
            </div>
         </div>

      </div>
   );
};

export default Bookings;