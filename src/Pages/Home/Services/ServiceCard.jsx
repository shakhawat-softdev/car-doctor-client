import { Link } from "react-router-dom";


const ServiceCard = ({ service }) => {

   const { _id, title, img, price, service_id, description, facility } = service;
   return (
      <div className="card w-96 bg-base-100 shadow-md border border-amber-200">
         <figure className="px-10 pt-10">
            <img src={img} alt="Shoes" className="bg-gradient-to-r from-[black] to-[blue]" />
         </figure>
         <div className="card-body">
            <h2 className="card-title">{title}</h2>
            {/* <p>{description}</p> */}
            <p className="text-xl text-orange-500 text-start" >price: ${price}</p>
            <div className="card-actions">
               <Link to={`/book/${service._id}`}><button className="btn btn-primary">Book Now</button></Link>
            </div>
         </div>
      </div>
   );
};

export default ServiceCard;