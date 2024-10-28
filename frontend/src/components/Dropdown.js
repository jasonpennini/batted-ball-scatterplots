import React from 'react';

const Dropdown = ({ items, onClick, hoveredIndex, onMouseEnter, onMouseLeave }) => {
  return (
    <div className="dropdown">
      {items.map((item, index) => (
        <div key={index} 
          className="dropdown-row"
          onClick={() => onClick(item)}
          onMouseEnter={() => onMouseEnter(index)}
          onMouseLeave={onMouseLeave}
          style={{
            backgroundColor: hoveredIndex === index ? '#e0e0e0' : 'transparent',
            cursor: 'pointer',
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
