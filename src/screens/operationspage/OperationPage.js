import React, { Component } from "react";
import "./OperationPage.css";
import MainContext from "../../context/main-context";
import config from "../../config";
import Swal from "sweetalert2";

class operationPage extends Component {
  state = {
    operators: [],
    errors: [],
    operations: [],
    operationErrors: [],
  };

  static contextType = MainContext;

  componentDidMount = () => {
    if (
      this.context.errors.length === 0 ||
      this.context.operations.length === 0
    ) {
      this.fetchErrors();
      this.fetchOperators();
      this.fetchOperations();
    } else {
      const operationErrors = this.context.errors.filter(
        (operationError) =>
          operationError.operation_id === parseInt(this.props.match.params.id)
      );
      this.setState({
        operators: this.context.operators,
        errors: this.context.errors,
        operations: this.context.operations,
        operationErrors,
      });
    }
  };

  fetchErrors = () => {
    fetch(`${config.API_ENDPOINT}/api/errors`, {
      method: "Get",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const operationErrors = res.filter(
          (operationError) =>
            operationError.operation_id === parseInt(this.props.match.params.id)
        );
        this.setState({
          operationErrors,
          errors: res,
        });
      })
      .catch((err) => {
        Swal.fire(`error: ${err}`);
      });
  };

  fetchOperators = () => {
    fetch(`${config.API_ENDPOINT}/api/operators`, {
      method: "Get",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ operators: res });
      })
      .catch((err) => {
        Swal.fire(`error: ${err}`);
      });
  };

  fetchOperations = () => {
    fetch(`${config.API_ENDPOINT}/api/operations`, {
      method: "Get",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ operations: res });
      })
      .catch((err) => {
        Swal.fire(`error: ${err}`);
      });
  };

  render() {
    const operationDetails = {
      ...this.state.operations.filter(
        (el) => el.id === parseInt(this.props.match.params.id)
      )[0],
    };

    const reportedErrorContent =
      this.state.operationErrors.length === 0 ? (
        <div>
          {" "}
          <h4 className="reported_error_content-h4">
            No Errors Reported for this operation
          </h4>
        </div>
      ) : (
        <ul className="poller__details-page-error-list">
          {this.state.operationErrors.map((pollerError, i) => {
            const reportedBy = this.state.operators.filter((oper) => {
              return oper.id === parseInt(pollerError.operator_id);
            });
            const oper = { ...reportedBy[0] };
            return (
              <li key={i} className="reported-error">
                <p>
                  <span>Reported by:</span> {oper.username} on{" "}
                  {new Date(pollerError.posted).toLocaleString()}
                </p>
                <p>
                  <span>Error decription:</span> {pollerError.error_description}
                </p>
              </li>
            );
          })}
        </ul>
      );
    return (
      <div className="poller__details-page">
        <h1>Operation Details Page</h1>
        <div className="poller-description">
          <p>
            <span>Operation Name:</span> {operationDetails.operation_name}
          </p>
          <p>
            <span>Operation Description:</span> {operationDetails.description}
          </p>
        </div>
        <div>
          <h4>Reported Errors</h4>
          {reportedErrorContent}
        </div>
      </div>
    );
  }
}

export default operationPage;
