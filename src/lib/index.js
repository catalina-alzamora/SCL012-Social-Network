// aqui exportaras las funciones que necesites

// export const myFunction = () => {
// aqui tu codigo
// console.log('Hola mundo!');
// }
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
    <section id="userPerfil">
    </section>
    <main id="fullMain">
    </main>
    <section id="newPostSection">
    </section>
    <button id="addPost" class="btnAdd"><a href="#addPost">°</a></button>`

const btnAddPost = document.getElementById('addPost');
const newPostSection  =document.getElementById('newPostSection');

