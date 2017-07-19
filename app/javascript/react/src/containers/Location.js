import React, { Component } from 'react';
import LocationForm from './LocationForm';

class Location extends Component {
  constructor(props) {
    super(props)

    this.state = {
      locations: []
    }

    this.createLocation = this.createLocation.bind(this);
  }

  componentDidMount() {
    fetch('/api/v1/locations')
    .then(response => {
      return response.json()
    })
    .then(body => {
      this.setState({ locations: body })
    })
  }

  createLocation(payload) {
    console.log(`payload: ${payload}`)

    fetch('/api/v1/locations', {
      method: 'POST',
      body: JSON.stringify(payload)
    }).then(response => {
      let body = response.json()
      return body;
    }).then(body => {
      this.setState({ locations: [...this.state.locations, body] })
    })
  }

  render() {
    let locations = this.state.locations.map( (location, index) => {
      return(
        <div key={index}>
          <h2>{location.name}</h2>
          <h3>{location.address}</h3>
          <h3>{location.state}</h3>
        </div>
      )
    })

    return(
      <div>
        {locations}
        <LocationForm
          createLocation={this.createLocation}
        />
      </div>
      )
  }
}

export default Location
