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
    .then(response => response.json())
    .then(body => {
      this.setState({ locations: body})

    })

    fetch('/api/v1/users',{
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(body => {
      this.setState({showUser:body.auth})
    })
  }


  createLocation(payload) {
    fetch('/api/v1/locations', {
      method: 'POST',
      credentials: "same-origin",
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(body => {
      this.setState({formShow:false})
      let newLocations = this.state.locations.slice()
      newLocations.unshift(body)
      this.setState({ locations: newLocations, random: `${Math.floor(Math.random() * 10) + 1}` })
    })
  }

  handleFormShow(event) {
    event.preventDefault()
    this.setState({formShow: !this.state.formShow})
  }

  render() {


    let locations = this.state.locations.map( (location, index) => {
      let descriptionString = ""
        if (location.description.length > 30) {
          descriptionString = `${location.description.substring(0, 30)}...`
        } else {
          descriptionString = location.description
        }
        let random = Math.floor(Math.random() * 10) + 1
      return(
        <div key={index}>
          <div className="col s12 m6">
            <div className="card horizontal">
              <div className="card-image">
                <img src={`https://lorempixel.com/100/190/city/${random}`} />
              </div>
              <div className="card-content black-text">
                <span className="card-title"><Link to={`/locations/${location.id}`}>{location.name}</Link></span>
                <p>{descriptionString}</p>
                <br />
                <p><b>{location.city}, {location.state}</b></p>
              </div>
            </div>
          </div>
        </div>
      )
    })

    let buttonText;
    let form = "";
    let button;



    if (this.state.showUser) {
      if (this.state.formShow){
        form = <LocationForm createLocation={this.createLocation} />
        button = <button type="button" className="btn waves-effect waves-light" onClick={this.handleFormShow}>Hide Form</button>
      } else {
        button = <button type="button" className="btn waves-effect waves-light" onClick={this.handleFormShow}>Add Location</button>
      }
    }

    return(

      <div>
        <div className="padding-button row">
        {button}
        </div>
        {form}
        <div className="row">
        {locations}
        </div>
      </div>
    )
  }
}

export default Locations
