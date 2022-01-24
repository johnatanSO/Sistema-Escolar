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

/* -----------------------acordion----------------- */

/* ---------------------------------- */

const materias = ["Português", "Matemática", "Programação", "Física", "Geografia","Química"]

function logOut() {
  auth
    .signOut()
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
/* ------------------------------notas---------------------------------- */
function getNotas() {
  db.collection("Alunos")
    .get()
    .then((snapshot) => {
      snapshot.forEach((element) => {
        if (element.data().ocupacao != "professor") {
          let contentTable = document.querySelector(".contentTable");

          let name = document.createElement("button");
          name.classList.toggle("accordion");
          name.innerText = element.data().nome;

          let panel = document.createElement("div");
          panel.classList.toggle("panel");

          let materias = [];
          element.data().materias.map((materia) => {
            materias.push(materia);
          });
          let trTh = document.createElement("tr");
          trTh.innerHTML += "<th>Matéria</th>";
          trTh.innerHTML += "<th>Nota 1</th>";
          trTh.innerHTML += "<th>Nota 2</th>";
          trTh.innerHTML += "<th>Média</th>";
          panel.appendChild(trTh);

          for (let i = 0; i < materias.length; i++) {
            let tr = document.createElement("tr");

            let nota1 = materias[i].nota1;
            let nota2 = materias[i].nota2;
            let media = Number((nota1 + nota2) / 2).toFixed(1);

            tr.innerHTML += `<td>${materias[i].materia}</td>`;
            tr.innerHTML += `<td>${nota1}</td>`;
            tr.innerHTML += `<td>${nota2}</td>`;
            tr.innerHTML += `<td>${media}</td>`;
            panel.appendChild(tr);
          }

          contentTable.appendChild(name);
          contentTable.appendChild(panel);

          name.addEventListener("click", function () {
            this.classList.toggle("active");

            var panel = this.nextElementSibling;
            if (panel.style.display == "block") {
              panel.style.display = "none";
            } else {
              panel.style.display = "block";
            }
          });
        }
      });
      return snapshot;
    })
    .then((snapshot) => {
      snapshot.forEach((element) => {
        if (element.data().ocupacao != "professor") {
          let dataListAlunos = document.getElementById("alunos");
          let optionAlunos = document.createElement("option");
          optionAlunos.setAttribute("value", element.data().nome);
          dataListAlunos.appendChild(optionAlunos);
        }
      });
      for (let i = 0; i < materias.length; i++) {
        let dataListMaterias = document.getElementById("materias");
        let optionMaterias = document.createElement("option");
        optionMaterias.setAttribute("value", materias[i]);
        dataListMaterias.appendChild(optionMaterias);
      }
    });
}

/*------------------------------- Editar Notas----------------- */

let editNotesButton = document.querySelector("#editNotes");
editNotesButton.addEventListener("click", () => {
  let modalEditNotes = document.querySelector("#modalEditNotes");
  modalEditNotes.style.display = "flex";
});

function atualizar() {
  let aluno = document.querySelector("#inputList");
  let nota1 = document.querySelector("#nota1Edit");
  let nota2 = document.querySelector("#nota2Edit");
  let materiasSelect = document.querySelector("#materiasList");

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
      .get()
      .then((element) => {
        let materias = [];
        element.data().materias.map((materia) => {
          materias.push(materia);
        });
        for (let i = 0; i < element.data().materias.length; i++) {
          if (materiasSelect.value == materias[i].materia) {
            db.collection("Alunos")
              .doc(aluno.value)
              .update({
                materias: firebase.firestore.FieldValue.arrayRemove({
                  materia: materiasSelect.value,
                  nota1: materias[i].nota1,
                  nota2: materias[i].nota2,
                }),
              })
              .then(() => {
                console.log("Adicionando notas")
                db.collection("Alunos")
                  .doc(aluno.value)
                  .update({
                    materias: firebase.firestore.FieldValue.arrayUnion({
                      materia: materiasSelect.value,
                      nota1: Number(nota1.value),
                      nota2: Number(nota2.value),
                    }),
                  });
              })
              .then(() => {
                console.log("Sucess!");
                setTimeout(() => {
                  window.document.location.reload(true);
                }, 1000);
              })
              .catch((err) => {
                console.log(err);
              });
              return
          }
        }
      });
  }
}
getNotas();

/* -------------------------------------- advertências ------------------ */

/* function getAdvertencias() {
  db.collection("Alunos")
    .get()
    .then((snapshot) => {
      snapshot.forEach((element) => {
        if (element.data().ocupacao != "professor") {
          let table = document.getElementById("tableAdvertencias");
          let tr = document.createElement("tr");

          tr.innerHTML = `<td>${element.data().nome}</td>`;
          tr.innerHTML += `<td>${
            element.data().advertencias.length
          } advertências</td>`;

          table.appendChild(tr);
        }
      });
      return snapshot;
    })
    .then((snapshot) => {
      snapshot.forEach((element) => {
        element.data().nome;
      });
    });
}
getAdvertencias(); */
