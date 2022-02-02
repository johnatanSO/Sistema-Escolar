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

/* ----------------FIREBASE---------- */

db.collection("Alunos")
  .get()
  .then((snapshot) => {
    snapshot.forEach((element) => {
      if (auth.currentUser.email == element.data().email) {
        let userName = document.getElementById("userName");
        userName.innerText = element.data().nome;
      }
    });
  });
/* ----------------NAME STUDENT----------------- */

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
          if (auth.currentUser.email == element.data().email) {
            let contentTableNotas =
              document.querySelector(".contentTableNotas");

            let name = document.createElement("h2");
            name.classList.toggle("accordion");
            name.innerText = element.data().nome;

            let arrow = document.createElement('img')
            arrow.setAttribute('src', './assets/down.png')
            arrow.classList.toggle('arrow')
            name.appendChild(arrow)

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
                arrow.setAttribute('src', './assets/down.png')
              } else {
                panel.classList.remove("remove");
                panel.classList.toggle("show");
                $(".show").slideDown(200);
                arrow.setAttribute('src', './assets/up.png')
              }
            });
          }
        }
      });
      return snapshot;
    })
    .then((snapshot) => {
      console.log("Get notas sucesfull!");
    })
    .catch((err) => {
      console.log(err);
    });
}

getNotas();

/* -------------------------------------- advertências ------------------ */

function getAdvertencias() {
  db.collection("Alunos")
    .get()
    .then((snapshot) => {
      snapshot.forEach((element) => {
        if (element.data().ocupacao != "professor") {
          if (auth.currentUser.email == element.data().email) {
            let contentTableAdvertencias = document.querySelector(
              ".contentTableAdvertencias"
            );

            let name = document.createElement("h2");
            name.classList.toggle("accordion");
            name.innerText = element.data().nome;

            let arrow = document.createElement('img')
            arrow.setAttribute('src', './assets/down.png')
            arrow.classList.toggle('arrow')
            name.appendChild(arrow)

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
                arrow.setAttribute('src', './assets/down.png')
              } else {
                panel.classList.remove("remove");
                panel.classList.toggle("show");
                $(".show").slideDown(200);
                arrow.setAttribute('src', './assets/up.png')
              }
            });
          }
        }
      });
      return snapshot;
    });
}
getAdvertencias();

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
          if (auth.currentUser.email == element.data().email) {
            let contentTableFaults = document.querySelector(
              ".contentTableFaults"
            );

            let name = document.createElement("h2");
            name.classList.toggle("accordion");
            name.innerText = element.data().nome;

            let arrow = document.createElement('img')
            arrow.setAttribute('src', './assets/down.png')
            arrow.classList.toggle('arrow')
            name.appendChild(arrow)

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
                arrow.setAttribute('src', './assets/down.png')
              } else {
                panel.classList.remove("remove");
                panel.classList.toggle("show");
                $(".show").slideDown(200);
                arrow.setAttribute('src', './assets/up.png')
              }
            });
          }
        }
      });
      return snapshot;
    });
}

getFaults();
