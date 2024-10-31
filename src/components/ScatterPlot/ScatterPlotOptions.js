const scatterPlotOptions = (onClickHandler) => ({
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
