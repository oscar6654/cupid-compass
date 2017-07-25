import React, { Component } from "react";
import TextField from '../components/TextField'
import TextArea from '../components/TextArea'

class LocationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      url: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleFormSubmit(event) {
    event.preventDefault();

    let formPayload = {
      name: this.state.name,
      description: this.state.description,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      url: this.state.url
    }

    console.log(`Payload from within LocationForm: ${formPayload}`)

    this.props.createLocation(formPayload);
    this.handleClearForm(event);
  }

  handleClearForm(event) {
    event.preventDefault();
    this.setState({
      name: "",
      description: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      url: ""
    })
  }

  render() {
    let fieldCategories = Object.keys(this.state).map( (key) => {
      return key;
    } ); //array of field categories

    let textFields = fieldCategories.map( (fieldCategory, index) => {
      let descriptionField;
      let input;
      if (fieldCategory == "description") {
        return(
          <TextArea
            key={index}
            name={fieldCategory}
            label={fieldCategory}
            handleChange={this.handleChange}
            content={this.state[fieldCategory]}
          />
        )
      }
    else{
      return(
        <TextField
          key={index}
          name={fieldCategory}
          handleChange={this.handleChange}
          content={this.state[fieldCategory]}
        />
      )
    }
    })

    return(
      <div>
      <form className="form" onSubmit={this.handleFormSubmit}>
        {textFields}
        <input type="submit" className="btn waves-effect waves-light" name="Submit"/>
      </form>
      </div>
    )
  }
}

export default LocationForm
