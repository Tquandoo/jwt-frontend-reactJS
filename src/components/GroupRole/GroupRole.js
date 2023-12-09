import "./GroupRole.scss";
import { useState, useEffect } from "react";
import { fetchGroup } from "../../services/userService";
import {
  fetchAllRoles,
  fetchRoleByGroup,
  assignRolesToGroup,
} from "../../services/roleService";
import { toast } from "react-toastify";
import _ from "lodash";

const GroupRole = () => {
  const [userGroups, setUserGroups] = useState([]);
  const [listRoles, setListRoles] = useState([]);
  const [selectGroup, setSelectGroup] = useState("");
  const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);

  useEffect(() => {
    getGroups();
    getAllRoles();
  }, []);

  const handleOnchangeSelect = () => {};
  const getGroups = async () => {
    let response = await fetchGroup();

    if (response && response.EC === 0) {
      setUserGroups(response.DT);
    } else {
      toast.error(response.EM);
    }
  };
  const getAllRoles = async () => {
    let data = await fetchAllRoles();
    if (data && +data.EC === 0) {
      setListRoles(data.DT);
    }
  };

  const handleOnchangeGroup = async (value) => {
    setSelectGroup(value);
    if (value) {
      try {
        let data = await fetchRoleByGroup(value);
        if (data && +data.EC === 0) {
          let result = buildDataRolesByGroup(data.DT.Roles, listRoles);
          setAssignRolesByGroup(result);
        } else {
          console.error("Error fetching roles by group:", data.EM);
        }
      } catch (error) {
        console.error("Error fetching roles by group:", error);
      }
    }
  };

  const buildDataRolesByGroup = (groupRoles, allRoles) => {
    let result = [];
    if (allRoles && allRoles.length > 0) {
      allRoles.map((role) => {
        let object = {};
        object.url = role.url;
        object.id = role.id;
        object.description = role.description;
        object.isAssigned = false;
        if (groupRoles && groupRoles.length > 0) {
          object.isAssigned = groupRoles.some(
            (item) => item.url === object.url
          );
        }
        result.push(object);
      });
    }
    return result;
  };

  const handleSelectRole = (value) => {
    // lấy ra id của role
    const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);

    let foundIndex = _assignRolesByGroup.findIndex(
      (item) => +item.id === +value
    );
    if (foundIndex > -1) {
      _assignRolesByGroup[foundIndex].isAssigned =
        !_assignRolesByGroup[foundIndex].isAssigned;
    }
    setAssignRolesByGroup(_assignRolesByGroup);
  };

  const buildDataToSave = () => {
    // let data {groupId: 4, groupRoles: [{}, {}]}
    let result = {};
    const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
    result.groupId = selectGroup;
    let groupRolesFilter = _assignRolesByGroup.filter(
      (item) => item.isAssigned === true
    );
    let finalGroupRoles = groupRolesFilter.map((item) => {
      let data = { groupId: +selectGroup, roleId: +item.id };
      return data;
    });
    // console.log("final data:", finalGroupRoles);
    result.groupRoles = finalGroupRoles;
    return result;
  };

  const handleSave = async () => {
    let data = buildDataToSave();

    let res = await assignRolesToGroup(data);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="group-role-container">
      <div className="container">
        <div className="container mt-3">
          <h4>Group Role:</h4>
          <div className="assign-group-role">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Select Group: (<span className="red">*</span>)
              </label>
              <select
                className={"form-select"}
                type="text"
                onChange={(e) => handleOnchangeGroup(e.target.value)}
              >
                <option value="">Please select your group</option>

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
            <hr />
            {selectGroup && (
              <div className="roles">
                <h5>Assign Roles:</h5>
                {assignRolesByGroup &&
                  assignRolesByGroup.length > 0 &&
                  assignRolesByGroup.map((item, index) => {
                    return (
                      <div className="form-check" key={`list-role-${index}`}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={item.id}
                          id={`list-role-${index}`}
                          checked={item.isAssigned}
                          onChange={(e) => handleSelectRole(e.target.value)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`list-role-${index}`}
                        >
                          {item.url}
                        </label>
                      </div>
                    );
                  })}
                <div>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleSave()}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default GroupRole;
