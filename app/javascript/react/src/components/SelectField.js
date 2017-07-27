import React from 'react';
import { Row, Input, Button, Icon } from 'react-materialize'

const SelectField = (props) =>{
  let selectorOptions = props.options.map( (option, index) => {
    return (
        <option key={index} value={Object.keys(option)[0]}>{Object.values(option)[0]}</option>
    )
  })

  return(
    <Row>
      <Input s={12} name={props.name} type='select' label={props.label} defaultValue={props.value}
        onChange={props.handleChange}>
        {selectorOptions}
      </Input>
    </Row>
  )


  // <option key="1" value=""></option>
  // <option key="2" value="1">Total Dud</option>
  // <option key="3" value="2">Telling Me Theres a Chance</option>
  // <option key="4" value="3">Not Too Shabby</option>
  // <option key="5" value="4">Its Getting Hot in Here</option>
  // <option key="6" value="5">Love at First Sight</option>
}

export default SelectField
