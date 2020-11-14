import React from "react";
// import "./PollersPage.css";
import MainContext from "../../context/main-context";
import { Link } from "react-router-dom";

const tasksPage = () => {
  return (
    <MainContext.Consumer>
      {(context) => {
        const pollersList = context.tasks.map((task, i) => {
          const taskLink = `/operations/${task.id}`;
          return (
            <li key={i} className="poller">
              <div className="poller-details">
                <p>
                  <span>Task Name:</span>
                  {task.operation_name}
                </p>
                <p>
                  <span>Task Description:</span>
                  {task.description}
                </p>
              </div>
              <Link to={taskLink}>
                <button>View Errors</button>
              </Link>
            </li>
          );
        });
        return (
          <div className="pollerPage">
            <h1>All Tasks</h1>
            <ul>{pollersList}</ul>
          </div>
        );
      }}
    </MainContext.Consumer>
  );
};

export default tasksPage;
