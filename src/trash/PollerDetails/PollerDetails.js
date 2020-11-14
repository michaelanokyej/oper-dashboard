import React, { Component } from "react";
import "./operationDetails.css";
import MainContext from "../../context/main-context";

class operationDetails extends Component {
  static contextType = MainContext;

  operation = this.context.operations.filter(
    (el) => el.id === parseInt(this.props.match.params.id)
  );

  operationErrors = this.context.errors.filter(
    (operationError) =>
      operationError.operation_id === parseInt(this.props.match.params.id)
  );

  render() {
    const operationDetails = { ...this.operation[0] };
    const reportedErrorContent = this.operationErrors.length === 0 ? (<div> <h4 className="reported_error_content-h4">No Errors Reported for this operation</h4></div>) : (
      <ul className="operation__details-page-error-list">
            {this.operationErrors.map((operationError, i) => {
              const reportedBy = this.context.operators.filter((oper) => {
                return oper.id === parseInt(operationError.operator);
              });
              const oper = { ...reportedBy[0] };
              return (
                <li key={i} className="reported-error">
                  <p>
                    <span>Reported by:</span> {oper.name} on{" "}
                    {new Date(operationError.posted).toLocaleString()}
                  </p>
                  <p>
                    <span>Error decription:</span>{" "}
                    {operationError.error_description}
                  </p>
                </li>
              );
            })}
          </ul>
    )
    return (
      <div className="operation__details-page">
        <h1>operation Details Page</h1>
        <div className="operation-description">
          <p>
            <span>operation Name:</span> {operationDetails.operation_name}
          </p>
          <p>
            <span>operation Description:</span> {operationDetails.description}
          </p>
        </div>
        <div>
          <h4>Reported Errors</h4>
          {reportedErrorContent}
          {/* <ul className="operation__details-page-error-list">
            {this.operationErrors.map((operationError, i) => {
              const reportedBy = this.context.operators.filter((oper) => {
                return oper.id === parseInt(operationError.operator);
              });
              const oper = { ...reportedBy[0] };
              return (
                <li key={i} className="reported-error">
                  <p>
                    <span>Reported by:</span> {oper.name} on{" "}
                    {new Date(operationError.posted).toLocaleString()}
                  </p>
                  <p>
                    <span>Error decription:</span>{" "}
                    {operationError.error_description}
                  </p>
                </li>
              );
            })}
          </ul> */}
        </div>
      </div>
    );
  }
}

export default operationDetails;
