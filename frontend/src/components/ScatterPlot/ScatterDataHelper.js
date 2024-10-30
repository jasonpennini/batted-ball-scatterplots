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

export const getScatterData = (batterData) => {

  console.log("Batter Data Inside ScatterDataHelper:", batterData);

  const nameParts = batterData[0].BATTER.split(' ');
  const formattedName = nameParts.length > 1 ? `${nameParts[1].replace(/,/g, '').trim()} ${nameParts[0].replace(/,/g, '').trim()}`: batterData[0].BATTER.replace(/,/g, '').trim(); 

  return { // Return an object containing the datasets array
    datasets: [
      {
        label: `Exit Speed vs. Launch Angle for ${formattedName}`,
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
  };
};
