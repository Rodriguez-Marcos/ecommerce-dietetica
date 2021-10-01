export function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = 'Debes ingresar un nombre'
      };
    if (!input.lastname) {
        errors.lastname = 'Debes ingresar un apellido'
      };
    if (!input.password) {
        errors.password = 'Debes ingresar una contraseña'
        if(input.password.length < 8) {
            errors.password = 'Debe tener 8 caracteres como minimo'
        }
      };
    if (!input.email) {
        errors.email = 'Debes ingresar un email'
      };

}