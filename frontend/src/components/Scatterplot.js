import React from 'react';
import {useState} from 'react'
import { Scatter } from 'react-chartjs-2';
import { Chart, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Modal, Button } from 'react-bootstrap';
import ColorLegend from './ColorLegend';

Chart.register(LinearScale, PointElement, Tooltip, Legend);

const ScatterPlot = ({ batterData }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    
    const colorMap = {
        Out: 'red',
        Error: 'black',
        FieldersChoice: 'darkgrey',
        'Out of Play': 'grey',
        Sacrifice: '#ccffcc',
        Single: 'lightgreen',
        Double: 'green',
        Triple: 'darkgreen',
        HomeRun: 'darkgreen',
    };

    const scatterData = {
        datasets: [
            {
                label: 'Exit Speed vs. Launch Angle',
                data: batterData.map(player => ({
                    x: player.EXIT_SPEED || 0,
                    y: player.LAUNCH_ANGLE || 0,
                    playOutcome: player.PLAY_OUTCOME,
                    hitDistance: player.HIT_DISTANCE,
                    videoLink: player.VIDEO_LINK,
                    pitcher: player.PITCHER,
                })),
                pointBackgroundColor: batterData.map(player => colorMap[player.PLAY_OUTCOME] || 'grey'),
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
            <div style={{ flexGrow: 1, border: '1px solid black', padding: '10px', borderRadius: '5px' }}>
                <Scatter data={scatterData} options={options} />
            </div>
            <div style={{ marginLeft: '20px', border: '1px solid black', padding: '10px', borderRadius: '5px' }}>
                <ColorLegend colorMap={colorMap} />
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Play Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedData && (
                        <div>
                            <p><strong>Play Outcome:</strong> {selectedData.playOutcome}</p>
                            <p><strong>Pitcher:</strong> {selectedData.pitcher}</p>
                            <p><strong>Exit Speed:</strong> {selectedData.x}</p>
                            <p><strong>Launch Angle:</strong> {selectedData.y}</p>
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
