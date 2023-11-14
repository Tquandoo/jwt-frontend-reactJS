import "./Login.scss";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  let navigate = useNavigate();
  const handleCreateNewAccount = () => {
    navigate("/register");
  };
  return (
    <div className="login-container ">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">Tquandoo</div>
            <div className="detail">learning everything...</div>
          </div>
          <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-4 ">
            <div className="brand d-sm-none">Tquandoo</div>

            <input
              className="form-control"
              type="text"
              placeholder="Email address or phone number "
            />
            <input
              className="form-control"
              type="text"
              placeholder="Password "
            />
            <button className="btn btn-primary btn-lg ">Login</button>
            <span className="text-center">
              <a className="forgot-password" href="#">
                Forgot your password?
              </a>
            </span>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handleCreateNewAccount()}
              >
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
