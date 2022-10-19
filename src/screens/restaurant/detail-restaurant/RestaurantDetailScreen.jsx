import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GalleryRestaurant, HeroImage, ScheduleTab, Section, TitleBar } from "../../../components";
import { getRestaurant } from "../../../services/top-restaurant-service";
import RestaurantLocation from "../location-restaurant/RestaurantLocation";

function RestaurantDetailScreen() {
  const [restaurant, setRestaurant] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getRestaurant(id).then((restaurant) => setRestaurant(restaurant));
  }, [id]);

  if (!restaurant) {
    return (
      <>
        <TitleBar to="/discovery" title="Loading..." />
        <div className="full-height d-flex justify-content-center align-items-center bg-primary ">
          <p className="text-white">loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <TitleBar to="/discovery" title={restaurant.name} />

      <div className="padding-top-nav ">
        <HeroImage
          restaurant={restaurant}
          {...restaurant}
          setRestaurant={setRestaurant}
        ></HeroImage>
        <div className="d-flex row m-0 justify-content-center text-center py-5 ">
          <div className="col-10 mt-4">
            <p> {restaurant.description}</p>

            <Link to={`/bookings/${id}`} className="btn btn-primary col-12 mt-3 text-white">
              Reserve a table!
            </Link> 

            <Link to={`/menu/${id}`} className="btn btn-secondary col-12 mt-3 text-white">
              Check menu
            </Link>
          </div>
        </div>
      </div>

      <hr className="m-0" />

      <div className="full-height d-flex row justify-content-center align-items-start  m-0 py-3 ">
        
        {/* <div className="col-10 my-3 py-3">
          <Section title="The Popular Ones!" />
        </div>

        <hr className="m-0" /> */}

        <div className="col-10 my-3 py-3">
          <Section title="Schedules" />
          {restaurant.schedules && restaurant.schedules.map((days)=>{
              return (
                <>    
                {days.dayOfWeek &&  <ScheduleTab key={days.id} {...days}/>}
                </>
              )
          })}
        </div>

        <hr className="m-0" />


        <div className="col-10 my-3 py-3">
          <Section title="Meet Our Restaurat" />
          <GalleryRestaurant {...restaurant} restaurant={restaurant} setRestaurant={setRestaurant}/>
        </div>

        <hr className="m-0" />

        <div className="col-10 my-3 pt-3 pb-5">
          <Section title="Let's Go!" />
          <RestaurantLocation />
          <div className="mt-4">
            <div className="d-flex my-1 justify-content-start align-items-baseline">
              <i
                className="fa fa-map-marker fa-fw text-secondary"
                aria-hidden="true"
              >
                &nbsp;
              </i>
              <p className="m-0">&nbsp; {restaurant.address}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RestaurantDetailScreen;

// import { Section } from "../../../components";
// import {
//   commentRestaurant,
//   getRestaurant,
//   followRestaurant,
// } from "../../../services/top-restaurant-service";

// function RestaurantDetailScreen() {
//   const [restaurant, setRestaurant] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     getRestaurant(id).then((restaurant) => setRestaurant(restaurant));
//   }, [id]);

//   const handleLike = () => {
//     followRestaurant(id).then((data) => {
//       setRestaurant({
//         ...restaurant,
//         likes: data.likes ? restaurant.likes + 1 : restaurant.likes - 1,
//       });
//     });
//   };

//   const handleNewComment = (e) => {
//     e.preventDefault();
//     const form = e.target;

//     commentRestaurant(id, form.text.value).then((comment) => {
//       setRestaurant({
//         ...restaurant,
//         comments: [...restaurant.comments, comment],
//       });
//     });
//   };

//   if (!restaurant) {
//     return <></>;
//   }

//   return (
//     <Section title="Detail" icon="wpexplorer">
//       <div className="row">
//         <div className="col-4">
//           <img src={restaurant.thumbnail} alt="thumbnail" className="w-100" />
//         </div>
//         <div className="col-8">
//           <h5>{restaurant.title}</h5>
//           <p>{restaurant.description}</p>
//           <p>
//             <a href={restaurant.url} target="_blank" rel="noreferrer">
//               {restaurant.url}
//             </a>
//           </p>
//           <p>Category: {restaurant.category}</p>
//           <p>Views: {restaurant.views}</p>
//           <button className="btn btn-danger" onClick={handleLike}>
//             <i className="fa fa-heart me-2"></i>
//             {restaurant.likes}
//           </button>
//         </div>
//       </div>

//       <hr />

//       <h5>Comments</h5>

//       <form onSubmit={handleNewComment} className="mb-3">
//         <textarea
//           name="text"
//           className="form-control mb-2"
//           placeholder="Add Comment..."
//         />
//         <button type="submit" className="btn btn-sm btn-primary">
//           Comment
//         </button>
//       </form>

//       {restaurant.comments.map((comment) => (
//         <div className="mb-4 border-bottom py-2">
//           <p>{comment.text}</p>
//           <small>Por {comment.user.name}</small>
//         </div>
//       ))}
//     </Section>
//   );
// }

// export default RestaurantDetailScreen;
