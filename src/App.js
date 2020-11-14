import React, { Component } from "react";
import Main from "./components/main/Main";
import Side from "./components/side/Side";
import config from "./config";
import Swal from "sweetalert2";
import MainContext from "./context/main-context";

class App extends Component {
  state = {
    pollers: [],
    operators: [],
    errors: [],
    tasks: [],
    taskErrors: 0,
    pollerErrors: 0,
    operations: [],
    operationErrorList: [],
  };

  objectToCsv = (data) => {
    const csvRows = [];

    // get headers
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));

    // loop over rows
    for (const row of data) {
      const values = headers.map((header) => {
        const escaped = row[header].replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }
    // form escaped comma separated values
    return csvRows.join("\n");
  };

  download = (data) => {
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "operationsReport.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  handleCsvDownloadButton = async () => {
    const data = await this.state.errors.map((row) => {
      const operation = this.state.operations.filter(
        (el) => el.id === row.operation_id
      );
      const oper = this.state.operators.filter(
        (el) => el.id === parseInt(row.operator_id)
      );
      const loggedOn = new Date(row.posted).toLocaleString("en-US", {
        timeZone: "America/New_York",
      });
      const csvObj = {
        operation: operation[0].operation_name,
        operationType: operation[0].category,
        reportedBy:
          oper[0].first_name.toUpperCase() +
          " " +
          oper[0].last_name.toUpperCase(),
        dateLogged: loggedOn,
        description: row.error_description,
      };
      return csvObj;
    });
    const csvData = this.objectToCsv(data);
    this.download(csvData);
  };

  componentDidMount = () => {
    this.fetchOperations();
    this.fetchOperators();
    this.fetchErrors();
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
        const pollers = res.filter((res) => res.category === "poller");
        const tasks = res.filter((res) => res.category === "task");
        this.setState({
          pollerErrors: pollers.length,
          taskErrors: tasks.length,
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
        const pollers = res.filter((res) => res.category === "poller");
        const tasks = res.filter((res) => res.category === "task");
        this.setState({ operations: res, tasks, pollers });
      })
      .catch((err) => {
        Swal.fire(`error: ${err}`);
      });
  };

  render() {
    return (
      <MainContext.Provider
        value={{
          pollers: this.state.pollers,
          operators: this.state.operators,
          operations: this.state.operations,
          errors: this.state.errors,
          tasks: this.state.tasks,
          taskErrors: this.state.taskErrors,
          pollerErrors: this.state.pollerErrors,
          handleCsvDownloadButton: this.handleCsvDownloadButton,
        }}
      >
        <div className="App">
          <Side />
          <Main />
        </div>
      </MainContext.Provider>
    );
  }
}

export default App;
