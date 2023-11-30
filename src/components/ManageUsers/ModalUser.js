import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Users.scss";
import {
  fetchGroup,
  createNewUser,
  updateCurrentUser,
} from "../../services/userService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
const ModalUser = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [sex, setSex] = useState("");
  const [group, setGroup] = useState("");

  const { action, dataModalUser } = props;

  const defaultUserData = {
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    sex: "",
    group: "",
  }; // tất cả thông tin quản lý qua defaultUser
  const validInputsDefault = {
    email: true,
    phone: true,
    sername: true,
    password: true,
    address: true,
    sex: true,
    group: true,
  };

  const [validInputs, setValidInputs] = useState(validInputsDefault);
  const [userData, setUserData] = useState(defaultUserData);
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    if (action === "UPDATE") {
      setUserData({
        ...dataModalUser,
        group: dataModalUser.Group ? dataModalUser.Group.id : "",
      });
    }
  }, [dataModalUser]);

  useEffect(() => {
    if (action === "CREATE") {
      if (userGroups && userGroups.length > 0) {
        setUserData({ ...userData, group: userGroups[0].id });
      }
    }
  }, [action]);

  const getGroups = async () => {
    let response = await fetchGroup();
    if (response && response.EC === 0) {
      setUserGroups(response.DT);
      if (response.DT && response.DT.length > 0) {
        let groups = response.DT;
        setUserData({ ...userData, group: groups[0].id });
      }
    } else {
      toast.error(response.EM);
    }
  };

  const handlOnchangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData); // hàm copy lại full state
    _userData[name] = value;
    setUserData(_userData);
  };

  const checkValidateInputs = () => {
    // create user
    if (action === "UPDATE") {
      return true;
    }
    setValidInputs(validInputsDefault);
    let arr = ["email", "phone", "password", "group"];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[arr[i]] = false;
        setValidInputs(_validInputs);
        toast.error(`Empty input ${arr[i]}`);
        check = false;
        break;
      }
    }
    return check;
  };

  const handleConfirmUser = async () => {
    //create user
    let check = checkValidateInputs();
    if (check === true) {
      let res = // ở đây nếu action = CREATE sẽ tạo modal có trường là pass để tạo user còn action UPDATE thì sẽ k có trường pass
        action === "CREATE"
          ? await createNewUser({
              ...userData,
              groupId: userData["group"],
            })
          : await updateCurrentUser({
              ...userData,
              groupId: userData["group"],
            });

      if (res && res.EC === 0) {
        props.onHide();
        setUserData({
          ...defaultUserData,
          group: userGroups ?? userGroups.length > 0 ? userGroups[0].id : "",
        });
      }
      if (res && res.EC !== 0) {
        toast.error(res.EM);
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[res.DT] = false;
        setValidInputs(_validInputs);
      }
    }
  };

  const handleCloseModalUser = () => {
    setUserData(defaultUserData);
    setValidInputs(validInputsDefault);
    props.onHide();
  };
  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        className="modal-user"
        onHide={() => handleCloseModalUser()}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>
              {action === "CREATE" ? "Create new user" : "Edit a user"}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email address (<span className="red">*</span>) :
              </label>
              <input
                disabled={action === "CREATE" ? false : true}
                className={
                  validInputs.email ? "form-control" : "form-control is-invalid"
                }
                type="email"
                value={userData.email}
                onChange={(event) =>
                  handlOnchangeInput(event.target.value, "email")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone number (<span className="red">*</span>) :
              </label>
              <input
                disabled={action === "CREATE" ? false : true}
                className={
                  validInputs.phone ? "form-control" : "form-control is-invalid"
                }
                type="text"
                value={userData.phone}
                onChange={(event) =>
                  handlOnchangeInput(event.target.value, "phone")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Username:</label>
              <input
                className="form-control"
                type="text"
                value={userData.username}
                onChange={(event) =>
                  handlOnchangeInput(event.target.value, "username")
                }
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              {action === "CREATE" && (
                <>
                  <label>
                    Password (<span className="red">*</span>) :
                  </label>
                  <input
                    className={
                      validInputs.password
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    type="password"
                    value={userData.password}
                    onChange={(event) =>
                      handlOnchangeInput(event.target.value, "password")
                    }
                  />
                </>
              )}
            </div>
            <div className="col-12 col-sm-12 form-group">
              <label>Address:</label>
              <input
                className={
                  validInputs.address
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={userData.address}
                onChange={(event) =>
                  handlOnchangeInput(event.target.value, "address")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Gender:</label>
              <select
                className={
                  validInputs.sex ? "form-control" : "form-control is-invalid"
                }
                type="text"
                onChange={(event) =>
                  handlOnchangeInput(event.target.value, "sex")
                }
                value={userData.sex}
              >
                <option defaultValue="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Group: (<span className="red">*</span>)
              </label>
              <select
                className={
                  validInputs.group ? "form-select" : "form-select is-invalid"
                }
                type="text"
                onChange={(event) =>
                  handlOnchangeInput(event.target.value, "group")
                }
                value={userData.group}
              >
                {userGroups.length > 0 &&
                  userGroups.map((item, index) => {
                    return (
                      <option key={`group=${index}`} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModalUser()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmUser()}>
            {action === "CREATE" ? "Save" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUser;
