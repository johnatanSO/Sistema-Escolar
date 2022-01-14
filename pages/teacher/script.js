const firebaseConfig = {
    apiKey: "AIzaSyCnLXJ2SKMz1rxfu8BJSE6LoLNKdDKFD7A",
    authDomain: "sistema-escolar-6c69e.firebaseapp.com",
    projectId: "sistema-escolar-6c69e",
    storageBucket: "sistema-escolar-6c69e.appspot.com",
    messagingSenderId: "754923962874",
    appId: "1:754923962874:web:8107120dc24de02d162443",
    measurementId: "G-PCCGDMDW76"
  };

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
let auth = firebase.auth()

/* ---------------------------------- */

function logOut(){
    window.location.href = "../../index.html"
}

let buttonNotas = document.querySelector(".notasContent")
buttonNotas.addEventListener("click", ()=>{
    let modalNotas = document.querySelector(".modalNotas")
    modalNotas.style.display = "flex"
})

let buttonAdvertencia = document.querySelector(".advertenceContent")
buttonAdvertencia.addEventListener("click", ()=>{
    let modalAdvertencia = document.querySelector(".modalAdvertencia")
    modalAdvertencia.style.display = "flex"
})

function fechar(element){
    element.parentNode.parentNode.style = "none"
}
/* Firebase */
getNotas()
function getNotas(){
    db.collection('Alunos').get()
    .then((snapshot)=>{
        snapshot.forEach(element => {
            if(element.data().ocupacao != "professor"){
                let table = document.getElementById('tableNotes')
                let tr = document.createElement('tr')
                let notaFinal = parseFloat((element.data().notas.nota1 + element.data().notas.nota2)/2).toFixed(1)

                tr.innerHTML = `<td>${element.data().nome}</td>`
                tr.innerHTML += `<td>${element.data().notas.nota1}</td>`
                tr.innerHTML += `<td>${element.data().notas.nota2}</td>`
                tr.innerHTML += `<td>${notaFinal}</td>`
                table.appendChild(tr)
            }
                
        });
})
}

