import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { fetchAllRoles, deleteRoles } from "../../services/roleService";
import { toast } from "react-toastify";

const TableRole = forwardRef((props, ref) => {
  const [listRoles, setListRoles] = useState([]);

  useEffect(() => {
    getAllRoles();
  }, []);

  useImperativeHandle(ref, () => ({
    fetListRolesAgain() {
      getAllRoles();
    },
  })); // sử dụng useRef để kết nối cha và con, ở đây file role sẽ hiểu được
  // các hàm được định nghĩa bên trong này của hàm này
  const getAllRoles = async () => {
    let data = await fetchAllRoles();
    if (data && +data.EC === 0) {
      setListRoles(data.DT);
    }
  };
  const handleDeleteRole = async (role) => {
    let data = await deleteRoles(role);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      await getAllRoles();
    }
  };
  return (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">URL</th>
          <th scope="col">Description</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {listRoles && listRoles.length > 0 ? (
          <>
            {listRoles.map((item, index) => {
              return (
                <tr key={`row-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.url}</td>
                  <td>{item.description}</td>
                  <td>
                    <span
                      title="delete"
                      className="delete"
                      onClick={() => handleDeleteRole(item)}
                    >
                      <i className="fa fa-trash"></i>
                    </span>
                  </td>
                </tr>
              );
            })}
          </>
        ) : (
          <>
            <tr>
              <td colSpan={4}>Not found users</td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
});

export default TableRole;
