import React from 'react';


const ErrorTile = props => {
  let errorMessage = " "
  if (props.showError) {
    errorMessage = props.errorMessage
  }

  return (
    <p className = "error-message">
      {errorMessage}
    </p>
  );
}

export default ErrorTile;
