export const  errorDictionary = (fieldCategory) => {
  switch(fieldCategory) {
    case 'name':
      return {
        conditional: (value) => {
          return ((value.length < 2) || (value.trim() === ""))
        },
        message: "name must be a minimum of 2 characters in length"
      };
    case 'description':
      return {
        conditional: (value) => {
          return (
            (value.length <= 50) ||
            (value.length >= 1000) ||
            (value.trim() === "")
          )
        },
        message: "description must be a minimum of 50 characters and no more than 1000 characters in length"
      };
    case 'address':
      return {
        conditional: (value) => {
          return ((value.length < 2) || (value.trim() === ""))
        },
        message: "address must be a minimum of 2 characters in length"
      };
    case 'city':
      return {
        conditional: (value) => {
          return ((value.length < 2) || (value.trim() === ""))
        },
        message: "city must be a minimum of 2 characters in length"
      };
    case 'zip':
      return {
        conditional: (value) => {
          let regexp = /^[0-9]{5}$/;
          return ((!value.match(regexp)) || (value.trim() === ""))
        },
        message: "zip code must be exactly 5 numbers long (and numeric)"
      };
    case 'url':
      return {
        conditional: (value) => {
          let regexp = /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
          return (
            (value.trim() !== '') &&
            (!value.match(regexp))
          )
        },
        message: "the url must either be a valid url or left blank"
      };
    case 'state':
      return {
        conditional: (value) => {
          return (value.trim() === '')
        },
        message: "please select a state from the dropdown menu"
      };
  };
};
