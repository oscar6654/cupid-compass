import React, { Component } from 'react';
import LocationForm from './LocationForm';
import { Link } from 'react-router-dom';

class Locations extends Component {
  constructor(props) {
    super(props)

    this.state = {
      locations: [],
      formShow: false,
      showUser:false
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

    fetch('/api/v1/users',{
      credentials: "same-origin"
    })
    .then(response=>{
      return response.json()
    })
    .then(body => {
      this.setState({showUser:body.auth})
    })
  }

  createLocation(payload) {

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
    let form = "";
    let button;

    if (this.state.showUser) {

    if (this.state.formShow){
      form = <LocationForm createLocation={this.createLocation} />
      button = <button type="button" onClick={this.handleFormShow}>Hide Form</button>
    } else {
      button = <button type="button" onClick={this.handleFormShow}>Add Location</button>
    }
  }

    return(

      <div>
        {button}
        {form}
        {locations}
      </div>
    )
  }
}

export default Locations
