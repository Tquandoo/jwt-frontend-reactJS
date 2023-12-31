import "./Users.scss";
import { useContext, useEffect, useState } from "react";
import { fetchAllUser, deleteUser } from "../../services/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
const Users = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(3); // sau dùng
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModal, setDataModal] = useState({});

  const [isShowModalUser, setIsShowModalUser] = useState(false);
  const [actionModalUser, setActionModalUser] = useState("CREATE");
  const [dataModalUser, setDataModalUser] = useState({});
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async (page) => {
    try {
      let response = await fetchAllUser(currentPage, currentLimit);
      if (response && response.EC === 0) {
        // console.log(response.data.DT);
        setTotalPages(response.DT.totalPages);
        setListUsers(response.DT.users);
      }
    } catch (e) {
      console.log("error 2", e);
    }
  };
  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };
  const handleDeleteUser = async (user) => {
    setDataModal(user);
    setIsShowModalDelete(true);
  };

  const confirmDeleteUser = async () => {
    let response = await deleteUser(dataModal);
    if (response && response.EC === 0) {
      toast.success(response.EM);
      fetchUsers();
    } else {
      toast.error(response.EM);
    }
    setIsShowModalDelete(false);
  };
  const handleClose = () => {
    setIsShowModalDelete(false);
    setDataModal({});
  };
  const onHideModalUser = async () => {
    setIsShowModalUser(false);
    setDataModalUser({});
    await fetchUsers();
  };

  const handleEditUser = async (user) => {
    setActionModalUser("UPDATE");
    setDataModalUser(user);
    setIsShowModalUser(true);
  };

  const handleRefresh = async () => {
    await fetchUsers();
  };
  return (
    <>
      <div className="container">
        <div className="manage-users-container">
          <div className="user-header">
            <div className="title my-3">
              <h3>Manage User</h3>
            </div>
            <div className="action my-3">
              <button
                className="btn btn-success refresh"
                onClick={() => handleRefresh()}
              >
                <i className="fa fa-refresh"></i>Refresh
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setIsShowModalUser(true);
                  setActionModalUser("CREATE");
                }}
              >
                <i className="fa fa-plus-circle"></i>
                Add new user
              </button>
            </div>
          </div>
          {/* <div className="user-body">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">ID</th>
                  <th scope="col">Email</th>
                  <th scope="col">Username</th>
                  <th scope="col">Group</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {listUsers && listUsers.length > 0 ? (
                  <>
                    {listUsers.map((item, index) => {
                      return (
                        <tr key={`row-${index}`}>
                          <td>
                            {(currentPage - 1) * currentLimit + index + 1}
                          </td>
                          <td>{item.id}</td>
                          <td>{item.email}</td>
                          <td>{item.username}</td>
                          <td>{item.Group ? item.Group.name : ""}</td>
                          <td>
                            <span
                              title="edit"
                              className="edit "
                              onClick={() => handleEditUser(item)}
                            >
                              <i className="fa fa-pencil"></i>
                            </span>
                            <span
                              title="delete"
                              className="delete"
                              onClick={() => handleDeleteUser(item)}
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
                      <td>Not found users</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div> */}

          {/* test table mới */}
          <div className="user-body container">
            <div className="row">
              <div className="col-md-12">
                <div className="table-wrap">
                  <table className="table table-responsive-xl">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">Username</th>
                        <th scope="col">Group</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listUsers && listUsers.length > 0 ? (
                        <>
                          {listUsers.map((item, index) => {
                            return (
                              <tr
                                className="alert"
                                role="alert"
                                key={`row-${index}`}
                              >
                                <td>
                                  {/* <label className="checkbox-wrap checkbox-primary">
                                    <input type="checkbox" checked />
                                    <span className="checkmark"></span>
                                  </label> */}
                                  {(currentPage - 1) * currentLimit + index + 1}
                                </td>
                                <td className="d-flex align-items-center">
                                  <div className="pl-3 email">
                                    <span>{item.id}</span>
                                  </div>
                                </td>

                                <td>{item.email}</td>
                                <td>{item.username}</td>
                                <td className="status">
                                  <span className="active">
                                    {item.Group ? item.Group.name : ""}
                                  </span>
                                </td>
                                <td>
                                  <span
                                    title="edit"
                                    className="edit "
                                    onClick={() => handleEditUser(item)}
                                  >
                                    <i className="fa fa-pencil"></i>
                                  </span>
                                  <span
                                    title="delete"
                                    className="delete"
                                    onClick={() => handleDeleteUser(item)}
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
                            <td>Not found users</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {totalPages > 0 && (
            <div className="d-flex justify-content-center user-footer">
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </div>
      </div>

      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        confirmDeleteUser={confirmDeleteUser}
        dataModal={dataModal}
      />
      <ModalUser
        onHide={onHideModalUser}
        show={isShowModalUser}
        action={actionModalUser}
        dataModalUser={dataModalUser}
      />
    </>
  );
};

export default Users;
