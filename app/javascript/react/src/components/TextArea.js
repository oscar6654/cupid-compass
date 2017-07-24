import React from 'react';

const TextField = props => {
  return (
    <div className = "input-field">
      <textarea
        name={props.name}
        onChange={props.handleChange}
        type='text'
        className = "materialize-textarea"
        value={props.content}
      />
      <label className="capitalize">{props.name}</label>
    </div>
  );
}

export default TextField;
