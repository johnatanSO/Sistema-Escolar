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

/* let email = "professor@testeprofessor.com"
let senha = "professor123" */



let email = document.getElementById('email')
let senha = document.getElementById('password')
let entrar = document.getElementById('entrar')

entrar.addEventListener('click', login)

function validateUser(doc){
    if(doc.data().email == auth.currentUser.email){
        console.log("Bem vindo, ", doc.data().nome)
        if(doc.data().ocupacao == "professor"){
           window.open("./pages/teacher/index.html") 
        }else{
            window.open("./pages/student/index.html")
        }
    }
}

function login() {
    auth.signInWithEmailAndPassword(email.value, senha.value)
        .then(()=>{
            db.collection('Alunos').get()
                .then(snapshot=>{
                    snapshot.forEach(validateUser)
                })
        })
    .catch(err=>{console.log(err.message)});   
}