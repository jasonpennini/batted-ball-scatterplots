// src/components/ScatterPlot/scatterDataHelper.js
export const colorMap = {
  Out: 'red',
  Error: 'black',
  FieldersChoice: 'darkgrey',
  'Out of Play': 'grey',
  Sacrifice: '#ccffcc',
  Single: 'lightgreen',
  Double: 'green',
  Triple: 'darkgreen',
  HomeRun: 'darkgreen',
};

export const getScatterData = (batterData) => ({
  datasets: [
    {
      label: 'Exit Speed vs. Launch Angle',
      data: batterData.map(player => ({
        x: player.EXIT_SPEED || 0,
        y: player.LAUNCH_ANGLE || 0,
        playOutcome: player.PLAY_OUTCOME,
        hitDistance: player.HIT_DISTANCE,
        videoLink: player.VIDEO_LINK,
        pitcher: player.PITCHER,
      })),
      pointBackgroundColor: batterData.map(player => colorMap[player.PLAY_OUTCOME] || 'grey'),
      pointRadius: 5,
    },
  ],
});
