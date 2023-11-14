import "./App.scss";
import Nav from "./components/Navigation/Nav";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
function App() {
  return (
    <>
      <div className="app-container">
        {/* <Nav /> */}
        <Routes>
          <Route path="/news" element={<div>news</div>} />
          <Route path="/about" element={<div>about</div>} />
          <Route path="/contact" element={<div>contact</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<div>home</div>} />
          <Route path="*" element={<div>404 not found</div>} />
        </Routes>
      </div>
    </>
  );
}
export default App;
