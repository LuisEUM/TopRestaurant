import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { patchBookingNotes } from "../../../services/top-restaurant-service";
import { BookingContext } from "../../../contexts/BookingContextProvider";

const tabContentVariant = {
  active: {
    display: "block",
    transition: {
      staggerChildren: 0.2
    }
  },
  inactive: {
    display: "none"
  }
};

const cardVariant = {
  active: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  },
  inactive: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.5
    }
  }
};


function ThirdStep({ id: tabId, active }) {
  const navigation = useNavigate();
  const  {stepTwoData}  = useContext(BookingContext);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched" });

  const handleLogin = (data) => {
    patchBookingNotes(stepTwoData, data)
      .then(() => {
        navigation("/my_bookings");
      })
      .catch((error) => {
        if (error.response?.data?.errors) {
          const { errors } = error.response.data;
          Object.keys(error.response.data.errors).forEach((error) => {
            setError(error, { message: errors[error].message });
          });
        }
      });
  };
  
  return (
    <motion.div
    role="tabpanel"
    id={tabId}
    className="tab-content"
    variants={tabContentVariant}
    animate={active ? "active" : "inactive"}
    initial="inactive"
  >
    <div >
      <div className="d-flex row row-cols-1 g-0 text-center justify-content-center align-items-center align-content-center">

        <form onSubmit={handleSubmit(handleLogin)} className='col-10'>
          <motion.div className="input-group mb-3 "  variants={cardVariant} >
            <textarea 
              rows="2"
              className={`form-control rounded-0 border-top-0 border-start-0 border-end-0 ${errors.note ? "is-invalid" : ""}`}
              placeholder="Note..."
              {...register("note", {
              })}
            />
            {errors.note && (
              <div className="invalid-feedback">{errors.note.message}</div>
            )}
          </motion.div>

          <motion.div className="input-group mb-3 " variants={cardVariant}>
            <input
              type="number"
              className={`form-control rounded-0 border-top-0 border-start-0 border-end-0 ${errors.phoneNumber ? "is-invalid" : ""}`}
              placeholder="Phone number..."
              {...register("phoneNumber", {
              })}
            />
            {errors.phoneNumber && (
              <div className="invalid-feedback">{errors.phoneNumber.message}</div>
            )}
          </motion.div>
          
          <motion.div className="input-group mb-3 " variants={cardVariant}>
            <input
              type="text"
              className={`form-control rounded-0 border-top-0 border-start-0 border-end-0 ${errors.prefixNumber ? "is-invalid" : ""}`}
              placeholder="Prefix number..."
              {...register("prefixNumber", {
              })}
            />
            {errors.prefixNumber && (
              <div className="invalid-feedback">{errors.prefixNumber.message}</div>
            )}
          </motion.div>

          <motion.div className="form-check mt-4" variants={cardVariant}>
            <input
                type='checkbox'
                placeholder='January'
                checked={true/false}
                className={` form-check-input rounded-0 border-top-0 border-start-0 border-end-0 ${errors.newsletter ? "is-invalid" : ""}`}
                //onChange={changeHandler}
              {...register("newsletter", {
              })}
            />
            <label htmlFor="newsletter" className="fs-7 form-check-label text-start">
              Do you want to receive emails about this booking and our promotions?
            </label>
            {errors.newsletter && (
              <div className="invalid-feedback">{errors.newsletter.message}</div>
            )}
          </motion.div>

          <motion.div className="d-grid mt-5 text-center justify-content-center align-items-center align-content-center " variants={cardVariant}>
            <button className="btn btn-primary" type="submit" disabled={!isValid}>
              Save changes
            </button>
          </motion.div>
        </form>

      </div>    
    </div>

  </motion.div>
  )
}

export default ThirdStep