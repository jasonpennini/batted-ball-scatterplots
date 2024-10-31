const scatterPlotOptions = (onClickHandler) => ({
  // configuring the x axis for a our scatterplot
  scales: {
    x: {
      type: 'linear',
      position: 'bottom',
      title: {
        display: true,
        text: 'Exit Speed (MPH)', 
        color: '#00274D',
        font: {
          size: 14,
          family: 'Roboto, Arial, sans-serif',
          weight: 'bold', 
        },
      },
      grid: {
        color: '#00274D', 
      },
      ticks: {
        color: '#00274D',
      },
    },
    // configuring the y axis for a our scatterplot
    y: {
      title: {
        display: true,
        text: 'Launch Angle (Degrees)',
        color: '#00274D', 
        font: {
          size: 14, 
          family: 'Helvetica, Arial, sans-serif',
          weight: 'bold', 
        },
      },
      grid: {
        color: '#00274D', 
      },
      ticks: {
        color: '#00274D', 
      },
    },
  },
  // this is the onClick handler for elements on the chart, in our case the clickable datapoints 
  onClick: (event) => {
    const chart = event.chart;
    const elements = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
    if (elements.length > 0) {
      const index = elements[0].index;
      const datasetIndex = elements[0].datasetIndex; 
      const selectedData = chart.data.datasets[datasetIndex].data[index]; 
      // onClickHandler updates selectedData, which will now only be the data for our specific datapoint clicked
      // this will trigger an update in the ScatterPlotOptions function in the Scatterplot.js component
      onClickHandler(selectedData); 
    }
  },
  // this changes the cursor style when hovering over datapoints
  onHover: (event, chartElement) => {
    event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
  },
  plugins: {
    legend: {
      display: false, 
    },
  },
});

export default scatterPlotOptions;
