// ScatterPlot.js
import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

Chart.register(LinearScale, PointElement, Tooltip, Legend);

const ScatterPlot = ({ data }) => {
    // Define the color map for each PLAY_OUTCOME
    const colorMap = {
        Double: 'green',
        Error: 'black',
        FieldersChoice: 'darkgrey',
        HomeRun: 'darkgreen',
        Out: 'red',
        Sacrifice: '#ccffcc', // Very light green
        Single: 'lightgreen',
        Triple: 'darkgreen',
        Undefined: 'grey',
    };

    // Transform data to include color based on playOutcome
    const scatterData = {
        datasets: [
            {
                label: 'Exit Speed vs. Launch Angle',
                data: data.map(player => ({
                    x: player.exitSpeed || 0,
                    y: player.launchAngle || 0,
                    backgroundColor: colorMap[player.playOutcome] || 'grey', // Default to grey if outcome not found
                })),
                pointBackgroundColor: data.map(player => colorMap[player.playOutcome] || 'grey'),
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
