import React from 'react';

const TextField = props => {
  return (
    <div className = "input-field">
      <input
        name={props.name}
        onChange={props.handleChange}
        type='text'
        value={props.content}
      />
      <label className="capitalize">{props.name}</label>
    </div>
  );
}

export default TextField;
