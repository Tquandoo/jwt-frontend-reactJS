import "./Role.scss";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { toast } from "react-toastify";
import { createRoles } from "../../services/roleService";
import TableRole from "./TableRole";

const Role = (props) => {
  const dataChildDefault = {
    url: "",
    description: "",
    isValidUrl: true,
  };

  const childRef = useRef();
  const [listChilds, setListChilds] = useState({
    child1: dataChildDefault,
  });

  const handleOnchangeInput = (name, value, key) => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[key][name] = value;
    if (value && name === "url") {
      _listChilds[key]["isValidUrl"] = true;
    }
    setListChilds(_listChilds);
  };
  const handleAddNewInput = () => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[`child-${uuidv4()}`] = dataChildDefault;
    setListChilds(_listChilds);
  };

  const handleDeleteInput = (key) => {
    let _listChilds = _.cloneDeep(listChilds);
    delete _listChilds[key];
    setListChilds(_listChilds);
  };

  const buildDataToPersist = () => {
    let _listChilds = _.cloneDeep(listChilds);
    let result = [];
    Object.entries(_listChilds).map(([key, child], index) => {
      result.push({
        url: child.url,
        description: child.description,
      });
    });
    return result;
  };

  const handleSave = async () => {
    let invalidObj = Object.entries(listChilds).find(([key, child], index) => {
      return child && !child.url; // trả về thằng mà thiếu url
    });
    if (!invalidObj) {
      let data = buildDataToPersist();
      let res = await createRoles(data);
      if (res && res.EC === 0) {
        toast.success(res.EM);
        // console.log(childRef);
        childRef.current.fetListRolesAgain();
      }
    } else {
      // dispatch error
      toast.error("Input URL must not be empty...");
      let _listChilds = _.cloneDeep(listChilds);
      const key = invalidObj[0];
      _listChilds[key]["isValidUrl"] = false;
      setListChilds(_listChilds);
    }
  };
  return (
    <div className="role-container">
      <div className="container">
        <div className="adding-roles mt-4">
          <div className="title-role ">
            <h4>Add a new role:</h4>
            <div className="row role-parent">
              {Object.entries(listChilds).map(([key, child], index) => {
                return (
                  <div className="row role-child" key={`child-${key}`}>
                    <div className={`col-5 form-group ${key}`}>
                      <label>URL:</label>
                      <input
                        type="text"
                        className={
                          child.isValidUrl
                            ? "form-control"
                            : "form-control is-invalid"
                        }
                        value={child.url}
                        onChange={(e) =>
                          handleOnchangeInput("url", e.target.value, key)
                        }
                      ></input>
                    </div>
                    <div className="col-5 form-group">
                      <label>Description:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={child.description}
                        onChange={(e) =>
                          handleOnchangeInput(
                            "description",
                            e.target.value,
                            key
                          )
                        }
                      ></input>
                    </div>
                    <div className="col-2 form-group mt-4 actions">
                      <i
                        className="fa fa-plus-circle add"
                        onClick={() => handleAddNewInput()}
                      ></i>
                      {index >= 1 && (
                        <i
                          className="fa fa-trash delete"
                          onClick={() => handleDeleteInput(key)}
                        ></i>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <button
                className="col-1 btn btn-danger mt-3 "
                onClick={() => handleSave()}
              >
                Save{" "}
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="mt-3 table-roles">
          <h4>List Current Roles:</h4>
          <TableRole ref={childRef} />
        </div>
      </div>
    </div>
  );
};

export default Role;
