
export const observer = () => {
  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        window.location.hash = '#home'                                      
      } else {
        alert("Usuario Invalido")
      }
  }); email - password.html;    
};

// función de ingreso de sesión
export const emailLogin = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(()=>{
    console.log('UsuarioActivo '+ email);
    window.location.hash = '#home'
  })
  .catch((error) => {
  // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    alert('Usuario no registrado')
  })
};

export const googleSignIn = () => {
  const baseProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(baseProvider)
  .then((result) => {
    console.log(result);
    console.log('Success Google acount Linked');
    window.location.hash = '#home';

  }).catch((err) => {
    console.log(err);
    console.log('Failed to do');
    alert("Error al ingresar")
  });
}

export function register(emailR, passR) {
  firebase.auth().createUserWithEmailAndPassword(emailR, passR)
  .then (()=>{
    console.log('Usuario registrado exitosamente')
  })
  .catch((error) => {
  // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
  email - password.html;
}

// funcionalidad de Cerrar Sesión
function cerrar() {
  console.log('hola');
  firebase.auth().signOut()
    .then(() => {
      console.log('Saliendo...');
    })
    .catch((error) => {
      console.log(error);
    });
}



const db = firebase.firestore();
// funcionalidad de posteo
// llamando al div donde se imprimirán los post
const divPost = document.getElementById('forPosting');
// escuchando colección en firebase para ir imprimiendo



const postimage = document.getElementById("uploadImage")


let imagesFBRef = firebase.database().ref('ImagesFB');

//postimage.addEventListener('change',confirmUpload)

// Imprimiendo imagen guardada en firebase
function showImgFromFB(){
  imagesFBRef.on('value', function(snapshot){
    let data = snapshot.val();
    let result = '';
    for(let key in data){
      result += `<img class="image" src="` + data[key].url + `"/>`;
    }
    document.getElementById('paraimg').innerHTML = result;
  })
}
// Subiendo imagen a firebase storage
export const uploadImgAndText = (valueImg, valueText) => {
  let storageRef = firebase.storage().ref();
  const uploadTask = storageRef.child('Images/' + valueImg.name).put(valueImg);
  uploadTask.on('state_changed',
  function(snapshot) {
  }, function(error) {
  alert('error');
  
  // Obteniendo URL de imagen
  }, function() {
    uploadTask.snapshot.ref.getDownloadURL()
    .then(function(downloadURL){
    savePost(valueText, downloadURL)       
  })
  
})
};

export const savePost = (textValue,imgUrl) => {
  db.collection('Post').add({
    correo: firebase.auth().currentUser.email,
    uid: firebase.auth().currentUser.uid,
    post: textValue,
    img: imgUrl,
  })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
      document.getElementById('textPost').value = '';
          
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
}

// Creando nodo en firebase 
// // llamando al div donde se imprimirán los post
// //const divPost = document.getElementById('forPosting');
// // escuchando colección en firebase para ir imprimiendo
// db.collection('postconuid').onSnapshot((querySnapshot) => {
//   // vaciando div para que no se repitan los post
//   divPost.innerHTML = '';
//   querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} => ${doc.data().post}`);
//       divPost.innerHTML +=
//       `<div class="postDiv">
//       <textarea class="postArea" readonly="readonly"> ${doc.data().post}</textarea>
//       <button class="abc">Comentarios</button>
//       </div>
//       <div class="commentDiv" style="display:none">
//     </div>`;
//     // función para mostrar caja de comentarios
//     function showComment (){
//     document.getElementsByClassName('commentDiv').style.display = 'block';
//     console.log('mostrar')
//     }
//    document.querySelectorAll('.commentDiv').forEach((element) => {
//     element.addEventListener('click', () =>{
//     console.log(element);
//     divPost.innerHTML = '';
//       })
//     })
//   });
// });

// // función comentar
//  function comment () {
//    console.log('comentar');
//    db.collection('postconuid').add({ // creando una coleción para agregar los datos a firebase
//     email: firebase.auth().currentUser.email,
//     uid: firebase.auth().currentUser.uid,
//     post: document.getElementById('texto').value,
//     comment: document.getElementsByClassName('commentArea').value
//   })
//     .then(function (docRef) {
//       console.log('Document written with ID: ', docRef.id); // console.log para confirmar en consola
//     })
//     .catch(function(error) {
//       console.error("Error adding document: ", error);
//     });
//  };


