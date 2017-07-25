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
      url: "",
      errorList: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
  }

  handleChange(event) {
    if (!this.errorHandler(event.target.name, event.target.value, errorDictionary)) {
      this.setState({ [event.target.name]: event.target.value })
    }
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
      url: "",
      errorList: []
    })
  }

  errorHandler(fieldCategory, value, errorDictionary) {
    if (errorDictionary.fieldCategory.conditional(value)) {
      let errorsArray = [...this.state.errorList, errorDictionary.fieldCategory.message]
      this.setState({ errorList: errorsArray });
    }
    else {
      if (errorArray.includes(message)) {
        let newError = this.state.errorList.filter((error) => {
          return error !== errorDictionary.fieldCategory.message
        })
        this.setState({ errorList: newError })
      }
    }
  }

  render() {
    let errorDictionary = {
      name: {
        conditional: (value) => {
          return (value.length >= 2)
        },
      message: "name must be a minimum of 2 characters in length"
      },
      description: {
        conditional: () => {
          return (50 <= value.length && value.length <= 1000)
        },
        message: "description must be a minimum of 50 characters and no more than 1000 characters in length"
      },
      address: {
        conditional: () => {
          return (value.length >= 2)
        },
        message: "address must be a minimum of 2 characters in length"
      },
      city: {
        conditional: () => {
          return (value.length >= 2)
        },
        message: "city must be a minimum of 2 characters in length"
      },
      zip: {
        conditional: () => {
          return (value.length === 5 && value.match('/^[0-9]{5}$/'))
        },
        message: "zip code must be exactly 5 numbers"
      },
      url: {
        conditional: () => {
          return value.match('/^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/ix')
        },
        message: "url must be a valid url"
      }
    }

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

    let errors = this.state.errorList.map(error => {
      return(
        <h5 key={error}>
        {error}
        </h5>
      )
    })

    return(
      <div>
      {errors}
      <form className="form" onSubmit={this.handleFormSubmit}>
        {textFields}
        <input type="submit" className="btn waves-effect waves-light" name="Submit"/>
      </form>
      </div>
    )
  }
}

export default LocationForm
