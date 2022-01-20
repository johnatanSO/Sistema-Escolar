function logOut() {
    auth.signOut()
      .then(() => {
        console.log("Usuário deslogado!");
        window.location.href = "../../index.html";
      })
      .catch((err) => {
        console.log(err);
      });
    
  }

const firebaseConfig = {
    apiKey: "AIzaSyCnLXJ2SKMz1rxfu8BJSE6LoLNKdDKFD7A",
    authDomain: "sistema-escolar-6c69e.firebaseapp.com",
    projectId: "sistema-escolar-6c69e",
    storageBucket: "sistema-escolar-6c69e.appspot.com",
    messagingSenderId: "754923962874",
    appId: "1:754923962874:web:8107120dc24de02d162443",
    measurementId: "G-PCCGDMDW76",
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  let auth = firebase.auth();
  
  /* ---------------------------------- */

db.collection("Alunos").get()
    .then((snapshot)=>{
        snapshot.forEach(element => {
            if(auth.currentUser.email == element.data().email){
                let userName = document.getElementById('userName')
                userName.innerText = element.data().nome
            }
        });
})