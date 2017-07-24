import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import Review from '../components/Review'

class Location extends Component {
  constructor(props) {
    super(props)

    this.state = {
      locationInfo: {},
      random: ""
    }

    this.createReview = this.createReview.bind(this)
  }

  componentDidMount() {
    let idRegex = /[0-9]+\/{0,1}$/
    let locationId = this.props.location.pathname.match(idRegex)[0]
    fetch(`/api/v1/locations/${locationId}`)
    .then(response => response.json())
    }).then(location => {
      this.setState({ locationInfo: location, random:  `https://lorempixel.com/350/350/city/${Math.floor(Math.random() * 10) + 1}`})
      this.setState({})
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

    return(
      <div>
          <div className="col s12">
            <div className="card horizontal">
            <div className="card-image">
              <img src={this.state.random} />
            </div>
              <div className="card-content black-text">
                <span className="card-title">{this.state.locationInfo.name}</span>
                <p>{this.state.locationInfo.description}</p>
                <ul>
                  <li>{this.state.locationInfo.address}</li>
                  <li>{this.state.locationInfo.city}, {this.state.locationInfo.state} {this.state.locationInfo.zip}</li>
                </ul>
              </div>
            </div>
        </div>



        <Link to='/locations' className="btn waves-effect waves-light">Back to Locations Index</Link>
      </div>
    )
  }
}

export default Location
