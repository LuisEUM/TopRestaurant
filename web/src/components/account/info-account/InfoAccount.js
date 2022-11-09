import React, { useContext } from 'react'
import './InfoAccount.css'
import { AuthContext } from "../../../contexts/AuthContext";

function InfoAccount() {

  const { user } = useContext(AuthContext);
  
  if (!user) {
    return null;
  }


  return (
    <div className='container-fluid '>
    <div className="d-flex row justify-content-center bg-info py-4 rounded-bottom info-shadow">
      <h1 className='text-center text-white fs-2 col-10 '>Info Account</h1>
      <div className='col-4 p-0 me-2 d-flex justify-content-center align-items-end flex-column'>
        {
          user ? 
            <img src={user.image} alt='Top Top Square Logo' className='circle-image-profile' /> 
          :
            (<div className="full-height d-flex justify-content-center align-items-center">
              <img src="/assets/icons/loader/loader.svg" alt='loader'  className="m-5"></img>
            </div>)
        }
      </div> 
      <p className='col-10 px-2 text-center m-0 fs-6 d-flex  justify-content-center align-items-center text-white '><strong className='fw-bold'>Username: &nbsp; </strong>{user.username}</p>
      <p className='col-10 px-2 text-center  m-0 fs-6 d-flex  justify-content-center align-items-center text-white'><strong className='fw-bold'>E-mail: &nbsp; </strong>{user.email} </p>
    </div>
    </div>
  )
}


InfoAccount.defaultProps = {
  user:{
    image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  }
};


export default InfoAccount