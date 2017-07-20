import React, { Component } from 'react';
import LocationForm from './LocationForm';
import { Link } from 'react-router-dom';

class Location extends Component {
  constructor(props) {
    super(props)

    this.state = {
      locations: [],
      formShow: false
    }

    this.handleFormShow = this.handleFormShow.bind(this)
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
      credentials: "same-origin",
      body: JSON.stringify(payload)
    }).then(response => {
      let body = response.json()
      return body;
    }).then(body => {
      this.setState({formShow:false})
      let newLocations = this.state.locations.slice()
      newLocations.unshift(body)
      this.setState({ locations: newLocations })
    })
  }

  handleFormShow(event) {
    event.preventDefault()
    this.setState({formShow: !this.state.formShow})
  }

  render() {
    let locations = this.state.locations.map( (location, index) => {
      return(

        <ul key={index}>
        <Link to={`/locations/${location.id}`}>{location.name}</Link>
        </ul>
      )
    })

    let buttonText;
    let form = ""

    if (this.state.formShow){
      form = <LocationForm createLocation={this.createLocation} />

      buttonText = "Hide Form"
    } else {
      buttonText = "Add Location"
    }

    return(

      <div>
        {form}
        <button type="button" onClick={this.handleFormShow}>{buttonText}</button>
        {locations}
      </div>
      )
  }
}

export default Location
