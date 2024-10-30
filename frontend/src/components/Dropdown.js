import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const Dropdown = ({ items, onChange, hoveredIndex, onMouseEnter, onMouseLeave }) => {
  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <Autocomplete
      disablePortal
      options={items}
      onChange={handleChange}
      filterOptions={(options, { inputValue }) => 
        options.filter(option => option.toLowerCase().startsWith(inputValue.toLowerCase()))
      }
      renderInput={(params) => <TextField {...params} label="Select Player" />}
      renderOption={(props, option, { selected }) => (
        <li
          {...props}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{
            backgroundColor: hoveredIndex === option ? '#e0e0e0' : 'transparent',
            cursor: 'pointer',
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
