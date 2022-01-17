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

let buttonNotas = document.querySelector(".notasContent");
buttonNotas.addEventListener("click", () => {
  let modalNotas = document.querySelector(".modalNotas");
  modalNotas.style.display = "flex";
});

let buttonAdvertencia = document.querySelector(".advertenceContent");
buttonAdvertencia.addEventListener("click", () => {
  let modalAdvertencia = document.querySelector(".modalAdvertencia");
  modalAdvertencia.style.display = "flex";
});

function fechar(element) {
  element.parentNode.parentNode.style = "none";
}
/* Firebase */

function getNotas() {
  db.collection("Alunos")
    .get()
    .then((snapshot) => {
      snapshot.forEach((element) => {
        if (element.data().ocupacao != "professor") {
          let table = document.getElementById("tableNotes");
          let tr = document.createElement("tr");

          let datalistAlunos = document.querySelector("#alunos");
          let optionAlunos = document.createElement("option");

          let notaFinal = parseFloat(
            (Number(element.data().notas.nota1) +
              Number(element.data().notas.nota2)) /
              2
          ).toFixed(1);

          optionAlunos.setAttribute("value", element.data().nome);
          tr.innerHTML = `<td>${element.data().nome}</td>`;
          tr.innerHTML += `<td>${element.data().notas.nota1}</td>`;
          tr.innerHTML += `<td>${element.data().notas.nota2}</td>`;
          tr.innerHTML += `<td>${notaFinal}</td>`;
          table.appendChild(tr);
          datalistAlunos.appendChild(optionAlunos);
        }
      });
    });
}

/* Editar Notas */

let editNotesButton = document.querySelector("#editNotes");
editNotesButton.addEventListener("click", () => {
  let modalEditNotes = document.querySelector("#modalEditNotes");
  modalEditNotes.style.display = "flex";
});

function atualizar() {
  let aluno = document.querySelector("#inputList");
  let nota1 = document.querySelector("#nota1Edit");
  let nota2 = document.querySelector("#nota2Edit");

  if (
    nota1.value < 0 ||
    nota1.value > 10 ||
    nota2.value < 0 ||
    nota2 > 0 ||
    nota1.value == null ||
    nota2.value == null
  ) {
    console.log("Erro, por favor verifique os campos e tente novamente!");
  } else {
    db.collection("Alunos")
      .doc(aluno.value)
      .update({
        notas: {
          nota1: nota1.value,
          nota2: nota2.value,
        },
      })
      .then(() => {
        console.log("sucess");
        setInterval(() => {
          document.location.reload(true);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
getNotas();
