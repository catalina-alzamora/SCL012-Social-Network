// Este es el punto de entrada de tu aplicacion

import {
  emailLogin, googleSignIn, register, uploadImgAndText,
} from './app.js';

function initialHash() {
  window.location.hash = '#login';
}

window.onload = initialHash;

const root = document.getElementById('root');
const main = document.getElementById('fullMain');
const btnLogIn = document.getElementById('login');
const btnGoogle = document.getElementById('idGoogle');
const btnRegister = document.getElementById('register');

btnLogIn.addEventListener('click', () => {
  const userID = document.getElementById('emailLogIn').value;
  const userPass = document.getElementById('passwordLogIn').value;
  emailLogin(userID, userPass);
});

btnGoogle.addEventListener('click', googleSignIn);

btnRegister.addEventListener('click', () => {
  window.location.hash = '#register';
});

const registerView = () => {
  main.innerHTML = '';
  main.innerHTML = `<form class="registerUser">
      <div id = "errorDiv"></div>
      <input id=" nombreyApellido"class="inputText" type="text" placeholder="Nombre y apellido">
      <input id="pseudonimo"class="inputText" type="text" placeholder="Pseudonimo">
      <input id="emailRegister" class="inputText" type="email" placeholder="Correo electronico">
      <input id="passwordRegister"class="inputText" type="password" placeholder="Contraseña">
      <input id="passwordRegister2"class="inputText" type="password" placeholder="Confirma contraseña">
      <button id="signIn" class="btn">Registrate</button>
      </form>`;
  const btnSignIn = document.getElementById('signIn');

  btnSignIn.addEventListener('click', () => {
    const emailRegister = document.getElementById('emailRegister').value;
    // console.log(emailRegister)
    const passRegister = document.getElementById('passwordRegister').value;
    // console.log(passRegister)
    register(emailRegister, passRegister);
  });
};

const homeView = () => {
  root.innerHTML = '';
  root.innerHTML = `<header class="homeLogo">
    <h1><img src="img/logo-boceto.png" alt=""></h1>
    </header>
    <nav class="navBar">
        <ul id="mobileV">
          <li id="home">
            <a href="#home">
              <img src="img/homeIcon.png" alt="home Icon">
            </a>
          </li>
          <li id="myWorks">
            <a href="#myWorks"> 
              <img src="img/portfolioIcon.png" alt="portafolio Icon">
            </a>
          </li>
          <li id="favorite">
            <a href="#favorite">
              <img src="img/heart.png" alt="Black Heart Icon">
            </a>
          </li>
          <li id="search">
            <a href="#search">
              <img src="img/lupaicon.png" alt="search Icon">
            </a>
          </li>
          <li id="logout">
            <a href="#logout">
              <img src="img/logout.png" alt="search Icon">
            </a>
          </li>
        </ul>
        <ul id="topV">
         <li id="home">
            <a href="#home">
              Inicio
            </a>
          </li>
         <li id="myWorks">
            <a href="#myWorks">
              Mis Trabajos
            </a>
          </li>
         <li id="favorite">
            <a href="#favorite">
              Favoritos
            </a>
          </li>
         <li id="search">
            <a href="#search">
              Buscar
            </a>
          </li>
         <li id="logout">
            <a href="#logout">
              Cerrar sesión
            </a>
          </li>
       </ul>
      </nav>
      <section id='userPerfil'>
      </section>
    <main id="homeMain">     
    </main>
    <section id="newPostSection">
    </section>
    <button id="addPost" class="btnAdd"><a href="#addPost">°</a></button>`;
};

const myWorkasView = () => {
  const sectionPerfil = document.getElementById('userPerfil');
  let newPostSection = document.getElementById('newPostSection');
  newPostSection.innerHTML = '';
  sectionPerfil.innerHTML = `<div class="businessCard">
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
    </div>`;
};
const sectionAddPost = () => {
  const newPostSection = document.getElementById('newPostSection');
  newPostSection.innerHTML = `<div id="allPost" class="post">
  <textarea class="basePost" id="textPost" cols="30" rows="10"></textarea>
  <div class="actionButtons">
    <input id="imgForUp" type="file" class="fileAdd">
    <button id="newPost" class="btn">Publicar</button>    
  </div>
  </div>`;
  const btnFile = document.getElementById('imgForUp');
  const btnUpPost = document.getElementById('newPost');

  btnUpPost.addEventListener('click', () => {
    const textValue = document.getElementById('textPost').value;
    const imgFile = btnFile.files[0];
    uploadImgAndText(imgFile, textValue);
  });
};
const db = firebase.firestore();
const showUpPost = () => {
  const homeMain = document.getElementById('homeMain');
  const postInOrder = db.collection('Post').orderBy('postTime', 'desc');
  postInOrder.onSnapshot((querySnapshot) => {
    homeMain.innerHTML = '';
    const postInOrder = db.collection('Post').orderBy('postTime', 'desc');
    postInOrder.onSnapshot((querySnapshot) => {
      // console.log(doc.data());
      homeMain.innerHTML += `<div class="postDiv">
      <div class="postArea"> ${doc.data().post}</div>
      <div> <img class="images" src=${doc.data().img}></div>
      <button class="btn">Comentarios</button>
      </div>
      <div id="oldComents" class="commentDiv"></div>
      <div id="newComents" class="commentDiv"></div>`;
      // función para mostrar caja de comentarios
      /* function showComment() {
       console.log('mostrar');
      }
       let coment = Array.from(document.querySelectorAll('.commentDiv')).forEach((element) => {
       element.addEventListener('click', () => {
       console.log(element);
       divPost.innerHTML = '';
       });
       }); */
    });
  });
};

window.addEventListener('hashchange', () => {
  if (window.location.hash === '#home') {
    homeView();
    showUpPost();
  } if (window.location.hash === '#register') {
    registerView();
  } if (window.location.hash === '#addPost') {
    sectionAddPost();
  } if (window.location.hash === '#myWorks') {
    myWorkasView();
  } // if (window.location.hash === '#favorite') {
  // }
});
