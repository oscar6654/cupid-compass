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
  }

  let rating= props.locationInfo.average_review
  if (props.locationInfo.average_review){
    if (rating > 0)
    {rating= `Date-O-Meter: ${rating.toFixed(1)}/5`}
    else {
      rating = `No Reviews Yet!`
    }
  }

  if (props.locationInfo.average_review > 4){
    {hot = <Icon>favorite_border</Icon>}
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
                <li>{hot}{rating}</li>
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
