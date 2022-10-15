import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { followRestaurant } from '../../../services/top-restaurant-service';
import './HeroImage.css'
function HeroImage({logo, follow, setRestaurant, restaurant}) {

  const [liked, setLiked] = useState("btn btn-danger follow-heart rounded-circle col-2")
  const { id } = useParams();

  const handleFollow = () => {
    followRestaurant(id).then((data) => {
      console.log(data)
      const follow = data.follow == 1 ? `btn btn-danger follow-heart rounded-circle col-2 ` : `btn btn-warning follow-heart rounded-circle  col-2`
      setLiked(follow)
      setRestaurant({
        ...restaurant,
        follow: data.folow ? restaurant.follow + 1 : restaurant.follow - 1,
      });
    });
  };

  return (
    <div className='col-12 p-2 me-2 d-flex flex-column restaurant-card' style={{backgroundImage:`url(${restaurant.backgroundHero })`}}>
    <img src={logo} alt='Top Top Square Logo' className='col-3 circle-image-hero-logo shadow' />
    <button className={liked} onClick={handleFollow}>
        <i className="fa fa-heart me-2"></i>
        {follow}
    </button>
  </div> 
  )
}

export default HeroImage