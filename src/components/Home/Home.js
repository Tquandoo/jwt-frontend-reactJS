import "./Home.scss";

const Home = () => {
  // const { user } = useContext(UserContext);

  // useEffect(() => {
  //   if (user && user.isAuthenticated === true) {

  //   }
  // }, []);
  return (
    <>
      <div className="container mt-3">
        <h3>Welcome!</h3>
        <h5></h5>
        <p>"Một project tôi tự thiết kế để phục vụ cho việc học tập"</p>
        <span>
          <p>
            <b>
              "Tôi muốn thông qua mini project này để học trở thành Fullstack
              Developer"
            </b>
            có kiến thức về thiết kế giao diện người dịch frontend, và server
            backend
          </p>
        </span>
        <span>
          <h4>Trong project này tôi đã sử dụng và học tập các kiến thức:</h4>
        </span>
        <ol>
          <li className="my-2">Thư viện ReactJs</li>
          <li>Framework Express & Plaform NodeJs</li>
          <li className="my-2">
            Hiểu được cách tư duy & thiết kế tự Design được database SQL: cơ sở
            dữ liệu quan hệ MySQL
          </li>
          <li className="my-2">
            Giao diện website cơ bản bootstrap5, reponsive
          </li>
        </ol>
        <h4>
          Qua mini project trên tôi đã có được kiến thức căn bản của cả backend
          & frontend trên con đường trở thành Fullstack Developer Không dễ dàng,
          tôi hy vọng qua một vài dự án nhỏ này sẽ giúp tôi có thêm nhiều kiến
          thức và kinh nghiệm hơn nữa. Cố lên ^
        </h4>
      </div>
    </>
  );
};

export default Home;
