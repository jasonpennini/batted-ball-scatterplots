const scatterPlotOptions = (onClickHandler) => ({
  scales: {
    x: {
      type: 'linear',
      position: 'bottom',
      title: {
        display: true,
        text: 'Exit Speed (MPH)', // Updated to include MPH
        color: '#00274D',
        font: {
          size: 14,
          family: 'Roboto, Arial, sans-serif',
          weight: 'bold', // Set font weight to bold
        },
      },
      grid: {
        color: '#00274D', // Set grid line color to very dark blue
      },
      ticks: {
        color: '#00274D', // Set tick mark color to very dark blue
      },
    },
    y: {
      title: {
        display: true,
        text: 'Launch Angle (Degrees)', // Updated to include Degrees
        color: '#00274D', // Set title color to very dark blue
        font: {
          size: 14, // You can adjust the size as needed
          family: 'Helvetica, Arial, sans-serif', // Customize font family
          weight: 'bold', // Set font weight to bold
        },
      },
      grid: {
        color: '#00274D', // Set grid line color to very dark blue
      },
      ticks: {
        color: '#00274D', // Set tick mark color to very dark blue
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
  plugins: {
    legend: {
      display: false, // Set to false to remove the legend entirely
    },
  },
});

export default scatterPlotOptions;
  