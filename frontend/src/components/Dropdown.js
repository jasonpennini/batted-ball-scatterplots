import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const Dropdown = ({ items, onChange, value, onInputChange, hoveredIndex, onMouseEnter, onMouseLeave }) => {
  const handleChange = (newValue) => {
    onChange(newValue);
  };

  return (
    <Autocomplete
      disablePortal
      options={items.length > 0 ? items : []} // Avoid rendering issues by checking if items are not empty
      onChange={(event, newValue) => handleChange(newValue)}
      filterOptions={(options, { inputValue }) => 
        options.filter(option => option.toLowerCase().startsWith(inputValue.toLowerCase()))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Player"
          value={value}
          onChange={(e) => onInputChange(e.target.value)}
        />
      )}
      renderOption={(props, option) => (
        <li
          {...props}
          onMouseEnter={() => onMouseEnter(option)} // Set hovered index on mouse enter
          onMouseLeave={onMouseLeave}
          style={{
            backgroundColor: hoveredIndex === option ? '#e0e0e0' : 'transparent', // Highlighting logic
            cursor: 'pointer',
            padding: '8px 16px', // Added padding for better appearance
          }}
        >
          {option}
        </li>
      )}
      sx={{ width: 300 }}
    />
  );
};

export default Dropdown;
