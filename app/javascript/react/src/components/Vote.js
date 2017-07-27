import React from 'react'

const Vote = props =>{
  return(
    <button className="waves-effect waves-teal btn-floating white btn-flat">
      <i
        className="small material-icons black-text"
        onClick={props.handleChange}>
        {props.button}
      </i>
    </button>
  )
}

export default Vote
