import React, { Component } from 'react';
// import Votes from './Votes';

class Review extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vote_count: 0
    }
  }
  componentDidMount() {
    fetch(`/api/v1/locations/${this.props.locationId}/reviews/${this.props.review.id}`)
    .then(response => response.json())
    .then(review => {
      this.setState({ vote_count: review.vote_count })
    })
  }

  render() {
    return(
      <div>
        <div className="col s12 m6">
          <div className="card horizontal">
            <div className="card-content black-text">
              <span className="card-title">User Name</span>
                Votes:{this.state.vote_count}|
              <span className="black-text">Rating: {this.props.review.rating}<br/>
                {this.props.review.body}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Review
