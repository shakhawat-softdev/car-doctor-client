import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";


const Services = () => {
   const [services, setServices] = useState([])
   useEffect(() => {
      fetch('https://car-doctors-server-iota.vercel.app/services')
         .then(res => res.json())
         .then(data => setServices(data))
   }, [])
   return (
      <div className="mt-4">
         <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-orange-700">Service</h3>
            <h1 className="text-5xl">Our Service Area</h1>
            <p className="">the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which don't look even slightly believable. </p>

            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {services.map(service => <ServiceCard service={service} key={service._id} />)}
            </div>


         </div>
      </div>
   );
};

export default Services;