import React from "react";
import MainContext from "../../context/main-context";
import "./ErrorsPage.css";
import { Link } from "react-router-dom";

const errorPage = (props) => {
  return (
    <MainContext.Consumer>
      {(context) => {
        const operationErrors = context.errors.map((operationError, i) => {
          const operation = context.operations.filter(
            (el) => el.id === operationError.operation_id
          );
          const oper = context.operators.filter(
            (el) => el.id === parseInt(operationError.operator_id)
          );
          const loggedOn = new Date(operationError.posted).toLocaleString();

          return (
            <li key={i}>
              <div>
                <div className="operation-header">
                  <Link to={`/errors/${operationError.error_id}`}>
                    <h2>Operation - {operation[0].operation_name}</h2>
                  </Link>
                </div>
                <div>
                  <div className="error-details">
                    <p className="error-details_title">Logged:</p>
                    <p className="error-details-info">{loggedOn}</p>
                  </div>
                  <div className="error-details">
                    <p className="error-details_title">Reported By:</p>
                    <p className="error-details-info">
                      {oper[0].first_name.toUpperCase()}{"  "}
                      {oper[0].last_name.toUpperCase()}
                    </p>
                  </div>
                  <div className="err-description">
                    <p className="err-description-title">Description</p>
                    <p>{operationError.error_description}</p>
                  </div>
                </div>
              </div>
            </li>
          );
        });
        return (
          <div className="error__page">
            <div className="error__page-header">
              <h1 className="error__page-header-title">Latest operation Errors</h1>
              <button
                onClick={context.handleCsvDownloadButton}
                className="error__page-header-button"
              >
                Get Report
              </button>
            </div>

            <ul className="operation__errors-list">{operationErrors}</ul>
          </div>
        );
      }}
    </MainContext.Consumer>
  );
};

export default errorPage;
