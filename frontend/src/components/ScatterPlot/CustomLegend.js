import { colorMap } from './ScatterDataHelper';

const CustomLegend = () => {
  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        margin: '10px 0', 
        padding: '5px', // Optional: Adds some padding inside the border
        border: '1px solid #00274D', // Set the border color and thickness
        borderRadius: '5px', // Optional: Rounds the corners of the border
        backgroundColor: '#f9f9f9', // Optional: Adds a background color
        justifyContent: 'space-between', // Spread items evenly
      }}
    >
      {Object.entries(colorMap).map(([outcome, color]) => (
        <div key={outcome} style={{ display: 'flex', alignItems: 'center', margin: '0 10px' }}>
          <div style={{
            width: '9px',
            height: '9px',
            backgroundColor: color,
            borderRadius: '50%', // Makes the dot circular
            marginRight: '5px',
          }}></div>
          <span style={{ fontWeight: 'bold' }}>{outcome}</span> {/* Make text bold */}
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
