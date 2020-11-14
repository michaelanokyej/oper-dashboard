import React from "react";
import "./PollersPage.css";
import MainContext from "../context/main-context";
import { Link } from "react-router-dom";

const pollersPage = () => {
  return (
    <MainContext.Consumer>
      {(context) => {
        const pollersList = context.pollers.map((poller, i) => {
          const pollerLink = `/pollers/${poller.id}`;
          return (
            <li key={i} className="poller">
              <div className="poller-details">
                <p>
                  <span>Poller Name:</span>
                  {poller.operation_name}
                </p>
                <p>
                  <span>Poller Description:</span>
                  {poller.description}
                </p>
              </div>
              <Link to={pollerLink}>
                <button>View Errors</button>
              </Link>
            </li>
          );
        });
        return (
          <div className="pollerPage">
            <h1>All Pollers</h1>
            <ul>{pollersList}</ul>
          </div>
        );
      }}
    </MainContext.Consumer>
  );
};

export default pollersPage;
