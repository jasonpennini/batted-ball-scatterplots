// ScatterPlot.js
import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import ColorLegend from '../ColorLegend';
import PlayDetailsModal from './PlayDetailsModal';
import { colorMap, getScatterData } from './ScatterDataHelper';
import  scatterPlotOptions from './ScatterPlotOptions';

Chart.register(LinearScale, PointElement, Tooltip, Legend);

const ScatterPlot = ({ batterData }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const scatterData = getScatterData(batterData);
  const options = scatterPlotOptions(setShowModal, setSelectedData, scatterData);

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ flexGrow: 1, border: '1px solid black', padding: '10px', borderRadius: '5px' }}>
        <Scatter data={scatterData} options={options} />
      </div>
      <div style={{ marginLeft: '20px', border: '1px solid black', padding: '10px', borderRadius: '5px' }}>
        <ColorLegend colorMap={colorMap} />
      </div>
      <PlayDetailsModal show={showModal} onHide={() => setShowModal(false)} selectedData={selectedData} />
    </div>
  );
};

export default ScatterPlot;