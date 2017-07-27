import React, { Component } from "react";
import { errorDictionary } from '../util/reviewErrorDictionary'
import TextArea from '../components/TextArea'
import SelectField from '../components/SelectField'
import ErrorTile from '../components/ErrorTile'

class ReviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
      rating: "",
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

      this.props.createReview(formPayload);
      this.handleClearForm(event);
      this.props.handleFormShow(event);
    }
    else {
      this.setState({ errorList: updatedErrorList })
      alert('you must complete all forms with the correct formatting before review can be added...')
    }
  }

  // handleFormSubmit(event) {
  //   event.preventDefault();
  //
  //   let formPayload = {
  //     body: this.state.body,
  //     rating: this.state.rating
  //   }
  //
  //   this.props.createReview(formPayload);
  //   this.handleClearForm(event);
  //   this.props.handleFormShow(event);
  // }

  handleClearForm(event) {
    event.preventDefault();
    this.setState({
      body: "",
      rating: "",
      errorList: []
    })
  }

  render() {
    let options = [
      {"": "Select Rating"},
      {"1": "1 (Total Dud)"},
      {"2": "2 (So You're Telling Me There's a Chance)"},
      {"3": "3 (Not Too Shabby)"},
      {"4": "4 (Its Getting Hot in Here)"},
      {"5": "5 (Love at First Sight)"}
    ]

    let fieldCategories = Object.keys(this.state).filter( (key) => {
      return key !== 'errorList'
    }); //array of field categories

    let errorObject = {}

    fieldCategories.forEach( category => {
      Object.assign( errorObject, {[category]: {}} )

      let showErrorBool = this.state.errorList.includes(category)
      Object.assign( errorObject[category], {showError: showErrorBool} )

      let errorText = errorDictionary(category).message
      Object.assign( errorObject[category], {errorMessage: errorText} )
    });

    return(
      <div>
      <form className="form" onSubmit={this.handleFormSubmit}>
        <ErrorTile
          errorMessage={errorObject.body.errorMessage}
          showError={errorObject.body.showError}
        />
        <TextArea
          name="body"
          label="Review"
          handleChange={this.handleChange}
          content={this.state.body}
        />

        <ErrorTile
          errorMessage={errorObject.rating.errorMessage}
          showError={errorObject.rating.showError}
        />
        <SelectField
          name="rating"
          label="How Was Your Date?"
          value = {this.state.rating}
          handleChange={this.handleChange}
          options={options}
        />

        <input type="submit" name="Submit" className="btn waves-effect waves-light" />
      </form>
      <br />
      </div>
    )
  }
}

export default ReviewForm
