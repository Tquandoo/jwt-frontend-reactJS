import "./Register.scss";
import { useNavigate } from "react-router-dom";
const Register = (props) => {
  let navigate = useNavigate();
  const handleLogin = () => {
    navigate("/home");
  };
  return (
    <div className="register-container ">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">Tquandoo</div>
            <div className="detail">learning everything...</div>
          </div>
          <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-4 ">
            <div className="brand d-sm-none">Tquandoo</div>
            <div className="form-group">
              <label>Email:</label>
              <input
                className="form-control"
                type="text"
                placeholder="Email address "
              />
            </div>
            <div className="form-group">
              <label>Phone numer:</label>
              <input
                className="form-control"
                type="text"
                placeholder="Phone number "
              />
            </div>
            <div className="form-group">
              <label>Username: </label>
              <input
                className="form-control"
                type="text"
                placeholder="username "
              />
            </div>
            <div className="form-group">
              <label>Password: </label>
              <input
                className="form-control"
                type="text"
                placeholder="Password "
              />
            </div>
            <div className="form-group">
              <label>Re-enter Password: </label>
              <input
                className="form-control"
                type="text"
                placeholder="Re-enter Password "
              />
            </div>

            <button className="btn btn-primary btn-lg ">Register</button>
            <hr />
            <div className="text-center">
              <button className="btn btn-success" onClick={() => handleLogin()}>
                Already've an account. Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
