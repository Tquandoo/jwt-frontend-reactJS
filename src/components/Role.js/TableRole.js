import {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import {
  fetchAllRoles,
  deleteRoles,
  fetchRoleWithPage,
} from "../../services/roleService";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { useLocation } from "react-router-dom";

const TableRole = forwardRef((props, ref) => {
  const location = useLocation();
  // const pathnameRef = useRef(location.pathname);
  let currentPage = localStorage.getItem("pageNumber")
    ? localStorage.getItem("pageNumber")
    : 1;
  const [listRoles, setListRoles] = useState([]);
  const [page, setPage] = useState(currentPage);
  const [currentLimit, setCurrentLimit] = useState(3); // sau dùng
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    console.log("render 1");
    getRoles(page);
    // Cleanup function
    return () => {
      console.log("unmounting", location.pathname);
      if (location.pathname !== "/roles") {
        console.log("Cleanup executed");
        localStorage.setItem("pageNumber", 1);
      }
    };
  }, [page, location.pathname]);
  useImperativeHandle(ref, () => ({
    fetListRolesAgain() {
      getAllRoles();
    },
  }));

  useEffect(() => {
    console.log("component mounted");

    // Cleanup function
    return () => {
      console.log(location.pathname);
      console.log("component unmounted");
    };
  }, []); // sử dụng useRef để kết nối cha và con, ở đây file role sẽ hiểu được
  // các hàm được định nghĩa bên trong này của hàm này
  const getAllRoles = async () => {
    let data = await fetchAllRoles();
    if (data && +data.EC === 0) {
      setListRoles(data.DT);
    }
  };

  const getRoles = async (page) => {
    try {
      let response = await fetchRoleWithPage(currentPage, currentLimit);
      if (response && response.EC === 0) {
        setTotalPages(response.DT.totalPages);
        setListRoles(response.DT.roles);
      }
    } catch (e) {
      console.log("error 2", e);
    }
  };
  const handleDeleteRole = async (role) => {
    let data = await deleteRoles(role);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      await getRoles();
    }
  };

  const handlePageClick = async (event) => {
    let newPage = +event.selected + 1;
    localStorage.setItem("pageNumber", newPage);
    setPage(newPage);
  };
  return (
    <div className="container">
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
            forcePage={currentPage - 1}
          />
        </div>
      )}
    </div>
  );
});

export default TableRole;
