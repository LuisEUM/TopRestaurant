import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import TitleBar from "../../../components/ui/title-bar/TitleBar";
import { AuthContext } from "../../../contexts/AuthContext";
import { updateProfile } from "../../../services/top-restaurant-service";

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
    updateProfile(data)
      .then((data) => {
        value.setUser(data);
        navigation("/");
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
    <>
    <TitleBar to="/account" title="Profile" />

    <div >
      <div className="d-flex row row-cols-1 g-0 text-center justify-content-center align-items-center align-content-center full-height">
        <div className='col-4 p-0 me-2 d-flex justify-content-center align-items-end flex-column mb-5'>
          <img src={value.user.image} alt='Top Top Square Logo' className='circle-image shadow' />
        </div> 

        <form onSubmit={handleSubmit(handleLogin)} className='col-10'>
          <div className="input-group mb-3 " >
            <input
              type="text"
              defaultValue={value.user.name}
              className={`form-control rounded-0 border-top-0 border-start-0 border-end-0 ${errors.name ? "is-invalid" : ""}`}
              placeholder="Full name..."
              {...register("name", {
              })}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>

          <div className="input-group mb-3 " >
            <input
              type="text"
              defaultValue={value.user.username}
              className={`form-control rounded-0 border-top-0 border-start-0 border-end-0 ${errors.username ? "is-invalid" : ""}`}
              placeholder="Username..."
              {...register("username", {
              })}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username.message}</div>
            )}
          </div>

          <div className="input-group mb-3 " >
            <input
              type="text"
              className={`form-control rounded-0 border-top-0 border-start-0 border-end-0 ${errors.image ? "is-invalid" : ""}`}
              placeholder="Select you profile image..."
              {...register("image", {
              })}
            />
            {errors.image && (
              <div className="invalid-feedback">{errors.image.message}</div>
            )}
          </div>

          
          <div className="input-group mb-3 " >
            <input
              type="email"
              defaultValue={value.user.email}
              className={`form-control rounded-0 border-top-0 border-start-0 border-end-0 ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email..."
              {...register("email", {
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
              placeholder="New Password..."
              {...register("password", {
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <div className="d-grid mt-5 text-center justify-content-center align-items-center align-content-center ">
            <button className="btn btn-primary" type="submit" disabled={!isValid}>
              Save changes
            </button>
          </div>
        </form>

      </div>    
    </div>
    </>
    
    
  );
}

export default LoginScreen;
