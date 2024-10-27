// ColorLegend.js
import React from 'react';

const ColorLegend = ({ colorMap }) => {
    return (
        <div style={{ marginTop: '20px' }}>
            <h5>Color Legend</h5>
            <table style={{ borderCollapse: 'collapse', width: '30%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Play Outcome</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Color</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(colorMap).map((outcome, index) => (
                        <tr key={index}>
                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{outcome}</td>
                            <td style={{
                                padding: '8px',
                                borderBottom: '1px solid #ddd',
                                backgroundColor: colorMap[outcome],
                                color: outcome === 'Error' ? 'white' : 'black' // For readability on dark colors
                            }}>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ColorLegend;
