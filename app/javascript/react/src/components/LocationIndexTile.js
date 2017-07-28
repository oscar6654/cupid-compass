import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

const LocationIndexTile = props => {

  let hot;
  let score;

  if (props.location.average_review){
    console.log(props.location)
    score = props.location.average_review.toFixed(1)
    if (props.location.average_review > 4)
    {hot = <Icon>favorite_border</Icon>}
  }

  return(
    <div>
      <div className="col s12 m6">
        <div className="card horizontal">
          <div className="card-image">
            <img src={props.imgUrl} />
          </div>
          <div className="card-content black-text">
            <span className="card-title"><a href={`/locations/${props.location.id}`}>{props.location.name}</a></span>
            <p>{props.descriptionString}</p>
            <p>{score}</p>
            <br />
            <p><b>{props.location.city}, {props.location.state}</b></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationIndexTile
