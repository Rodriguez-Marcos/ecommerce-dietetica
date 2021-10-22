export function validate(input, account) {
/*isPassLength isPassNum RES and or
       0          0       1   0  0
       0          1       1   0  1
       1          0       1   0  1
       1          1       0   1  1
 */
let errors = {};
if(account){
  if(!input.name){
    errors.name = 'no se ingreso ningun nombre'
  }
  if(!input.lastname){
    errors.lastname = 'no se ingreso ningun apellido'
  }
}
if (!input.email) {
    errors.email = 'No ingreso un email';
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = 'Ese email es invalido';
  }
  let isPassNum = /(?=.*[0-9])/.test(input.password);
  let isPassLength = input.password?.length>6;

  console.log(isPassLength, isPassNum)
  
  if (!input.password) {
    errors.password = 'No ingreso ninguna contraseña';
  } else if (!(isPassLength&&isPassNum)) {
    console.log('holas')
    errors.password = 'La contraseña es invalida, debe contener al menos 6 caracteres y combinar al menos un numero y una letra';
  }
  if(input.repeatPass && input.repeatPass!==input.password){
    errors.repeatPass = 'Las contraseñas no coinciden'
  }
  console.log(input.password)

  return errors;
};