import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const Dropdown = ({ items, onChange, value, onInputChange, hoveredIndex, onMouseEnter, onMouseLeave }) => {
  const handleChange = (newValue) => {
    onChange(newValue);
  };

  return (
    // Autocomplete dynamically filters the last of players passed into it with the onChange handler
    <Autocomplete
    // determines the dropdown list won't be rendered in a portal, which is preferred for simple layouts when you want consistency
      disablePortal
      // options will be passed the items prop if it exists, which is an array containing all unique players
      options={items.length > 0 ? items : []}

      onChange={(event, newValue) => handleChange(newValue)}
      // filter options filters the list for players whose name starts with the input values
      filterOptions={(options, { inputValue }) =>
        options.filter(option => option.toLowerCase().startsWith(inputValue.toLowerCase()))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Find Player By First Name"
          value={value}
          // as the user inputs text triggers onInputChange and in turn onChange
          onChange={(e) => onInputChange(e.target.value)}
          // coloring for various parts of dropdown box
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
        // passes data to each list item on our dropdown and also sets some formatting 
        return (
          <li
            {...props}
            key={option} 
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
            {/* renders option value as content of list item, option was based on user input from UI */}
            {option}
          </li>
        );
      }}
      sx={{ width: 300 }}
    />
  );
};

export default Dropdown;
