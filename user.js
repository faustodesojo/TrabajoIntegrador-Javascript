const formulario_login = document.querySelector(".formulario__login");
const formulario_register = document.querySelector(".formulario__register");
const contenedor_login_register = document.querySelector(
  ".contenedor__login-register"
);
const caja_trasera_login = document.querySelector(".caja__trasera-login");
const caja_trasera_register = document.querySelector(".caja__trasera-register");

const users = JSON.parse(localStorage.getItem("users")) || [];

const saveToLocalStorage = () => {
  localStorage.setItem("users", JSON.stringify(users));
};

const iniciarSesion = () => {
  if (window.innerWidth > 850) {
    formulario_login.style.display = "block";
    contenedor_login_register.style.left = "10px";
    formulario_register.style.display = "none";
    caja_trasera_register.style.opacity = "1";
    caja_trasera_login.style.opacity = "0";
  } else {
    formulario_login.style.display = "block";
    contenedor_login_register.style.left = "0px";
    formulario_register.style.display = "none";
    caja_trasera_register.style.display = "block";
    caja_trasera_login.style.display = "none";
  }
};

const register = () => {
  if (window.innerWidth > 850) {
    formulario_register.style.display = "block";
    contenedor_login_register.style.left = "410px";
    formulario_login.style.display = "none";
    caja_trasera_register.style.opacity = "0";
    caja_trasera_login.style.opacity = "1";
  } else {
    formulario_register.style.display = "block";
    contenedor_login_register.style.left = "0px";
    formulario_login.style.display = "none";
    caja_trasera_register.style.display = "none";
    caja_trasera_login.style.display = "block";
    caja_trasera_login.style.opacity = "1";
  }
};

const anchoPage = () => {
  if (window.innerWidth > 850) {
    caja_trasera_register.style.display = "block";
    caja_trasera_login.style.display = "block";
  } else {
    caja_trasera_register.style.display = "block";
    caja_trasera_register.style.opacity = "1";
    caja_trasera_login.style.display = "none";
    formulario_login.style.display = "block";
    contenedor_login_register.style.left = "0px";
    formulario_register.style.display = "none";
  }
};

anchoPage();
document
  .getElementById("btn__iniciar-sesion")
  .addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPage);

const saveUser = (username, email, password) => {
  const user = {
    username,
    email,
    password,
  };

  users.push(user);
  saveToLocalStorage();
};
formulario_register.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("register-username").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  saveUser(username, email, password);
});
