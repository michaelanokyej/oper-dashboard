import React, { Component } from "react";
import config from "../../config";
import Swal from "sweetalert2";
import { Bar } from "react-chartjs-2";

class MyBarChart extends Component {
  state = {
    operations: [],
    myLabels: [],
    operationErrors: [],
    myBackgroundColors: [],
    myBorderColors: [],
  };


  componentDidMount = () => {
    this.fetchOperationsWithErrors();
  };

  getBorderColor = (num) => {
    if (num < 4) {
      return "rgba(239, 243, 5, 0.623)";
    } else if (num >= 4 && num <= 10) {
      return "rgba(250, 143, 4, 0.609)";
    } else {
      return "rgba(250, 4, 4, 0.575)";
    }
  };

  getBackgroundColor = (num) => {
    if (num < 4) {
      return "rgba(239, 243, 5, 0.623)";
    } else if (num >= 4 && num <= 10) {
      return "rgba(250, 143, 4, 0.609)";
    } else {
      return "rgba(250, 4, 4, 0.575)";
    }
  };

  fetchOperationsWithErrors = () => {
    fetch(`${config.API_ENDPOINT}/api/chart`, {
      method: "Get",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const myLabels = [];
        const operationErrors = [];
        const myBackgroundColors = [];
        const myBorderColors = [];

        for (let operation of res) {
          myLabels.push(operation.operation_name);
          operationErrors.push(operation.operation_errors);
          myBackgroundColors.push(
            this.getBackgroundColor(operation.operation_errors)
          );
          myBorderColors.push(this.getBorderColor(operation.operation_errors));
        }
        this.setState({
          operations: res,
          myLabels,
          operationErrors,
          myBackgroundColors,
          myBorderColors,
        });
      })
      .catch((err) => {
        Swal.fire(`error: ${err}`);
      });
  };

  render() {
    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    const data = {
      labels: this.state.myLabels,
      datasets: [
        {
          label: "Number of Unfixed Errors",
          data: this.state.operationErrors,
          backgroundColor: this.state.myBackgroundColors,
          borderColor: this.state.myBorderColors,
          borderWidth: 1,
        },
      ],
    };

    return (
      <div className="barchart">
        <Bar data={data} options={options} />
      </div>
    );
  }
}

export default MyBarChart;
