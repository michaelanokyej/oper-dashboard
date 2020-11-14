import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import OverviewPage from "../../screens/overviewpage/OverviewPage";
import ErrorDetailsPage from "../../screens/errorspage/ErrorDetailsPage";
import TasksPage from "../../screens/taskspage/TasksPage";
import PollersPage from "../../screens/pollerspage/PollersPage";
import ErrorsPage from "../../screens/errorspage/ErrorsPage";
import OperationPage from "../../screens/operationspage/OperationPage";
// import ProfilePage from "../../screens/profilepage/ProfilePage";
import "./Main.css";

const Main = () => {
  return (
    <div className="main-page">
      <nav className="navbar">
        <ul className="main-routes">
          <li className="route-item">
            <NavLink to="/">Overview</NavLink>
          </li>
          <li className="route-item">
            <NavLink to="/pollers">Pollers</NavLink>
          </li>
          <li className="route-item">
            <NavLink to="/tasks">Tasks</NavLink>
          </li>
          <li className="route-item">
            <NavLink to="/errors">Errors</NavLink>
          </li>
        </ul>
        {/* <ul className="other-routes">
          <li className="search-li">
            <input type="text" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              id="vector"
            >
              <path
                id="path"
                d="M 27.414 24.586 L 22.337 19.509 C 23.386 17.928 24 16.035 24 14 C 24 8.486 19.514 4 14 4 C 8.486 4 4 8.486 4 14 C 4 19.514 8.486 24 14 24 C 16.035 24 17.928 23.386 19.509 22.337 L 24.586 27.414 C 25.366 28.195 26.634 28.195 27.414 27.414 C 28.195 26.633 28.195 25.367 27.414 24.586 Z M 7 14 C 7 10.14 10.14 7 14 7 C 17.86 7 21 10.14 21 14 C 21 17.86 17.86 21 14 21 C 10.14 21 7 17.86 7 14 Z"
                fill="#000000"
                strokeWidth="1"
              />
            </svg>
          </li>
          <li className="route-item">
            <NavLink to="/me">Profile</NavLink>
          </li>
          <li className="route-item li-button">
            <button>logout</button>
          </li>
        </ul> */}
      </nav>
      <div className="main-body">
        <Switch>
          <Route exact path="/" component={OverviewPage} />
          <Route exact path="/pollers" component={PollersPage} />
          <Route exact path="/tasks" component={TasksPage} />
          <Route exact path="/errors" component={ErrorsPage} />
          <Route exact path="/operations/:id" component={OperationPage} />
          <Route exact path="/errors/:id" component={ErrorDetailsPage} />
          {/* <Route path="/me" component={ProfilePage} /> */}
        </Switch>
      </div>
    </div>
  );
};

export default Main;
