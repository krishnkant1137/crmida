// src/assets/components/RevenueLineChart.jsx

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


// Register Chart.js components
Chart.register(...registerables);

const RevenueLineChart = () => {
  const navigate = useNavigate()

  const [timePeriod, setTimePeriod] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching revenue data from a fake API
  useEffect(() => {
    const fetchRevenueData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts'); // Replace with actual API
        const fakeData = response.data.slice(0, 12).map((item, index) => ({
          month: index + 1,
          year: 2024,
          currentRevenue: Math.floor(Math.random() * 5000) + 1000,
          lastYearRevenue: Math.floor(Math.random() * 5000) + 1000,
        }));
        setRevenueData(fakeData);
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, [selectedMonth, selectedYear]);

  // Filter the data for the last 6 months
  const filteredData = revenueData.filter(
    (item) =>
      item.year === selectedYear && item.month >= selectedMonth - 5 && item.month <= selectedMonth
  );

  // Calculate total revenue, percentage growth/loss for the table
  const totalRevenue = filteredData.reduce((acc, curr) => acc + curr.currentRevenue, 0);

  const growthData = filteredData.map((item, index, arr) => {
    if (index === 0) return { growth: 0, loss: 0 }; // No growth comparison for the first month

    const prevRevenue = arr[index - 1].currentRevenue;
    const growth = ((item.currentRevenue - prevRevenue) / prevRevenue) * 100;
    const loss = item.currentRevenue < prevRevenue ? prevRevenue - item.currentRevenue : 0;

    return { growth, loss };
  });

  const data = {
    labels: filteredData.map((item) => `Month ${item.month}`),
    datasets: [
      {
        label: 'Current Year Revenue',
        data: filteredData.map((item) => item.currentRevenue),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Last Year Revenue',
        data: filteredData.map((item) => item.lastYearRevenue),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
     <div className="w-full flex justify-start mt-20"> {/* This div wraps the button for alignment */}
    <button
      onClick={() => navigate("/adminDashboard")}
      className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
    >
      Back
    </button>
  </div>
      <h2 className="text-3xl font-bold mb-4 text-gray-700">Revenue Line Chart</h2>

      {/* Year and Month Selectors */}
      <div className="mb-6">
        <label className="mr-4 font-medium text-gray-600">Select Year:</label>
        <select
          className="px-4 py-2 rounded border bg-white shadow"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          <option value={2024}>2024</option>
          <option value={2023}>2023</option>
          <option value={2022}>2022</option>
        </select>

        <label className="ml-6 mr-4 font-medium text-gray-600">Select Month:</label>
        <select
          className="px-4 py-2 rounded border bg-white shadow"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>
      </div>

      {/* Revenue Line Chart */}
      <div className="relative w-full max-w-3xl h-[400px] bg-white p-4 rounded-lg shadow-lg">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-gray-500">Loading chart...</p>
          </div>
        ) : (
          <Line data={data} options={options} />
        )}
      </div>

      {/* Revenue Summary Table */}
      <div className="mt-8 w-full max-w-3xl bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Revenue Summary</h3>
        <table className="min-w-full table-auto text-center">
          <thead>
            <tr>
              <th className="px-4 py-2">Month</th>
              <th className="px-4 py-2">Revenue</th>
              <th className="px-4 py-2">Growth (%)</th>
              <th className="px-4 py-2">Loss</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.month} className="border-b">
                <td className="px-4 py-2">Month {item.month}</td>
                <td className="px-4 py-2">${item.currentRevenue.toLocaleString()}</td>
                <td className="px-4 py-2">
                  {growthData[index].growth
                    ? `${growthData[index].growth.toFixed(2)}%`
                    : 'N/A'}
                </td>
                <td className="px-4 py-2">
                  {growthData[index].loss ? `$${growthData[index].loss.toLocaleString()}` : 'N/A'}
                </td>
              </tr>
            ))}
            <tr>
              <td className="px-4 py-2 font-bold">Total</td>
              <td className="px-4 py-2 font-bold">${totalRevenue.toLocaleString()}</td>
              <td className="px-4 py-2">-</td>
              <td className="px-4 py-2">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueLineChart;
