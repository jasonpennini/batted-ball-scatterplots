// src/components/ScatterPlot/ScatterPlot.js
import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { Modal, Button } from 'react-bootstrap';
import ColorLegend from './ColorLegend';
import PlayDetailsModal from './PlayDetailsModal';
import scatterPlotOptions from './scatterPlotOptions';
import { transformDataToScatterFormat, colorMap } from './scatterDataHelper';

// Ensure required Chart.js components are registered globally
Chart.register(Chart.LinearScale, Chart.PointElement, Chart.Tooltip, Chart.Legend);

const ScatterPlot = ({ batterData }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const scatterData = transformDataToScatterFormat(batterData);

  const handleChartClick = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      const clickedData = scatterData.datasets[0].data[index];
      setSelectedData(clickedData);
      setShowModal(true);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ flexGrow: 1, border: '1px solid black', padding: '10px', borderRadius: '5px' }}>
        <Scatter data={scatterData} options={scatterPlotOptions(handleChartClick)} />
      </div>
      <div style={{ marginLeft: '20px', border: '1px solid black', padding: '10px', borderRadius: '5px' }}>
        <ColorLegend colorMap={colorMap} />
      </div>
      <PlayDetailsModal show={showModal} onClose={() => setShowModal(false)} data={selectedData} />
    </div>
  );
};

export default ScatterPlot;
