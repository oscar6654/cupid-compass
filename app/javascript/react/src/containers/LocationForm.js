import React, { Component } from "react";
import { states } from '../util/states';
import { errorDictionary } from '../util/locationErrorDictionary';
import { isObjectEmpty } from '../util/jqueryTranslations';
import TextField from '../components/TextField';
import TextArea from '../components/TextArea';
import SelectField from '../components/SelectField';
import ErrorTile from '../components/ErrorTile';

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
    let updatedErrorList = this.errorHandler(event.target.name, event.target.value)
    this.setState({ errorList: updatedErrorList })
    this.setState({ [event.target.name]: event.target.value})
  }

  errorHandler(fieldCategory, value) {
    let errorRef = errorDictionary(fieldCategory);

    if (errorRef.conditional(value)) {
      if (!this.state.errorList.includes(fieldCategory)) {
        return this.state.errorList.concat(fieldCategory)
      } else {
        return this.state.errorList
      }
    }
    else {
      if (this.state.errorList.length !== 0) {
        return this.state.errorList.filter( field => field !== fieldCategory)
      } else {
        return this.state.errorList
      }
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();

    let updatedErrorList = Object.keys(this.state)
    .filter( key => key !== 'errorList')
    updatedErrorList = updatedErrorList.filter( category => {
      return errorDictionary(category).conditional(this.state[category])
    })

    if (updatedErrorList.length === 0) {
      let formPayload = {
        name: this.state.name,
        description: this.state.description,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
        url: this.state.url
      }

      this.props.createLocation(formPayload);
      this.handleClearForm(event);
    }
    else {
      this.setState({ errorList: updatedErrorList })
      alert('you must complete all forms with the correct formatting before location can be added...')
    }
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

  render() {
    let fieldCategories = Object.keys(this.state).filter( (key) => {
      return key !== 'errorList'
    }); //array of field categories

    let textFields = fieldCategories.map( (fieldCategory, index) => {

      let showError = false
      if (this.state.errorList.includes(fieldCategory)) {
        showError = true
      }

      let errorMessage = errorDictionary(fieldCategory, this.state[fieldCategory]).message

      if (fieldCategory === "description") {
        return(
          <div key={index}>
            <ErrorTile
              errorMessage={errorMessage}
              showError={showError}
            />
            <TextArea
              key={index}
              name={fieldCategory}
              label={fieldCategory}
              handleChange={this.handleChange}
              content={this.state[fieldCategory]}
            />
          </div>
        )
      } else if (fieldCategory == "state") {
        return(
          <div key={index}>
            <ErrorTile
              errorMessage={errorMessage}
              showError={showError}
            />
            <SelectField
              key={index}
              name="state"
              label="State"
              value={this.state.state}
              handleChange={this.handleChange}
              options={states}
            />
          </div>
        )
      } else {
        return(
          <div key={index}>
            <ErrorTile
              errorMessage={errorMessage}
              showError={showError}
            />
            <TextField
              key={index}
              name={fieldCategory}
              handleChange={this.handleChange}
              content={this.state[fieldCategory]}
            />
          </div>
        )
      }
    })

    return(
      <div>
        <form className="form" onSubmit={this.handleFormSubmit}>
          {textFields}
          <input type="submit" className="btn waves-effect waves-light red lighten-3" name="Submit"/>
        </form>
      </div>
    )
  }
}

export default LocationForm
