import React from 'react';
import {Col, Row, Icon} from 'react-materialize'
const LocationTile = props => {

  let button;
  let hot;

  if (props.showUser){
    button = <button
                type="button"
                className="btn waves-effect waves-light red lighten-3"
                onClick={props.handleFormShow}>
                {props.buttonText}
                </button>
  } else {

    button = <a
                href="/users/sign_in"
                className="btn waves-effect waves-light red lighten-3">
                Sign In
                </a>

  }

  if (props.hot){
    hot = <Icon>favorite_border</Icon>
  }

  let rating= props.locationInfo.average_review
  if (props.locationInfo.average_review){
    rating= rating.toFixed(1)
  }

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
                <li>{hot}Date-O-Meter: {rating}/5</li>
              </ul>
            </div>
            <div className="card-action">
              <button type="button" className="btn waves-effect waves-light red lighten-3" onClick={props.handleFormShow}>{props.buttonText}</button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default LocationTile
