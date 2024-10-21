import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useNavigate } from 'react-router-dom';

// Register Chart.js components
Chart.register(...registerables);

// Mock financial data
const mockFinancialData = [
  { month: 1, year: 2024, totalRevenue: 150000, totalExpenses: 90000 },
  { month: 2, year: 2024, totalRevenue: 200000, totalExpenses: 120000 },
  // Add more data as needed...
];

// Function to calculate revenue
const calculateRevenue = (viewType, selectedMonth, selectedYear) => {
  let result = [];
  let totalRevenue = 0;
  let totalExpenses = 0;

  if (viewType === 'monthly') {
    result = mockFinancialData.filter(data => data.year === selectedYear);
    totalRevenue = result.reduce((acc, curr) => acc + curr.totalRevenue, 0);
    totalExpenses = result.reduce((acc, curr) => acc + curr.totalExpenses, 0);
  }
  
  return {
    result,
    totalRevenue,
    totalExpenses
  };
};

const RevenueChart = () => {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState('monthly'); 
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Prepare chart data
  const { result: revenueForChart = [], totalRevenue = 0, totalExpenses = 0 } = calculateRevenue(viewType, null, selectedYear);
  
  const data = {
    labels: revenueForChart.map(item => `Month ${item.month}`),
    datasets: [
      {
        label: 'Revenue',
        data: revenueForChart.map(item => item.totalRevenue || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.8)', // Changed for better visibility
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(75, 192, 192, 1)',
        hoverBorderColor: 'rgba(255, 255, 255, 1)',
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: revenueForChart.map(item => item.totalExpenses || 0),
        backgroundColor: 'rgba(255, 99, 132, 0.8)', // Changed for better visibility
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(255, 99, 132, 1)',
        hoverBorderColor: 'rgba(255, 255, 255, 1)',
        tension: 0.4,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
            family: 'Arial',
            weight: 'bold',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount ($)',
          color: '#333',
          font: {
            size: 16,
            weight: 'bold',
          }
        },
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`, // Format y-axis labels
        },
      },
      x: {
        title: {
          display: true,
          text: 'Months',
          color: '#333',
          font: {
            size: 16,
            weight: 'bold',
          }
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8 lg:p-10">
     <div className="w-full flex justify-start mt-7"> {/* This div wraps the button for alignment */}
    <button
      onClick={() => navigate("/adminDashboard")}
      className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
    >
      Back
    </button>
  </div>
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-4 text-gray-800 text-center">Revenue Overview</h2>

        {/* View Type and Year Selector */}
        <div className="mb-6 flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4">
          <div className="flex items-center mb-2 sm:mb-0">
            <label className="mr-2 font-medium text-gray-600">Select View:</label>
            <select
              className="px-4 py-2 rounded border bg-white shadow-md hover:shadow-lg transition"
              value={viewType}
              onChange={(e) => setViewType(e.target.value)}
            >
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="mr-2 font-medium text-gray-600">Select Year:</label>
            <select
              className="px-4 py-2 rounded border bg-white shadow-md hover:shadow-lg transition"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            >
              {[2023, 2024].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="relative w-full max-w-full h-[300px] md:h-[400px] lg:h-[450px] bg-white p-4 rounded-lg shadow-lg mb-6">
        <Bar data={data} options={options} />
      </div>

      {/* Revenue Summary Table */}
      <div className="w-full max-w-full md:max-w-3xl bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
        <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">Revenue Summary</h3>
        <table className="min-w-full table-auto text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 font-semibold">Period</th>
              <th className="px-4 py-2 font-semibold">Revenue</th>
              <th className="px-4 py-2 font-semibold">Expenses</th>
              <th className="px-4 py-2 font-semibold">Profit/Loss</th>
            </tr>
          </thead>
          <tbody>
            {revenueForChart.map(item => (
              <tr key={item.month} className="border-b hover:bg-gray-100 transition">
                <td className="px-4 py-2">{`Month ${item.month}`}</td>
                <td className="px-4 py-2">${item.totalRevenue.toLocaleString()}</td>
                <td className="px-4 py-2">${item.totalExpenses.toLocaleString()}</td>
                <td className={`px-4 py-2 ${item.totalRevenue - item.totalExpenses < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  ${((item.totalRevenue || 0) - (item.totalExpenses || 0)).toLocaleString()}
                </td>
              </tr>
            ))}
            <tr className="font-bold">
              <td className="px-4 py-2">Total</td>
              <td className="px-4 py-2">${totalRevenue.toLocaleString()}</td>
              <td className="px-4 py-2">${totalExpenses.toLocaleString()}</td>
              <td className={`px-4 py-2 ${totalRevenue - totalExpenses < 0 ? 'text-red-600' : 'text-green-600'}`}>
                ${((totalRevenue || 0) - (totalExpenses || 0)).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueChart;
