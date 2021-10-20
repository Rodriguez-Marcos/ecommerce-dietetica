export function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = 'Debes ingresar un nombre'
      }
      else{
        errors.name = 'none'
      }
      if (!input.lastname) {
        errors.lastname = 'Debes ingresar un apellido'
      }
      else{
        errors.lastname = 'none'
      }
      if (!input.password) {
        errors.password = 'Debes ingresar una contraseña'
      }
      else{
        if(input.password.length < 8) {
          errors.password = 'Debe tener 8 caracteres como minimo'
        }
        else errors.password = 'none'
      }
      if (!input.email) {
        errors.email = 'Debes ingresar un email'
      }
      else{
        errors.email = 'none'
      }
      return errors;
}