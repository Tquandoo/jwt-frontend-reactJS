import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";

const Login = (props) => {
  let navigate = useNavigate();
  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");
  const defaultObjValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleCreateNewAccount = () => {
    navigate("/register");
  };

  const handleLogin = async () => {
    setObjValidInput(defaultObjValidInput);
    if (!valueLogin) {
      setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
      toast.error("Please enter your email address or phone number");
      return;
    }
    if (!password) {
      setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
      toast.error("Please enter your password");
      return;
    }
    let response = await loginUser(valueLogin, password);
    if (response && response.EC === 0) {
      //success
      let data = {
        isAuthenticated: true,
        token: "fake token",
      };
      sessionStorage.setItem("account", JSON.stringify(data));
      navigate("/users");
      window.location.reload();
    }
    if (response && response.EC !== 0) {
      toast.error(response.EM);
    }
  };

  const handlePressEnter = (e) => {
    if (e.charCode === 13 && e.code === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    const session = sessionStorage.getItem("account");
    if (session) {
      navigate("/");
    }
  }, []);
  return (
    <div className="login-container ">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">Tquandoo</div>
            <div>
              <i className="fa-regular fa-eye"></i>
            </div>
            <div className="detail">learning everything...</div>
          </div>
          <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-4 ">
            <div className="brand d-sm-none">Tquandoo</div>

            <input
              className={
                objValidInput.isValidValueLogin
                  ? "form-control"
                  : "form-control is-invalid"
              }
              type="text"
              placeholder="Email address or phone number "
              value={valueLogin}
              onChange={(e) => {
                setValueLogin(e.target.value);
              }}
            />
            <input
              className={
                objValidInput.isValidPassword
                  ? "form-control"
                  : "form-control is-invalid"
              }
              type="password"
              placeholder="Password "
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyPress={(e) => handlePressEnter(e)}
            />
            <button className="btn btn-primary btn-lg " onClick={handleLogin}>
              Login
            </button>
            <span className="text-center">
              <a className="forgot-password" href="#">
                Forgot your password?
              </a>
            </span>
            <hr />
            <div className="text-center ">
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
