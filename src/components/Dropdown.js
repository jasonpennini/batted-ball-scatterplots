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
          label="Find Player By First Name"
          value={value}
          onChange={(e) => onInputChange(e.target.value)}
          sx={{
            '& label': {
              color: '#00274D !important',
            },
            '& .MuiInputLabel-shrink': {
              color: '#00274D !important',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#00274D !important',
              },
              '&:hover fieldset': {
                borderColor: '#00274D !important',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00274D !important',
              },
            },
            '& .MuiInputBase-input': {
              color: '#00274D !important',
            },
            '& .MuiInputBase-input::placeholder': {
              color: '#00274D !important',
              opacity: 1,
            },
          }}
        />
      )}
      renderOption={(props, option) => {
        return (
          <li
            {...props}
            key={option} // Use the option string as the key
            onMouseEnter={() => onMouseEnter(option)}
            onMouseLeave={onMouseLeave}
            style={{
              backgroundColor: hoveredIndex === option ? '#e0e0e0' : 'transparent',
              color: '#00274D',
              cursor: 'pointer',
              padding: '8px 16px',
              fontWeight: 'normal',
            }}
          >
            {option}
          </li>
        );
      }}
      sx={{ width: 300 }}
    />
  );
};

export default Dropdown;
