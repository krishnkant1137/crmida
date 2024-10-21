// AttendanceChart.js
import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const AttendanceChart = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [chartType, setChartType] = useState('bar'); // Default chart type is 'bar'

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/performance/attendance-performance');
                if (!response.ok) throw new Error('Failed to fetch attendance data');
                const data = await response.json();

                // Filter out students with no name or totalPresent and totalAbsent counts
                const validData = data.filter(student =>
                    student.name &&
                    (student.totalPresent !== undefined || student.totalAbsent !== undefined)
                );

                // Prepare data for the chart
                const labels = validData.map(student => student.name);
                const presentCounts = validData.map(student => student.totalPresent);
                const absentCounts = validData.map(student => student.totalAbsent);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Total Present',
                            data: presentCounts,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.4, // Smooth line
                        },
                        {
                            label: 'Total Absent',
                            data: absentCounts,
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.4, // Smooth line
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        };

        fetchAttendanceData();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#333',
                    boxWidth: 20,
                    padding: 20,
                },
            },
            title: {
                display: true,
                text: 'Attendance Statistics',
                font: {
                    size: 24,
                    weight: 'bold',
                },
                color: '#333',
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(200, 200, 200, 0.3)',
                },
            },
        },
    };

    const handleChartToggle = (type) => {
        setChartType(type);
    };

    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold text-center mb-4">Attendance Overview</h2>
            <div className="flex justify-center mb-4">
                <button
                    onClick={() => handleChartToggle('bar')}
                    className={`py-2 px-4 rounded-l ${chartType === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Bar Chart
                </button>
                <button
                    onClick={() => handleChartToggle('line')}
                    className={`py-2 px-4 rounded-r ${chartType === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Line Chart
                </button>
            </div>
            <div className="flex justify-center">
                <div className="w-full max-w-md">
                    {chartType === 'bar' ? (
                        <Bar data={chartData} options={options} />
                    ) : (
                        <Line data={chartData} options={options} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AttendanceChart;
