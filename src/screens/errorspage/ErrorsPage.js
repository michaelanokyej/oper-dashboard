import React, { Component } from "react";
import MainContext from "../../context/main-context";
import "./ErrorsPage.css";
import config from "../../config";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

class errorPage extends Component {
  state = {
    operators: [],
    errors: [],
    operations: [],
  };

  static contextType = MainContext;

  componentWillMount = () => {
    console.log("context:", this.context);
    if (
      this.context.errors.length === 0 ||
      this.context.operations.length === 0 ||
      this.context.operators.length === 0
    ) {
      this.fetchErrors();
      this.fetchOperators();
      this.fetchOperations();
    } else {
      this.setState({
        operators: this.context.operators,
        errors: this.context.errors,
        operations: this.context.operations,
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
        // const operationErrors = res.filter(
        //   (operationError) =>
        //     operationError.operation_id === parseInt(this.props.match.params.id)
        // );
        this.setState({
          // operationErrors,
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
    const operationErrors = this.state.errors.map((operationError, i) => {

      const operation = {
        ...this.state.operations.find(
          (el) => el.id === operationError.operation_id
        ),
      };
      const oper = {
        ...this.state.operators.find(
          (el) => el.id === parseInt(operationError.operator_id)
        ),
      };
      // const operation = {...this.state.operations.filter(
      //   (el) => el.id === operationError.operation_id
      // )[0]};
      // const oper = {...this.state.operators.filter(
      //   (el) => el.id === parseInt(operationError.operator_id)
      // )[0]};
      const loggedOn = new Date(operationError.posted).toLocaleString();

      return (
        <li key={i}>
          <div>
            <div className="operation-header">
              <Link to={`/errors/${operationError.error_id}`}>
                <h2>Operation - {operation.operation_name}</h2>
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
                  {oper.first_name.toUpperCase()}
                  {"  "}
                  {oper.last_name.toUpperCase()}
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
            onClick={this.context.handleCsvDownloadButton}
            className="error__page-header-button"
          >
            Get Report
          </button>
        </div>

        <ul className="operation__errors-list">{operationErrors}</ul>
      </div>
    );
  }
}

export default errorPage;
