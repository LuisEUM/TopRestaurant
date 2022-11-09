import React from 'react'
import { useParams } from 'react-router-dom';
import Heart from '../heart/Heart';
import './HeroImage.css'
function HeroImage({logo, restaurant, menu}) {

  const { id } = useParams();

  return (
    <div className='col-12 p-2  d-flex flex-column menu-restaurant-hero' style={restaurant ? {backgroundImage:`url(${restaurant.backgroundHero  })`} : {backgroundImage:`url(${ menu.coverImage  })`} }>
    {logo && <img src={logo} alt='Top Top Square Logo' className='col-3 circle-image-hero-logo shadow' />}
    {restaurant && <Heart id={id} className={"me-2"}/>}

  </div> 
  )
}

export default HeroImage