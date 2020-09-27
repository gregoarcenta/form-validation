import { expresions } from "./reg_expresions.js";

export default () => {
   const $form = document.getElementById("form");
   const $messageSuccess = document.querySelector(".form-message-submit");
   const $errorMessage = document.querySelector(".form-error-message");
   const $checkIcons = document.querySelectorAll(".fa-check-circle");

   let values = {
      user: false,
      name: false,
      password: false,
      password2: false,
      email: false,
      phone: false,
   };

   const validsChangeForm = (e) => {
      const $input = e.target;
      if (e.target.matches(".form-input")) {
         switch ($input.id) {
            case "user":
               validsChangeInput($input, expresions.rexUsuario);
               break;
            case "name":
               validsChangeInput($input, expresions.rexNombre);
               break;
            case "password":
               validsChangeInput($input, expresions.rexPassword);
               validPassword();
               break;
            case "password2":
               validPassword();
               break;
            case "email":
               validsChangeInput($input, expresions.rexCorreo);
               break;
            case "phone":
               validsChangeInput($input, expresions.rexTelefono);
               break;

            default:
               break;
         }
      }
   };

   const validsChangeInput = (input, regExp) => {
      const validation = RegExp(regExp);

      if (validation.test(input.value)) {
         inputSuccess(input);
      } else {
         inputError(input);
      }
   };

   function validPassword() {
      const pass = document.getElementById("password");
      const pass2 = document.getElementById("password2");
      if (pass.value === pass2.value && pass.value !== "" && pass2.value !== "") {
         inputSuccess(pass);
         inputSuccess(pass2);
      } else {
         inputError(pass2);
      }
   }

   const inputError = (input) => {
      const $errorInput = input.parentElement.nextElementSibling;
      const $checkIcon = input.nextElementSibling.nextElementSibling;
      const $errorIcon = input.nextElementSibling;

      $errorInput.classList.remove("none");
      $checkIcon.classList.remove("check-circle");
      $errorIcon.classList.add("times-circle-error");
      input.classList.add("form-input-invalid");

      values[input.id] = false;
   };

   const inputSuccess = (input) => {
      const $errorInput = input.parentElement.nextElementSibling;
      const $checkIcon = input.nextElementSibling.nextElementSibling;
      const $errorIcon = input.nextElementSibling;

      input.classList.remove("form-input-invalid");
      $errorIcon.classList.remove("times-circle-error");
      $errorInput.classList.add("none");
      $checkIcon.classList.add("check-circle");

      values[input.id] = true;
   };

   const sendFormSubmit = (e) => {
      e.preventDefault();
      const conditions = document.getElementById("conditions");
      if (
         values.user &&
         values.name &&
         values.password &&
         values.password2 &&
         values.email &&
         values.phone &&
         conditions.checked
      ) {
         $form.reset();
         $errorMessage.classList.add("none");
         $messageSuccess.classList.remove("none");
         $checkIcons.forEach((icon) => {
            icon.classList.remove("check-circle");
         });
         setTimeout(() => {
            $messageSuccess.classList.add("none");
         }, 4000);
      } else {
         $errorMessage.classList.remove("none");
      }
   };

   document.addEventListener("keyup", validsChangeForm);
   $form.addEventListener("submit", sendFormSubmit);
};
