export const validators = () => {
  const validateemail = (email) => {
    // Expresiones regulares para validar el correo
    const emailRegex =
      /\b[A-Za-z0-9._%+-]+@(?:gmail|hotmail|outlook)\.(?:com|e1s)\b/;
    return emailRegex.test(email);
  };

  const validatenputs = (...inputs) => {
    // validar que no esten vacios
    
    const emptyInputs = inputs.some((input) => input === "");

    return emptyInputs;
  };

  return {
    validateemail,
    validatenputs,
  };
};
