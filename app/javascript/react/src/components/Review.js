import React from 'react';

const Review = (props) => {
    return(
      <div>
        <div className="col s12 m6">
          <div className="card horizontal">
            <div className="card-content black-text">
            <span className="card-title">hi</span>

              <span className="black-text">Rating: {props.review.rating}<br/>
                {props.review.body}</span>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Review
