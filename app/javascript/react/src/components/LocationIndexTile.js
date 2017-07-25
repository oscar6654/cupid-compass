import React from 'react';
import { Link } from 'react-router-dom';

const LocationIndexTile = props => {

  return(
    <div>
      <div className="col s12 m6">
        <div className="card horizontal">
          <div className="card-image">
            <img src={props.imgUrl} />
          </div>
          <div className="card-content black-text">
            <span className="card-title"><Link to={`/locations/${props.location.id}`}>{props.location.name}</Link></span>
            <p>{props.descriptionString}</p>
            <br />
            <p><b>{props.location.city}, {props.location.state}</b></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationIndexTile
