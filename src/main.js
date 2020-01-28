// Este es el punto de entrada de tu aplicacion

import {
  ingreso, registrar, cerrar, googleSignIn,
} from './app.js';
// myFunction();

const main = document.getElementById("fullMain")
const root = document.getElementById('rootHeader');
const initialHeader = document.getElementById('initialHeader');
const btnLogIn = document.getElementById('login');
const btnGoogle = document.getElementById('idGoogle');
const btnRegister = document.getElementById('register');

btnLogIn.addEventListener('click', () => {
  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        window.location.hash = '#home';
        root.innerHTML = '';
        root.innerHTML = `<header class="homeLogo">
        <h1><img src="img/logo-boceto.png" alt=""></h1>
        <nav class="navBar">
        <ul>
        <li id="home"><a href="#home">Inicio</a></li>
        <li id="myWorks"><a href="#myWorks">Mis Trabajos</a></li>
        <li id="favorite"><a href="#favorite">Favoritos</a></li>
        <li id="search"><a href="#search">Buscar</a></li>
        <li id="logout"><a href="#logout">Cerrar sesión</a></li>
        <main>
        </ul>
        </nav>
        </header>`
        main.innerHTML='';
        let btnAdd = document.createElement('button');
        btnAdd.setAttribute('id', 'addPost');
        btnAdd.setAttribute('class', 'btnAdd');
        let aForBtn = document.createElement('a'); 
        aForBtn.setAttribute('href', '#addPost');
        let textABtn = document.createTextNode('°');
        aForBtn.appendChild(textABtn);
        btnAdd.appendChild(aForBtn);
        main.appendChild(btnAdd); 
      } else {
        alert("Usuario Invalido")
      }
  }); email - password.html;
    
});

btnGoogle.addEventListener('click', googleSignIn);


btnRegister.addEventListener('click', () => {
  root.innerHTML = '';
  root.innerHTML = `<header class="header">
            <h1><img src="img/logo-boceto.png" alt=""></h1>
         </header>
        <main> 
        <form class="registerUser">
         <input id=" nombreyApellido"class="inputText" type="text" placeholder="Nombre y apellido">
         <input id="pseudonimo"class="inputText" type="text" placeholder="Pseudonimo">
         <input id="emailRegister" class="inputText" type="email" placeholder="Correo electronico">
         <input id="passwordRegister"class="inputText" type="password" placeholder="Contraseña">
         <input id="passwordRegister2"class="inputText" type="password" placeholder="Confirma contraseña">
         <button id="signIn" class="btn">Registrate</button>
            
        </form>    
        </main>`;
  const btnsignIn = document.getElementById('signIn');
  btnsignIn.addEventListener('click', registrar());
});

window.addEventListener('hashchange', () => {
  console.log(window.location.hash);
  if (window.location.hash === '#myWorks') {
    root.innerHTML = '';
    root.innerHTML = `<header class ="homeLogo">
        <h1><img src = "img/logo-boceto.png" alt=""></h1>
         <nav class="navBar">
          <ul>
            <li id="home"><a href="#home">Inicio</a></li>
            <li id="myWorks"><a href="#myWorks">Mis Trabajos</a></li>
            <li id="favorite"><a href="#favorite">Favoritos</a></li>
            <li id="search"><a href="#search">Buscar</a></li>
            <li id="logout"><a href="#logout">Cerrar sesión</a></li>
          </ul>
         </nav>
        </header>
        <section class="businessCard">
        <img src="img/photo-user-tester.png">
        <div class="idUser">
          <h3>Nombre Usuario / Seudónimo</h3>
          <h4>Ilustrador</h4>
        </div>
        <div class="myPages">      
          <p>Mi bihance</p>
          <p>Mi instagram</p>
          <p>Mi linkedin</p>
        </div>
        </section>
        <main>
        </main>
        <button id="addPost" class="btnAdd"><a href="#addPost">°</a></button>`;
  } else if (window.location.hash === '#favorite') {
  } else if (window.location.hash === '#home') {
    root.innerHTML = '';
    root.innerHTML = `<header class="homeLogo">
        <h1><img src="img/logo-boceto.png" alt=""></h1>
        <nav class="navBar">
        <ul>
          <li id="home"><a href="#home">Inicio</a></li>
          <li id="myWorks"><a href="#myWorks">Mis Trabajos</a></li>
          <li id="favorite"><a href="#favorite">Favoritos</a></li>
          <li id="search"><a href="#search">Buscar</a></li>
          <li id="logout"><a href="#logout">Cerrar sesión</a></li>       
        </ul>
        </nav>
        </header>
        <main>      
       
        </main>
        <button id="addPost" class="btnAdd"><a href="#addPost">°</a></button>`;
  } else if (window.location.hash === '#addPost') {
    root.innerHTML = '';
    root.innerHTML = `<header class="homeLogo">
        <h1><img src="img/logo-boceto.png" alt=""></h1>
        <nav class="navBar">
        <ul>
          <li id="home"><a href="#home">Inicio</a></li>
          <li id="myWorks"><a href="#myWorks">Mis Trabajos</a></li>
          <li id="favorite"><a href="#favorite">Favoritos</a></li>
          <li id="search"><a href="#search">Buscar</a></li>
          <li id="logout"><a href="#logout">Cerrar sesión</a></li>       
        </ul>
        </nav>
      </header>
      <section id="allPost" class="post">
      <textarea class="textPost" id="basePost" cols="30" rows="10"></textarea>
      <div class="actionButtons">
        <input type="file" class="fileAdd">
        <button id="newPost" class="btn" onclick="savePost()">Publicar</button>    
      </div>
      </section>`;
  }
});
