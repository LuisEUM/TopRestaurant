import React, { useEffect, useState } from 'react'
import { followRestaurant, getFollow } from '../../../services/top-restaurant-service';
import "./Heart.css"

function Heart({id}) {
  const [liked, setLiked] = useState("btn-secondary")

useEffect(()=>{
  getFollow(id)
      .then((data) => {
        const follow = data.followB ? ` btn-danger` : ` btn-secondary`
        console.log(follow)
        setLiked(follow)
      })
},[])



  const handleFollow = () => {
    followRestaurant(id)
      .then((data) => {
      console.log(data)

    })
    .then(() =>{
      getFollow(id)
      .then((data) => {
        const follow = data.followB ? ` btn-danger` : ` btn-secondary`
        setLiked(follow)
      })
    });
  };

  return (
    <div className={`${liked}  btn d-flex heart rounded-5 justify-content-center align-items-center position-absolute end-0`} onClick={handleFollow}>
        <i className="fa fa-heart fa-fw"/>
    </div>
  )
}

export default Heart