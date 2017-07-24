import React from 'react';

const Review = (props) => {
    return(
      <div>
      <p> {props.review.body} </p>
      <p> {props.review.rating} </p>
      </div>
    )
}

export default Review
