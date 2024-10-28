import React from 'react';

const ErrorMessage = ({ message }) => {
  return message ? <p style={{ color: 'red' }}>{message}</p> : null;
};

export default ErrorMessage;
