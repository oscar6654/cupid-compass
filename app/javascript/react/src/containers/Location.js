import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import Review from './Review'
import LocationTile from '../components/LocationTile'

class Location extends Component {
  constructor(props) {
    super(props)

    this.state = {
      locationInfo: {},
      random: "",
      reviews: [],
      locationId: null,
      formShow: false
    }
    this.handleFormShow = this.handleFormShow.bind(this)
    this.createReview = this.createReview.bind(this)
  }

  componentDidMount() {
    let idRegex = /[0-9]+\/{0,1}$/
    let locationId = this.props.location.pathname.match(idRegex)[0]
    fetch(`/api/v1/locations/${locationId}`)
    .then(response => response.json())
    .then(location => {
      this.setState({ locationInfo: location, random:  `https://lorempixel.com/350/350/city/${Math.floor(Math.random() * 10) + 1}`, locationId: locationId})
    })
    fetch(`/api/v1/locations/${locationId}/reviews`)
    .then(response => response.json())
    .then(body => {
      this.setState({ reviews: body })
    })
  }

  handleFormShow(event) {
    event.preventDefault()
    this.setState({ formShow: !this.state.formShow })
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
          locationId={this.state.locationId}
        />
      )
    })

    let buttonText;
    let form = ""

    if (this.state.formShow){
      form = <ReviewForm
              createReview={this.createReview}
              handleFormShow={this.handleFormShow}
             />

      buttonText = "Hide Review Form"
    } else {
      buttonText = "Add Review"
    }

    return(
      <div>
        <LocationTile
          locationInfo={this.state.locationInfo}
          random={this.state.random}
          handleFormShow={this.handleFormShow}
          buttonText={buttonText}
        />
        {form}
        {reviews}
        <Link to='/locations' className="btn waves-effect waves-light">Back to Locations Index</Link>
      </div>
    )
  }
}

export default Location
