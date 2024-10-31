import { colorMap } from './ScatterDataHelper';

const CustomLegend = () => {
  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        margin: '10px 0', 
        padding: '5px',
        border: '1px solid #00274D', 
        borderRadius: '5px', 
        backgroundColor: '#f9f9f9', 
        justifyContent: 'space-between', 
      }}
    >
      {/* returns an array of key value pairs which we can then map over as we assign divss with the */}
      {Object.entries(colorMap).map(([outcome, color]) => (
        <div key={outcome} style={{ display: 'flex', alignItems: 'center', margin: '0 10px' }}>
          <div style={{
            width: '9px',
            height: '9px',
            backgroundColor: color,
            borderRadius: '50%', 
            marginRight: '5px',
          }}></div>
          <span style={{ fontWeight: 'bold' }}>{outcome}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
