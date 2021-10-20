export function validate(input) {
  let errors = {};
  if (!input.email) {
    errors.email = 'email is required';
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = 'email is invalid';
  }
  
  if (!input.password) {
    errors.password = 'Password is required';
  } else if (!/(?=.*[0-9])/.test(input.password)) {
    errors.password = 'Password is invalid';
  }


  return errors;
};