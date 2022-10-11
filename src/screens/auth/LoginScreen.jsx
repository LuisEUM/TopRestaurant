import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { authenticate } from "../../services/top-restaurant-service";

function LoginScreen() {
  const navigation = useNavigate();
  const value = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched" });

  const handleLogin = (data) => {
    authenticate(data)
      .then((data) => {
        value.setUser(data);
        navigation("/");
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
    <div >
      <div className="d-flex row row-cols-1 g-0 text-center justify-content-center align-items-center align-content-center full-height">
        <div className='col-4 p-0 me-2 d-flex justify-content-center align-items-end flex-column'>
          <img src="/assets/icons/top_top_mobile.svg" alt='Top Top Square Logo' className='circle-image' />
        </div> 
        <h1 className="text-primary col-10 fw-bold">
          Welcome Back!
        </h1>
        <p className="col-10 fw-bold"> 
          Sign in your account
        </p>
        <form onSubmit={handleSubmit(handleLogin)} className='col-10'>
          <div className="input-group mb-3 " >

            <input
              type="text"
              className={`form-control rounded-0 border-top-0 border-start-0 border-end-0 ${errors.identifier ? "is-invalid" : ""}`}
              placeholder="Email or username..."
              {...register("identifier", {
                required: "Email or username is required",
              })}
            />
            {errors.identifier && (
              <div className="invalid-feedback">{errors.identifier.message}</div>
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

          <Link className="text-start text-primary d-flex text-decoration-none fw-bold mb-5 " to=""> 
            Forgot Password? 
          </Link>

          <div className="d-grid mt-2">
            <button className="btn btn-primary" type="submit" disabled={!isValid}>
              Login
            </button>
          </div>
        </form>

        <hr className="mt-5 mb-3"/>
        <div className="d-flex row row-cols-1 g-0 text-center justify-content-center align-items-center align-content-center ">

        <p className=""> 
          Don't have an account? <Link className="text-decoration-none fw-bold" to="/register"> Sign Up</Link>
        </p>
        </div>    

      </div>    
    </div>
    
  );
}

export default LoginScreen;
