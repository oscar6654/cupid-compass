import React, { Component } from "react";
import TextField from '../components/TextField'
import TextArea from '../components/TextArea'
import SelectField from '../components/SelectField'

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
      errorObj: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
  }

  handleChange(event) {
    if (!this.errorHandler(event.target.name, event.target.value)) {
      this.setState({ [event.target.name]: event.target.value })
    }
  }

  errorDictionary(fieldCategory, value) {
    switch(fieldCategory) {
      case 'name':
        return {
          conditional: (value) => {
            return (value.length < 2)
          },
          message: "name must be a minimum of 2 characters in length"
        };
      case 'description':
        return {
          conditional: (value) => {
            return (
              (value.length <= 50) ||
              (value.length >= 1000)
            )
          },
          message: "description must be a minimum of 50 characters and no more than 1000 characters in length"
        };
      case 'address':
        return {
          conditional: (value) => {
            return (value.length < 2)
          },
          message: "address must be a minimum of 2 characters in length"
        };
      case 'city':
        return {
          conditional: (value) => {
            return (value.length < 2)
          },
          message: "city must be a minimum of 2 characters in length"
        };
      case 'zip':
        return {
          conditional: (value) => {
            let regexp = /^[0-9]{5}$/;
            return (!value.match(regexp))
          },
          message: "zip code must be exactly 5 numbers long (and numeric)"
        };
      case 'url':
        return {
          conditional: (value) => {
            let regexp = /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
            return (
              (value === '') ||
              (!value.match(regexp))
            )
          },
          message: "the url must either be a valid url or left blank"
        };
      case 'state':
        return {
          conditional: (value) => {
            return (value === '')
          },
          message: "please select a state from the dropdown menu"
        };
    };
  };

  errorHandler(fieldCategory, value) {
    let errorRef = this.errorDictionary(fieldCategory, value);

    if (errorRef.conditional(value)) {
      let newErrorObj = Object.assign( {}, this.state.errorObj, {[fieldCategory]: errorRef.message} );
      this.setState({ errorObj: newErrorObj });
    }
    else {
      if (Object.entries(this.state.errorObj).length !== 0) {
        let newErrorObj = Object.keys(this.state.errorObj)
          .filter( key => key !== fieldCategory)
          .reduce( (result, current) => {
            result[current] = this.state.errorObj[current];
            return result;
        }, {});

        this.setState({ errorObj: newErrorObj })
      }
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();

    debugger;

    if (Object.keys(this.state.errorObj).length === 0) {
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
    } else {
      alert('you must complete all forms with the correct formatting before location can be added...there are still Errors in: ' + Object.keys(this.state.errorObj))
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
      errorObj: {}
    })
  }


  render() {
    // if (Object.entries(this.state.errorObj).length !== 0) {
    //   console.log("state after render: " + Object.keys(this.state.errorObj))
    // } else {
    //   console.log("state after render: {}")
    // }

    let states = [
      {"": "Select State"},
      {"AL": "Alabama"},
      {"AK": "Alaska"},
      {"AS": "American Samoa"},
      {"AZ": "Arizona"},
      {"AR": "Arkansas"},
      {"CA": "California"},
      {"CO": "Colorado"},
      {"CT": "Connecticut"},
      {"DE": "Delaware"},
      {"DC": "District Of Columbia"},
      {"FM": "Federated States Of Micronesia"},
      {"FL": "Florida"},
      {"GA": "Georgia"},
      {"GU": "Guam"},
      {"HI": "Hawaii"},
      {"ID": "Idaho"},
      {"IL": "Illinois"},
      {"IN": "Indiana"},
      {"IA": "Iowa"},
      {"KS": "Kansas"},
      {"KY": "Kentucky"},
      {"LA": "Louisiana"},
      {"ME": "Maine"},
      {"MH": "Marshall Islands"},
      {"MD": "Maryland"},
      {"MA": "Massachusetts"},
      {"MI": "Michigan"},
      {"MN": "Minnesota"},
      {"MS": "Mississippi"},
      {"MO": "Missouri"},
      {"MT": "Montana"},
      {"NE": "Nebraska"},
      {"NV": "Nevada"},
      {"NH": "New Hampshire"},
      {"NJ": "New Jersey"},
      {"NM": "New Mexico"},
      {"NY": "New York"},
      {"NC": "North Carolina"},
      {"ND": "North Dakota"},
      {"MP": "Northern Mariana Islands"},
      {"OH": "Ohio"},
      {"OK": "Oklahoma"},
      {"OR": "Oregon"},
      {"PW": "Palau"},
      {"PA": "Pennsylvania"},
      {"PR": "Puerto Rico"},
      {"RI": "Rhode Island"},
      {"SC": "South Carolina"},
      {"SD": "South Dakota"},
      {"TN": "Tennessee"},
      {"TX": "Texas"},
      {"UT": "Utah"},
      {"VT": "Vermont"},
      {"VI": "Virgin Islands"},
      {"VA": "Virginia"},
      {"WA": "Washington"},
      {"WV": "West Virginia"},
      {"WI": "Wisconsin"},
      {"WY": "Wyoming"}
    ]

    let fieldCategories = Object.keys(this.state).map( (key) => {
      return key
    }); //array of field categories

    fieldCategories.pop() //removes the errorObj field from the categories array

    let textFields = fieldCategories.map( (fieldCategory, index) => {
      let descriptionField;
      let input;
      if (fieldCategory === "description") {
        let errorMessage = ""
        if(Object.entries(this.state.errorObj).length !== 0) {
          errorMessage = this.state.errorObj[fieldCategory]
        }

        return(
          <div key={index}>
            <p>{errorMessage}</p>
            <TextArea
              key={index}
              name={fieldCategory}
              label={fieldCategory}
              handleChange={this.handleChange}
              content={this.state[fieldCategory]}
            />
          </div>
        )
      }
      else if (fieldCategory == "state") {
        let errorMessage = ""
        if(Object.entries(this.state.errorObj).length !== 0) {
          errorMessage = this.state.errorObj[fieldCategory]
        }

        <p>{errorMessage}</p>
        return(
          <SelectField
            key={index}
            name="state"
            label="State"
            value={this.state.state}
            handleChange={this.handleChange}
            options={states}
          />
        )
      } else {
        let errorMessage = ""
        if(Object.entries(this.state.errorObj).length !== 0) {
          errorMessage = this.state.errorObj[fieldCategory]
        }

        return(
          <div key={index}>
            <p>{errorMessage}</p>
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
          <input type="submit" className="btn waves-effect waves-light" name="Submit"/>
        </form>
      </div>
    )
  }
}

export default LocationForm
