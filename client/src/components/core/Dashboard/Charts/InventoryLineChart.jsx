import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function InventoryLineChart({ categories2 = [], trendData = {} }) {
  const [selectedCategory, setSelectedCategory] = useState(categories2[0] || "");

  useEffect(() => {
    if (categories2.length > 0) {
      setSelectedCategory(categories2[0]);
    }
  }, [categories2]);

  const chartData = {
    labels: ["July", "Aug", "Sept", "Oct", "Nov"],
    datasets: [
      {
        label: `${selectedCategory} Monthly Stock Levels`,
        data: trendData[selectedCategory] || Array(5).fill(0), // Fallback to zero data
        borderColor: "#98c3ec",
        backgroundColor: "rgba(202, 233, 255, 1)",
        fill: true,
        tension: 0.4,
        pointBorderColor: "#032833",
        pointBackgroundColor: "#ffffff",
        pointBorderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        ticks: { color: "#032833" },
        grid: { display: false },
      },
      y: {
        title: {
          display: true,
          text: "Stock Levels (Units)",
          color: "#333333",
          font: { size: 14, weight: "bold" },
        },
        ticks: { color: "#032833", beginAtZero: true },
        grid: { borderDash: [5, 5], color: "rgba(0, 0, 0, 0.1)" },
        min: 0, 
      },
    },
    elements: {
      line: {
        borderWidth: 2,
        borderCapStyle: "round",
        borderJoinStyle: "round",
      },
    },
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="flex flex-col items-center w-full h-auto">
      <h2 className="text-[18px] font-medium text-center text-bold text-richblue-600">
        Monthly Stock Levels by Category
      </h2>
      <div className="w-full flex justify-evenly items-center p-2">
        <h2 className="text-[14px]  font-medium text-center text-richblue-400">
          Select a Category:
        </h2>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border border-blue-600 py-2 px-4 rounded-lg text-sm ml-3 text-blue-700"
        >
          {categories2.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full h-48">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default InventoryLineChart;
