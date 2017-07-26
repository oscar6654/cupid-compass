import React from 'react';

const ErrorTile = props => {
  return (
    <p className = "error-message">
      {props.errorMessage}
    </p>
  );
}

export default ErrorTile;
