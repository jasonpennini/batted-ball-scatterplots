// ScatterPlot.js
import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Modal, Button } from 'react-bootstrap';
import ColorLegend from './ColorLegend';

Chart.register(LinearScale, PointElement, Tooltip, Legend);

const ScatterPlot = ({ data }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

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
        'Out of Play': 'grey',
    };

    const scatterData = {
        datasets: [
            {
                label: 'Exit Speed vs. Launch Angle',
                data: data.map(player => ({
                    x: player.exitSpeed || 0,
                    y: player.launchAngle || 0,
                    playOutcome: player.playOutcome,
                    hitDistance: player.hitDistance,
                    videoLink: player.videoLink,
                    pitcher: player.pitcher,
                    exitSpeed: player.exitSpeed,
                    launchAngle: player.launchAngle,
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
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                const clickedData = scatterData.datasets[0].data[index];
                setSelectedData(clickedData);
                setShowModal(true);
            }
        },
    };

    return (
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            {/* Wrap Scatter component in a div with a black outline */}
            <div style={{ flexGrow: 1, border: '1px solid black', padding: '10px', borderRadius: '5px' }}>
                <Scatter data={scatterData} options={options} />
            </div>

            {/* Render the ColorLegend component with a black outline */}
            <div style={{ marginLeft: '20px', border: '1px solid black', padding: '10px', borderRadius: '5px' }}>
                <ColorLegend colorMap={colorMap} />
            </div>

            {/* Modal for displaying point details */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Play Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedData && (
                        <div>
                            <p><strong>Play Outcome:</strong> {selectedData.playOutcome}</p>
                            <p><strong>Pitcher:</strong> {selectedData.pitcher}</p>
                            <p><strong>Exit Speed:</strong> {selectedData.exitSpeed}</p>
                            <p><strong>Launch Angle:</strong> {selectedData.launchAngle}</p>
                            <p><strong>Hit Distance:</strong> {selectedData.hitDistance}</p>
                            <p>
                                <strong>Video Link:</strong>{' '}
                                <a href={selectedData.videoLink} target="_blank" rel="noopener noreferrer">
                                    Watch Video
                                </a>
                            </p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ScatterPlot;
