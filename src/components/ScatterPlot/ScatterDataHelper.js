export const colorMap = {
  Out: 'red',
  Error: 'red',
  FieldersChoice: 'darkgrey',
  'Foul or HBP': 'grey',
  Sacrifice: 'grey',
  Single: '#ccffcc',
  Double: 'lightgreen',
  Triple: 'orange',
  HomeRun: 'gold',
};

export const getScatterData = (batterData) => {

  const nameParts = batterData[0].BATTER.split(' ');
  const formattedName = nameParts.length > 1
    ? `${nameParts[1].replace(/,/g, '').trim()} ${nameParts[0].replace(/,/g, '').trim()}`
    : batterData[0].BATTER.replace(/,/g, '').trim();

  // assigns the various values to datapoints in the scatterplot, mapping over all the data for the relevant player
  return {
    datasets: [
      {
        data: batterData.map(player => ({
          x: player.EXIT_SPEED || 0,
          y: player.LAUNCH_ANGLE || 0,
          playOutcome: player.PLAY_OUTCOME,
          hitDistance: player.HIT_DISTANCE,
          videoLink: player.VIDEO_LINK,
          pitcher: player.PITCHER,
        })),
        // conditionally assigns color by play outcome
        pointBackgroundColor: batterData.map(player => colorMap[player.PLAY_OUTCOME] || 'grey'),
        pointRadius: 5,
        font: {
          size: 20,
          weight: 'bold', 
        },
        // tooltip drives what pops up when you hover over each datapoint
        tooltip: {
          callbacks: {
            title: () => formattedName, 
            label: (tooltipItem) => {
              const { x, y } = tooltipItem.raw; 
              return [`Exit Speed: ${x} MPH`, `Launch Angle: ${y} Degrees`]; 
            },
          },
        },
      },
    ],
  };
};