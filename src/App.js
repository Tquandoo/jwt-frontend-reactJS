import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState, useContext } from "react";
import AppRoutes from "./routes/AppRoutes";
import { Router } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import { UserContext } from "./context/UserContext";
import NavHeader from "./components/Navigation/NavHeader";
import { Scrollbar } from "react-scrollbars-custom";
const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {user && user.isLoading ? (
        <div className="loading-container">
          <Rings
            height="100"
            width="100"
            color="#1877f2"
            radius="6"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
          />

          <div>loading data...</div>
        </div>
      ) : (
        <>
          <div className="app-header">
            <NavHeader />
          </div>
          <div className="app-container">
            <AppRoutes />
          </div>
        </>
      )}

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};
export default App;
