import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Users from "../components/ManageUsers/Users";
import Project from "../components/ProjectUser/ProjectUser";
const config = {
  routes: {
    login: "/login",
    register: "/register",
    users: "/users",
    project: "/project",
  },
};
const privateRoutes = [
  { path: config.routes.users, component: Users },
  { path: config.routes.login, component: Login },
  { path: config.routes.register, component: Register },
  { path: config.routes.project, component: Project },
];
export { config, privateRoutes };
