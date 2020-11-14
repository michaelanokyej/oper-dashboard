import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import MainContext from "../../context/main-context";

const MyPieChart = () => {
  const mainContext = useContext(MainContext);

  const data = {
    labels: ["Pollers", "Tasks"],
    datasets: [
      {
        label: "# of Errors",
        data: [
          mainContext.pollerErrors > 0 ? mainContext.pollerErrors : 0,
          mainContext.taskErrors > 0 ? mainContext.taskErrors : 0,
        ],
        backgroundColor: ["rgba(8, 183, 236, 0.726)", "rgba(176, 53, 233, 0.726)"],
        borderColor: ["rgba(8, 183, 236, 0.726)", "rgba(176, 53, 233, 0.726)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="piechart">
      <h5>Tasks To Poller Error Ratio</h5>
      <Doughnut data={data} />
    </div>
  );
};

export default MyPieChart;
