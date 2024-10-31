import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart, LinearScale, PointElement, Tooltip } from 'chart.js';
import PlayDetailsModal from './PlayDetailsModal';
import { getScatterData } from './ScatterDataHelper';
import  ScatterPlotOptions from './ScatterPlotOptions';
import CustomLegend from './CustomLegend'

// LinearScale is used for x/y axises. PointElement allows us to render datapoints. Tooltip allows for modal logic on datapoints. 
Chart.register(LinearScale, PointElement, Tooltip);

const ScatterPlot = ({ batterData }) => {

  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const scatterData = getScatterData(batterData);
  const options = ScatterPlotOptions((data) => {
    setSelectedData(data); 
    setShowModal(true); 
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%', height: '450px' }}>
      <div style={{ flexGrow: 1, maxWidth: '900px', border: '1px solid black', padding: '10px', borderRadius: '5px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Scatter data={scatterData} options={options} />
          <CustomLegend />
        </div>
      </div>
      <PlayDetailsModal show={showModal} onHide={() => setShowModal(false)} selectedData={selectedData} />
    </div>
  );
};

export default ScatterPlot;