// src/components/ScatterPlot/scatterPlotOptions.js
const scatterPlotOptions = (onClickHandler) => ({
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
  onClick: (event) => {
    const chart = event.chart;
    const elements = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
    if (elements.length > 0) {
      const index = elements[0].index;
      const datasetIndex = elements[0].datasetIndex; 
      const selectedData = chart.data.datasets[datasetIndex].data[index]; 
      onClickHandler(selectedData); 
    }
  },
});

export default scatterPlotOptions;