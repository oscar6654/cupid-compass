export const  errorDictionary = (fieldCategory) => {
  switch(fieldCategory) {
    case 'body':
      return {
        conditional: (value) => {
          return ((50 >= value.trim().length) ||
          (value.trim().length >= 1000) ||
          (value.trim() === "")
        )
        },
        message: "body must be more than 50 characters but less than 1000 characters"
      };
    case 'rating':
      return {
        conditional: (value) => {
          return (
            (value.trim() === '')
          )
        },
        message: "please select a rating from the drop-down"
      };
  };
};
