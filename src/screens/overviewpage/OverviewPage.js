import React from "react";
import { Component } from "react";
import Swal from "sweetalert2";
import MyBarChart from "../../components/barchart/MyBarChart";
import MyPieChart from "../../components/piechart/MyPieChart";
import MainContext from "../../context/main-context";
import Backdrop from "../../components/Backdrop/Backdrop";
import Modal from "../../components/Modal/Modal";
import config from "../../config";
import "./OverviewPage.css";

class OverviewPage extends Component {
  state = {
    loggingError: false,
    isLoading: false,
    addingOperation: false,
    addingOperator: false,
  };

  static contextType = MainContext;

  isActive = true;

  constructor(props) {
    super(props);
    this.operationIdElRef = React.createRef();
    this.descriptionElRef = React.createRef();
    this.operatorElRef = React.createRef();
    this.operationNameElRef = React.createRef();
    this.operationTypeElRef = React.createRef();
    this.operationDescriptionElRef = React.createRef();
    this.operLastNameElRef = React.createRef();
    this.operFirstNameElRef = React.createRef();
  }

  logErrorHandler = () => {
    this.setState({ loggingError: true });
  };

  addOperationError = () => {
    this.setState({ addingOperation: true });
  };

  addOperator = () => {
    this.setState({ addingOperator: true });
  };

  modalCancelHandler = () => {
    this.setState({
      loggingError: false,
      addingOperation: false,
      addingOperator: false,
    });
  };

  modalLogErrorHandler = () => {
    if (
      this.operatorElRef.current.value.length !== 0 &&
      this.descriptionElRef.current.value !== 0
    ) {
      // first trim all white spaces
      // transform to lowercase
      const operator_id = this.operatorElRef.current.value;
      const error_description = this.descriptionElRef.current.value.trim();
      const operation_id = this.operationIdElRef.current.value;

      const newError = {
        operator_id,
        error_description,
        operation_id,
      };
      fetch(`${config.API_ENDPOINT}/api/errors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newError),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.setState({ loggingError: false, addingOperation: false });
          this.context.errors.push(res);
          Swal.fire(`${res.error_description} has been added`);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: `Error: ${err}`,
          });
        });
    }
    return null;
  };

  modalAddOperationHandler = async () => {
    // check if input has a value
    if (
      this.operationNameElRef.current.value.length !== 0 &&
      this.operationDescriptionElRef.current.value.length !== 0 &&
      this.operationTypeElRef.current.value.length !== 0
    ) {
      // first trim all white spaces
      // transform to lowercase
      const operationName = this.operationNameElRef.current.value
        .trim()
        .toLowerCase();
      const description = this.operationDescriptionElRef.current.value
        .trim()
        .toLowerCase();

      const operationType = this.operationTypeElRef.current.value
        .trim()
        .toLowerCase();

      // check if the operation name exists in DB
      // if it does throw error
      // if not push to db and update operations list
      const newOperation = {
        operation_name: operationName,
        description,
        operationType,
      };
      const results = await fetch(`${config.API_ENDPOINT}/api/operations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOperation),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.setState({ loggingError: false, addingOperation: false });
          Swal.fire(`${res.operation_name} has been added`);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: `Error: ${err}`,
          });
        });
      return results;
    }
    return null;
  };

  modalAddOperatorHandler = async () => {
    // check if input has a value
    if (
      this.operLastNameElRef.current.value.length !== 0 &&
      this.operFirstNameElRef.current.value.length !== 0
    ) {
      // first trim all white spaces
      // transform to lowercase
      const newOper = {
        first_name: this.operFirstNameElRef.current.value.trim().toLowerCase(),
        last_name: this.operLastNameElRef.current.value.trim().toLowerCase(),
        username:
          this.operFirstNameElRef.current.value.split("")[0] +
          this.operLastNameElRef.current.value.trim().toLowerCase(),
      };

      const results = await fetch(`${config.API_ENDPOINT}/api/operators`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOper),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.context.operators.push(res);
          this.setState({
            loggingError: false,
            addingOperation: false,
            addingOperator: false,
          });
          Swal.fire(`${res.username} has been added`);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: `Error: ${err}`,
          });
        });
      return results;
    }
    return null;
  };

  render() {
    return (
      <>
        {(this.state.loggingError ||
          this.state.addingOperator ||
          this.state.addingOperation) && <Backdrop />}
        {this.state.loggingError && (
          <Modal
            title="Log Error"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalLogErrorHandler}
            confirmText="Log"
          >
            <form>
              <div className="form-control">
                <label htmlFor="operation">operation</label>
                <select ref={this.operationIdElRef}>
                  {this.context.operations.map((operation, i) => {
                    return (
                      <option key={i} value={operation.id}>
                        {operation.operation_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-control">
                <label htmlFor="operator">Operator</label>

                <select ref={this.operatorElRef}>
                  {this.context.operators.map((oper, i) => {
                    return (
                      <option key={oper.id} value={oper.id}>
                        {oper.username.toUpperCase()}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-control">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows="4"
                  ref={this.descriptionElRef}
                ></textarea>
              </div>
            </form>
          </Modal>
        )}
        {this.state.addingOperation && (
          <Modal
            title="Add operation"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalAddOperationHandler}
            confirmText="Add"
          >
            <form>
              <div className="form-control">
                <label htmlFor="operation">operation Name</label>
                <input
                  type="text"
                  id="operation"
                  ref={this.operationNameElRef}
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="operationDescription">Description</label>
                <textarea
                  id="operationDescription"
                  rows="4"
                  ref={this.operationDescriptionElRef}
                  required
                ></textarea>
              </div>
            </form>
          </Modal>
        )}
        {this.state.addingOperator && (
          <Modal
            title="Add Operator"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalAddOperatorHandler}
            confirmText="Add"
          >
            <form>
              <div className="form-control">
                <label htmlFor="operator">First Name</label>
                <input
                  type="text"
                  id="operator_first_name"
                  ref={this.operFirstNameElRef}
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="operator">Last Name</label>
                <input
                  type="text"
                  id="operator_last_name"
                  ref={this.operLastNameElRef}
                  required
                />
              </div>
            </form>
          </Modal>
        )}
        <div className="overview-page">
          <div className="welcome">
            <h1>WELCOME TO YOUR DASHBOARD</h1>
            <div className="welcome-buttons">
              <button onClick={this.addOperator}>ADD OPER</button>
              <button onClick={this.addOperationError}>ADD OPERATION</button>
              <button onClick={this.logErrorHandler}>LOG ERROR</button>
            </div>
          </div>
          <div className="chart">
            <MyBarChart />
            <MyPieChart />
          </div>
        </div>
      </>
    );
  }
}

export default OverviewPage;
