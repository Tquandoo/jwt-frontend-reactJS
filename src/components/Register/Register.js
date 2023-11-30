import "./Register.scss";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { registerNewUser } from "../../services/userService";
const Register = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };

  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  let navigate = useNavigate();
  const handleLogin = () => {
    navigate("/home");
  };

  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);
    if (!email) {
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      toast.error("Email is required");
      return false;
    }
    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      toast.error("Please enter a vaild email address");
      return false;
    }
    if (!phone) {
      setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
      toast.error("Phone is required");
      return false;
    }
    if (!password) {
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      toast.error("Password is required");
      return false;
    }
    if (password !== confirmPassword) {
      setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
      toast.error("Your password is not the same!");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    let check = isValidInputs();

    if (check === true) {
      let response = await registerNewUser(email, phone, username, password);

      let serverData = response.data;

      if (+serverData.EC === 0) {
        toast.success(serverData.EM);
        navigate("/login");
      } else {
        toast.error(serverData.EM);
      }
    }
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
                className={
                  objCheckInput.isValidEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                placeholder="Email address "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone numer:</label>
              <input
                className={
                  objCheckInput.isValidPhone
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                placeholder="Phone number "
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Username: </label>
              <input
                className="form-control"
                type="text"
                placeholder="username "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password: </label>
              <input
                className={
                  objCheckInput.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="password"
                placeholder="Password "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Re-enter Password: </label>
              <input
                className={
                  objCheckInput.isValidConfirmPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="password"
                placeholder="Re-enter Password "
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              onClick={() => handleRegister()}
            >
              Register
            </button>
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
