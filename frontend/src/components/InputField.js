import React from 'react';

const InputField = ({ value, onChange, onFocus, onSearch }) => {
  return (
    <div className="search-inner">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search by first name"
        onFocus={onFocus}
      />
    </div>
  );
};

export default InputField;