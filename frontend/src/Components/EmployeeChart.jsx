import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const EmployeeChart = ({ employees }) => {
  const barChartRef = useRef(null);

  // Group employees by department and count the number of employees in each department
  const departmentCounts = employees.reduce((acc, employee) => {
    const department = employee.department;
    if (!acc[department]) {
      acc[department] = 0;
    }
    acc[department]++;
    return acc;
  }, {});

  const departments = Object.keys(departmentCounts);
  const counts = Object.values(departmentCounts);

  useEffect(() => {
    const barCtx = barChartRef.current.getContext("2d");

    const barChart = new Chart(barCtx, {
      type: "bar",
      data: {
        labels: departments,
        datasets: [
          {
            label: "Number of Employees",
            data: counts,
            backgroundColor: departments.map(
              (_, index) => `hsl(${index * 60}, 70%, 50%)`
            ), // Different color for each department
            barThickness: 20,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1, // Ensure the scale increments by 1
              callback: function (value) {
                return Number.isInteger(value) ? value : null; // Only display integer values
              },
            },
          },
        },
      },
    });

    return () => {
      barChart.destroy();
    };
  }, [departments, counts]);

  return (
    <div className="flex items-center">
      <div style={{ width: "500px", height: "400px" }}>
        <canvas ref={barChartRef} />
      </div>
    </div>
  );
};

export default EmployeeChart;
