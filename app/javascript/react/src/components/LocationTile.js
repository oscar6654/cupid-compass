import React from 'react';
import {Col, Row} from 'react-materialize'
const LocationTile = props => {
  return (
    <Row>
      <Col s={12}>
        <div className="card horizontal">
          <div className="card-image">
            <img src={props.random} />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <span className="card-title">{props.locationInfo.name}</span>
              <p>{props.locationInfo.description}</p>
              <ul>
                <li>{props.locationInfo.address}</li>
                <li>{props.locationInfo.city}, {props.locationInfo.state} {props.locationInfo.zip}</li>
              </ul>
            </div>
            <div className="card-action">
              <button type="button" className="btn waves-effect waves-light" onClick={props.handleFormShow}>{props.buttonText}</button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default LocationTile
