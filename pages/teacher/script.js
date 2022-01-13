function logOut(){
    window.location.href = "../../index.html"
}

let closeButton = document.querySelector("#fechar")

closeButton.addEventListener("click", ()=>{
    let modalNotas = document.getElementsByClassName("modalNotas")[0]
    modalNotas.style.display = "none"
})




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