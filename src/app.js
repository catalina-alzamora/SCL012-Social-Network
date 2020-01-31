export function registrar() {
  const email = document.getElementById('emailRegister').value;
  const password = document.getElementById('passwordRegister').value;


  firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
  // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
  email - password.html;
}

// función de ingreso de sesión

export function ingreso() {
  const email2 = document.getElementById('emailLogIn').value;
  const password2 = document.getElementById('passwordLogIn').value;

  firebase.auth().signInWithEmailAndPassword(email2, password2)
  .catch((error) => {
  // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  })
};

export function googleSignIn(){
  const baseProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(baseProvider)
  .then((result) => {
    console.log(result);
    console.log('Success Google acount Linked');
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
    </header>
    <main id="fullMain"> 
    
   
    </main>
    <button id="addPost" class="btnAdd"><a href="#addPost">°</a></button>`
  }).catch((err) => {
    console.log(err);
    console.log('Failed to do');
    alert("Error al ingresar")
  });
}

// funcionalidad de Cerrar Sesión
export function cerrar() {
  console.log('hola');
  firebase.auth().signOut()
    .then(() => {
      console.log('Saliendo...');
    })
    .catch((error) => {
      console.log(error);
    });
}
// Función para subir imagen


const db = firebase.firestore();
// funcionalidad de posteo
export function savePost() {
  const posteo = document.getElementById('addPost').value;
  db.collection('newPost').add({
    correo: firebase.auth().currentUser.email,
    uid: firebase.auth().currentUser.uid,
    post: posteo,
  })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
      document.getElementById('addPost').value = '';
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
}


let btnUploadImg = document.getElementById('uploadImage'); 
let storageRef = firebase.storage().ref();
let imagesFBRef = firebase.database().ref('ImagesFB');
const postimage = document.getElementById('postimg')

btnUploadImg.addEventListener('change', confirmUpload, false);
// Imprimiendo imagen guardada en firebase
function showImgFromFB(){
  imagesFBRef.on('value', function(snapshot){
    let data = snapshot.val();
    let result = '';
    for(let key in data){
      result += `<img src="` + data[key].url + `"/>`;
    }
    document.getElementById('forPosting').innerHTML = result;
  })
}
// Subiendo imagen a firebase storage
function confirmUpload () {
  postimage.addEventListener('click', () => {
  postimage.disabled = false;
  const imgFile = btnUploadImg.files[0];
  const uploadTask = storageRef.child('Images/' + imgFile.name).put(imgFile);
  
  uploadTask.on('state_changed',
  function(snapshot) {
}, function(error) {
 alert('error');
 // Obteniendo URL de imagen
}, function() {
  uploadTask.snapshot.ref.getDownloadURL()
  .then(function(downloadURL){
    console.log(downloadURL)
    createNodeInFB(imgFile.name, downloadURL)
    showImgFromFB();
  })
})
})};
// Creando nodo en firebase 
function createNodeInFB(imgName, downloadURL){
  db.collection('postconuid').add({ 
    email: firebase.auth().currentUser.email,
    uid: firebase.auth().currentUser.uid,
    img: downloadURL
  })
  
}

// Función para postear
function posting() {
  db.collection('postconuid').add({ // creando una coleción para agregar los datos a firebase
    email: firebase.auth().currentUser.email,
    uid: firebase.auth().currentUser.uid,
    post: document.getElementById('texto').value
  })
    .then(function (docRef) {
      console.log('Document written with ID: ', docRef.id); // console.log para confirmar en consola
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}
// llamando al div donde se imprimirán los post
const divPost = document.getElementById('forPosting');
// escuchando colección en firebase para ir imprimiendo
db.collection('postconuid').onSnapshot((querySnapshot) => {
  // vaciando div para que no se repitan los post
  divPost.innerHTML = '';
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().post}`);
      divPost.innerHTML +=
      `<div class="postDiv">
      <textarea class="postArea" readonly="readonly"> ${doc.data().post}</textarea>
      <button class="abc">Comentarios</button>
      </div>
      <div class="commentDiv" style="display:none">
    </div>`;
    // función para mostrar caja de comentarios
    function showComment (){
    document.getElementsByClassName('commentDiv').style.display = 'block';
    console.log('mostrar')
    }
   document.querySelectorAll('.commentDiv').forEach((element) => {
    element.addEventListener('click', () =>{
    console.log(element);
    divPost.innerHTML = '';
      })
    })
  });
});

// función comentar
 function comment () {
   console.log('comentar');
   db.collection('postconuid').add({ // creando una coleción para agregar los datos a firebase
    email: firebase.auth().currentUser.email,
    uid: firebase.auth().currentUser.uid,
    post: document.getElementById('texto').value,
    comment: document.getElementsByClassName('commentArea').value
  })
    .then(function (docRef) {
      console.log('Document written with ID: ', docRef.id); // console.log para confirmar en consola
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
 };


