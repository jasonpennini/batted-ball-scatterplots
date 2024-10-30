// ScatterPlot.js
import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import PlayDetailsModal from './PlayDetailsModal';
import { getScatterData } from './ScatterDataHelper';
import  scatterPlotOptions from './ScatterPlotOptions';

Chart.register(LinearScale, PointElement, Tooltip, Legend);

// src/components/ScatterPlot/ScatterPlot.js
const ScatterPlot = ({ batterData }) => {

      console.log("Batter Data Received:", batterData); // Log the data for debugging


  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const scatterData = getScatterData(batterData);
  const options = scatterPlotOptions((data) => {
    setSelectedData(data); // Update selected data
    setShowModal(true); // Show the modal
  });

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ flexGrow: 1, border: '1px solid black', padding: '10px', borderRadius: '5px' }}>
        <Scatter data={scatterData} options={options} />
      </div>
      <PlayDetailsModal show={showModal} onHide={() => setShowModal(false)} selectedData={selectedData} />
    </div>
  );
};

export default ScatterPlot;