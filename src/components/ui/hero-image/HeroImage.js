import React from 'react'
import { useParams } from 'react-router-dom';
import Heart from '../heart/Heart';
import './HeroImage.css'
function HeroImage({logo, follow, setRestaurant, restaurant}) {

  const { id } = useParams();


  return (
    <div className='col-12 p-2  d-flex flex-column restaurant-card' style={{backgroundImage:`url(${restaurant.backgroundHero })`}}>
    <img src={logo} alt='Top Top Square Logo' className='col-3 circle-image-hero-logo shadow' />
    <Heart id={id} className={"me-2"}/>

  </div> 
  )
}

export default HeroImage