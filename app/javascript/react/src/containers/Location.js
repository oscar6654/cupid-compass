import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import Review from '../components/Review'

class Location extends Component {
  constructor(props) {
    super(props)

    this.state = {
      locationInfo: {},
      locationId: null,
      reviews: []
    }

    this.createReview = this.createReview.bind(this)
  }

  componentDidMount() {
    let idRegex = /[0-9]+\/{0,1}$/
    let locationId = this.props.location.pathname.match(idRegex)[0]
    fetch(`/api/v1/locations/${locationId}`)
    .then(response => {
      let parsed = response.json()
      return parsed
    }).then(location => {
      this.setState({ locationInfo: location,locationId:locationId })
    })

    fetch(`/api/v1/locations/${locationId}/reviews`)
    .then(response => {
      return response.json()
    })
    .then(body => {
      this.setState({ reviews: body })
    })
    }


  createReview(payload) {
    fetch(`/api/v1/locations/${this.state.locationId}/reviews`, {
      method: 'POST',
      credentials: "same-origin",
      body: JSON.stringify(payload)
    }).then(response => {
      let body = response.json()
      return body;
    }).then(body => {
      let newReviews = this.state.reviews.slice()
      newReviews.unshift(body)
      this.setState({ reviews: newReviews })
    })
  }

  render() {
    let url
    let urlRegex = /^https{0,1}:\/\//
    if(this.state.locationInfo.url) {
      if(this.state.locationInfo.url.match(urlRegex) ) {
        url = this.state.locationInfo.url
      } else {
        url = `http://${this.state.locationInfo.url}`
      }
    } else {
      url = ""
    }

    let reviews = this.state.reviews.map((review, index)=>{

      return(
        <Review
          key = {index}
          review={review}
        />
      )
    })

    return(
      <div>
        <h4>{this.state.locationInfo.name}</h4>
        <p>{this.state.locationInfo.description}</p>
        <a href={url}>{url}</a>
        <ul>
          <li>{this.state.locationInfo.address}</li>
          <li>{this.state.locationInfo.city}, {this.state.locationInfo.state} {this.state.locationInfo.zip}</li>
        </ul>
        <hr/>
        <br/>
        <ReviewForm
          createReview={this.createReview}
        />

        {reviews}

        <button><Link to='/locations'>Back to Locations Index</Link></button>
      </div>
    )
  }
}

export default Location
