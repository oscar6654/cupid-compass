import React from 'react'

const Vote = props =>{
  return(
    <button
    className="waves-effect waves-teal btn-flat">
      <i
        className="small material-icons"
        onClick={props.handleChange}>
        {props.button}
      </i>
    </button>
  )
}

export default Vote
