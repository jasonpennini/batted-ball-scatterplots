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
  onClick: onClickHandler,
});

export default scatterPlotOptions;
