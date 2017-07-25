import React, { Component } from "react";
import TextArea from '../components/TextArea'
import SelectField from '../components/SelectField'


class ReviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
      rating: ""
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
      body: this.state.body,
      rating: this.state.rating
    }

    this.props.createReview(formPayload);
    this.handleClearForm(event);
    this.props.handleFormShow(event);
  }

  handleClearForm(event) {
    event.preventDefault();
    this.setState({
      body: "",
      rating: ""
    })
  }

  render() {

    let options = [
      {"": ""},
      {"1": "1 (Total Dud)"},
      {"2": "2 (So You're Telling Me There's a Chance)"},
      {"3": "3 (Not Too Shabby)"},
      {"4": "4 (Its Getting Hot in Here)"},
      {"5": "5 (Love at First Sight)"}
    ]

    return(
      <div>
      <form className="form" onSubmit={this.handleFormSubmit}>
        <TextArea
          name="body"
          label="Review"
          handleChange={this.handleChange}
          content={this.state.body}
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
