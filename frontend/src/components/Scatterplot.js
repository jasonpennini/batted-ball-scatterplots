// ScatterPlot.js
import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

Chart.register(LinearScale, PointElement, Tooltip, Legend);

const ScatterPlot = ({ data }) => {
    const scatterData = {
        datasets: [
            {
                label: 'Exit Speed vs. Launch Angle',
                data: data.map(player => ({
                    x: player.exitSpeed || 0,
                    y: player.launchAngle || 0,
                })),
                backgroundColor: 'rgba(75,192,192,1)',
                pointRadius: 5,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Exit Speed',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Launch Angle',
                },
            },
        },
    };

    return <Scatter data={scatterData} options={options} />;
};

export default ScatterPlot;
