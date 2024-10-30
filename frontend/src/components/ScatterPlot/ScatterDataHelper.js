export const colorMap = {
  Out: 'red',
  Error: 'black',
  FieldersChoice: 'darkgrey',
  'Foul or HBP': 'grey',
  Sacrifice: 'grey',
  Single: '#ccffcc',
  Double: 'lightgreen',
  Triple: 'green',
  HomeRun: '#003300',
};

export const getScatterData = (batterData) => {
  console.log("Batter Data Inside ScatterDataHelper:", batterData);

  const nameParts = batterData[0].BATTER.split(' ');
  const formattedName = nameParts.length > 1
    ? `${nameParts[1].replace(/,/g, '').trim()} ${nameParts[0].replace(/,/g, '').trim()}`
    : batterData[0].BATTER.replace(/,/g, '').trim();

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
        pointBackgroundColor: batterData.map(player => colorMap[player.PLAY_OUTCOME] || 'grey'),
        pointRadius: 5,
        font: {
          size: 20, // You can adjust the size as needed
          weight: 'bold', // Set font weight to bold
        },
        // Enable tooltips
        tooltip: {
          callbacks: {
            title: () => formattedName, // Use the formatted name as the title
            label: (tooltipItem) => {
              const { x, y } = tooltipItem.raw; // Get the raw data point
              return [`Exit Speed: ${x} MPH`, `Launch Angle: ${y} Degrees`]; // Return the label with units
            },
          },
        },
      },
    ],
  };
};