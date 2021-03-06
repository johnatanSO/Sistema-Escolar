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

const materias = [
  "Português",
  "Matemática",
  "Programação",
  "Física",
  "Geografia",
  "Química",
];

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
/* -----------------------------PEGAR NOTAS---------------------------------- */
function getNotas() {
  db.collection("Alunos")
    .get()
    .then((snapshot) => {
      snapshot.forEach((element) => {
        if (element.data().ocupacao != "professor") {
          let contentTableNotas = document.querySelector(".contentTableNotas");

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

            if (nota1 == undefined || nota1 == null) {
              nota1 = 0;
            }
            if (nota2 == undefined || nota2 == null) {
              nota2 = 0;
              media = 0;
            }
            if (
              materias[i].materia == undefined ||
              materias[i].materia == null
            ) {
              tr.innerHTML += `<td>Sem matéria cadastrada</td>`;
            } else {
              tr.innerHTML += `<td>${materias[i].materia}</td>`;
            }

            tr.innerHTML += `<td>${nota1}</td>`;
            tr.innerHTML += `<td>${nota2}</td>`;
            tr.innerHTML += `<td>${media}</td>`;
            panel.appendChild(tr);
          }

          contentTableNotas.appendChild(name);
          contentTableNotas.appendChild(panel);

          name.addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;

            if (panel.style.display == "block") {
              panel.classList.remove("show");
              panel.classList.toggle("remove");
              $(".remove").slideUp(200);
            } else {
              panel.classList.remove("remove");
              panel.classList.toggle("show");
              $(".show").slideDown(200);
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
    nota2.value > 10 ||
    nota1.value == null ||
    nota2.value == null ||
    nota1.value == "" ||
    nota2.value == ""
  ) {
    alert("Erro, por favor verifique os campos e tente novamente!");
  } else {
    db.collection("Alunos")
      .doc(aluno.value)
      .get()
      .then((element) => {
        let loader = document.querySelector("#cLoaderN");
        loader.style.display = "block";
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
                console.log("Adicionando notas");
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
            return;
          }
        }
      });
  }
}
getNotas();

/* -------------------------------------- advertências ------------------ */

function getAdvertencias() {
  db.collection("Alunos")
    .get()
    .then((snapshot) => {
      snapshot.forEach((element) => {
        if (element.data().ocupacao != "professor") {
          let contentTableAdvertencias = document.querySelector(
            ".contentTableAdvertencias"
          );

          let name = document.createElement("button");
          name.classList.toggle("accordion");
          name.innerText = element.data().nome;

          let panel = document.createElement("div");
          panel.classList.toggle("panel");

          let advertencias = [];
          element.data().advertencias.map((advertencia) => {
            advertencias.push(advertencia);
          });
          let trTh = document.createElement("tr");
          trTh.innerHTML += "<th>Motivo</th>";
          trTh.innerHTML += "<th>Data</th>";

          panel.appendChild(trTh);

          for (let i = 0; i < advertencias.length; i++) {
            let tr = document.createElement("tr");

            let data = advertencias[i].data;
            let motivo = advertencias[i].motivo;

            tr.innerHTML += `<td>${motivo}</td>`;
            tr.innerHTML += `<td>${data}</td>`;

            panel.appendChild(tr);
          }

          contentTableAdvertencias.appendChild(name);
          contentTableAdvertencias.appendChild(panel);

          name.addEventListener("click", function () {
            this.classList.toggle("active");

            var panel = this.nextElementSibling;

            if (panel.style.display == "block") {
              panel.classList.remove("show");
              panel.classList.toggle("remove");
              $(".remove").slideUp(200);
            } else {
              panel.classList.remove("remove");
              panel.classList.toggle("show");
              $(".show").slideDown(200);
            }
          });
        }
      });
      return snapshot;
    });
}
getAdvertencias();

/* ------------------------------------EDITAR ADVERTÊNCIAS------------------------------ */
let editAdvertenciasButton = document.querySelector("#editAdvertencias");
editAdvertenciasButton.addEventListener("click", () => {
  let modalEditAdvertencias = document.querySelector("#modalEditAdvertencias");
  modalEditAdvertencias.style.display = "flex";
});

function inserirAdvertencias() {
  let aluno = document.querySelector("#alunoAdvertido");
  let motivo = document.querySelector("#advertenciasTextContent");
  let dia = document.querySelector("#dia");
  let data = dia.value;
  let dataFormatada = data.substr(0, 10).split("-").reverse().join("/");

  if (aluno.value == null || motivo.value == "" || data == null) {
    alert("Erro, por favor verifique os campos e tente novamente!");
  } else {
    let loader = document.querySelector("#cLoaderA");
    loader.style.display = "block";
    db.collection("Alunos")
      .doc(aluno.value)
      .update({
        advertencias: firebase.firestore.FieldValue.arrayUnion({
          motivo: motivo.value,
          data: dataFormatada,
        }),
      })
      .then(() => {
        setTimeout(() => {
          window.document.location.reload(true);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

/* ------------------------------ GET FAULTS -------------------------------- */

let buttonFaults = document.querySelector(".faultsContent");
buttonFaults.addEventListener("click", () => {
  let modalFaults = document.querySelector(".modalFaults");
  modalFaults.style.display = "flex";
});

function getFaults() {
  db.collection("Alunos")
    .get()
    .then((snapshot) => {
      snapshot.forEach((element) => {
        if (element.data().ocupacao != "professor") {
          let contentTableFaults = document.querySelector(
            ".contentTableFaults"
          );

          let name = document.createElement("button");
          name.classList.toggle("accordion");
          name.innerText = element.data().nome;

          let panel = document.createElement("div");
          panel.classList.toggle("panel");

          let faults = [];
          let materias = [];
          element.data().faltas.map((fault) => {
            faults.push(fault);
          });

          let trTh = document.createElement("tr");
          trTh.innerHTML += "<th>Matéria</th>";
          trTh.innerHTML += "<th>Faltas</th>";
          panel.appendChild(trTh);

          for (let i = 0; i < faults.length; i++) {
            let tr = document.createElement("tr");

            let fault = faults[i].faults;

            if (fault == undefined || fault == null) {
              fault = 0;
            }

            tr.innerHTML += `<td>${faults[i].materia}</td>`;
            tr.innerHTML += `<td>${fault}</td>`;
            panel.appendChild(tr);
          }

          contentTableFaults.appendChild(name);
          contentTableFaults.appendChild(panel);

          name.addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;

            if (panel.style.display == "block") {
              panel.classList.remove("show");
              panel.classList.toggle("remove");
              $(".remove").slideUp(200);
            } else {
              panel.classList.remove("remove");
              panel.classList.toggle("show");
              $(".show").slideDown(200);
            }
          });
        }
      });
      return snapshot;
    });
}

let editFaultsButton = document.querySelector("#editFaults");
editFaultsButton.addEventListener("click", () => {
  let modalEditFaults = document.querySelector("#modalEditFaults");
  modalEditFaults.style.display = "flex";
});

function adicionarFaults() {
  let alunoFault = document.querySelector("#alunoFault");
  let materiasSelect = document.querySelector("#materiasListFault");
  let qtdFault = document.querySelector("#faults");

  console.log("foi");

  db.collection("Alunos")
    .doc(alunoFault.value)
    .get()
    .then((element) => {
      let loader = document.querySelector("#cLoaderF");
      loader.style.display = "block";
      let faults = [];
      element.data().faltas.map((fault) => {
        faults.push(fault);
      });

      for (let i = 0; i < element.data().faltas.length; i++) {
        if (materiasSelect.value == faults[i].materia) {
          let fault = faults[i].faults;

          db.collection("Alunos")
            .doc(alunoFault.value)
            .update({
              faltas: firebase.firestore.FieldValue.arrayRemove({
                materia: materiasSelect.value,
                faults: fault,
              }),
            })
            .then(() => {
              console.log("adicionando faltas!");
              db.collection("Alunos")
                .doc(alunoFault.value)
                .update({
                  faltas: firebase.firestore.FieldValue.arrayUnion({
                    materia: materiasSelect.value,
                    faults: Number(qtdFault.value),
                  }),
                });
            })
            .then(() => {
              console.log("sucess!");
              setTimeout(() => {
                window.document.location.reload(true);
              }, 2000);
            })
            .catch((err) => {
              console.log(err);
            });
          return;
        }
      }
    });
}

getFaults();

/* ----------------------REGISTER STUDENT------------------ */

let buttonRegister = document.querySelector(".cadastrarAlunoContent");
buttonRegister.addEventListener("click", () => {
  let modalRegisterStudent = document.querySelector("#modalRegisterStudent");
  modalRegisterStudent.style.display = "flex";
});

function registerStudent() {
  let emailStudent = document.querySelector("#alunoEmail");
  let nomeStudent = document.querySelector("#alunoNome");
  let senhaStudent = document.querySelector("#senhaAluno");

  auth
    .createUserWithEmailAndPassword(emailStudent.value, senhaStudent.value)
    .then(() => {
      let loader = document.querySelector("#cLoaderR");
      loader.style.display = "block";
      auth
        .signInWithEmailAndPassword(
          "professor@testeprofessor.com",
          "professor123"
        )
        .then(() => {
          db.collection("Alunos")
            .doc(nomeStudent.value)
            .set({
              nome: nomeStudent.value,
              email: emailStudent.value,
              advertencias: [
                {
                  data: null,
                  motivo: null,
                },
              ],
              faltas: [
                { materia: "Português", faults: null },
                { materia: "Matemática", faults: null },
                { materia: "Programação", faults: null },
                { materia: "Química", faults: null },
                { materia: "Física", faults: null },
                { materia: "Geografia", faults: null },
              ],
              materias: [
                { materia: "Português", nota1: null, nota2: null },
                { materia: "Matemática", nota1: null, nota2: null },
                { materia: "Programação", nota1: null, nota2: null },
                { materia: "Química", nota1: null, nota2: null },
                { materia: "Física", nota1: null, nota2: null },
                { materia: "Geografia", nota1: null, nota2: null },
              ],
            })
            .then(() => {
              console.log("Sucess create user and db data!");
              setTimeout(() => {
                window.document.location.reload(true);
              }, 2000);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}
