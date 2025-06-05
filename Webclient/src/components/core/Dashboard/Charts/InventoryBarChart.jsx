import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function InventoryBarChart({ categories, currentData, pastData }) {
  const data = {
    labels: categories,
    datasets: [
      {
        label: "Current Month",
        data: currentData, // Example data for the current month
        backgroundColor: "#98c3ec", // Light blue for current month
        borderColor: "#032833",
        borderWidth: 1,
      },
      {
        label: "Past Month",
        data: pastData, // Example data for the past month
        backgroundColor: "#1866b4", // Dark blue for past month
        borderColor: "#032833",
        borderWidth: 1,
      },
    ],
  };

  // Options for the bar chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Inventory Comparison: Current vs. Past Month",
        font: {
          size: 15,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#032833",
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "Units in Inventory",
          color: "#333333",
          font: {
            size: 13,
            weight: "bold",
          },
        },
        ticks: {
          color: "#032833",
        },
        grid: {
          borderDash: [5, 5],
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  return (
    <div className="w-full h-full items-center">
      <Bar data={data} options={options} height="full" width="full" />
    </div>
  );
}

export default InventoryBarChart;
