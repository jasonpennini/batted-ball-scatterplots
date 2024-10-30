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
      options={items.length > 0 ? items : []} 
      onChange={(event, newValue) => handleChange(newValue)}
      filterOptions={(options, { inputValue }) => 
        options.filter(option => option.toLowerCase().startsWith(inputValue.toLowerCase()))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Player By First Name"
          value={value}
          onChange={(e) => onInputChange(e.target.value)}
          sx={{
            '& label': {
              color: '#00274D', // Set the label color to dark blue
            },
            '& .MuiInputLabel-shrink': {
              color: '#00274D', // Ensure the minimized label color is also dark blue
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#00274D', // Set border color to dark blue
              },
              '&:hover fieldset': {
                borderColor: '#00274D', // Set border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00274D', // Set focused border color to dark blue
              },
            },
          }}
        />
      )}
      renderOption={(props, option) => (
        <li
          {...props}
          onMouseEnter={() => onMouseEnter(option)}
          onMouseLeave={onMouseLeave}
          style={{
            backgroundColor: hoveredIndex === option ? '#e0e0e0' : 'transparent',
            color: '#00274D', // Set the text color of the options to dark blue
            cursor: 'pointer',
            padding: '8px 16px',
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
