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

    let user_name;
    let user_image = ""

    if (this.props.review.user) {
        user_name = this.props.review.user.first_name
        user_image = this.props.review.user.profile_photo.url
        if (user_image === null) {
          user_image = "http://abcnews.go.com/images/Entertainment/ht_randy_jackson_idol_nt_130409_wmain.jpg"
        }
    }
    return(
      <div>
        <div className="col s12 m6">
          <div className="card horizontal">
            <div className="card-content black-text">
              <div className="chip">
                <img src={user_image}
                alt="USERIMAGE"
                height="60" width="60"
                className= "circle" />
                {user_name}
              </div>
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
