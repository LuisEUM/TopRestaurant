import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import TitleBar from "../../../components/ui/title-bar/TitleBar";
import { AuthContext } from "../../../contexts/AuthContext";
import { postRegister } from "../../../services/top-restaurant-service";

function LoginScreen() {
  const navigation = useNavigate();
  const value = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched" });

  const handleLogin = (data) => {
    postRegister(data)
      .then((data) => {
        value.setUser(data);
        navigation("/discovery");
      })
      .catch((error) => {
        if (error.response?.data?.errors) {
          const { errors } = error.response.data;
          console.log(errors);
          Object.keys(error.response.data.errors).forEach((error) => {
            setError(error, { message: errors[error].message });
          });
        }
      });
  }; 

  return (
    <>
    <TitleBar to="/login" title="Register" />

    <div >
      <div className="d-flex row row-cols-1 g-0 text-center justify-content-center align-items-center align-content-center full-height">
        <div className='col-4 p-0 me-2 d-flex justify-content-center align-items-end flex-column'>
          <img src="/assets/icons/top_top_mobile.svg" alt='Top Top Square Logo' className='circle-image' />
        </div> 
        <h1 className="text-primary col-10 fw-bold">
          Sign Up!
        </h1>
        <p className="col-10 fw-bold"> 
          Create account and choose favorite menu
        </p>
        <form onSubmit={handleSubmit(handleLogin)} className='col-10'>
          
          <div className="input-group mb-3 " >
            <input
              type="text"
              className={`form-control rounded-0 border-top-0 border-start-0 border-end-0 ${errors.name ? "is-invalid" : ""}`}
              placeholder="Full name..."
              {...register("name", {
                required: "Full name is required",
              })}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>

          <div className="input-group mb-3 " >
            <input
              type="text"
              className={`form-control rounded-0 border-top-0 border-start-0 border-end-0 ${errors.username ? "is-invalid" : ""}`}
              placeholder="Username..."
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username.message}</div>
            )}
          </div>


          <div className="input-group mb-3 " >
            <input
              type="email"
              className={`form-control rounded-0 border-top-0 border-start-0 border-end-0 ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email..."
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>


          <div className="input-group mb-3">
            <input
              type="password"
              className={`form-control rounded-0 border-top-0 border-start-0 border-end-0 ${errors.password ? "is-invalid" : ""}`}
              placeholder="Password..."
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <div className="d-grid mt-2">
            <button className="btn btn-primary" type="submit" disabled={!isValid}>
              Register
            </button>
          </div>
        </form>

      </div>    
    </div>
    </>
    
    
  );
}

export default LoginScreen;
