import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import PlayDetailsModal from './PlayDetailsModal';
import { getScatterData } from './ScatterDataHelper';
import  scatterPlotOptions from './ScatterPlotOptions';
import CustomLegend from './CustomLegend'


Chart.register(LinearScale, PointElement, Tooltip, Legend);

const ScatterPlot = ({ batterData }) => {

  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const scatterData = getScatterData(batterData);
  const options = scatterPlotOptions((data) => {
    setSelectedData(data); 
    setShowModal(true); 
  });

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ flexGrow: 1, border: '1px solid black', padding: '10px', borderRadius: '5px' }}>
        <Scatter data={scatterData} options={options} />
        <CustomLegend />
      </div>
      <PlayDetailsModal show={showModal} onHide={() => setShowModal(false)} selectedData={selectedData} />

    </div>
  );
};

export default ScatterPlot;