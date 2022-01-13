function logOut(){
    window.location.href = "../../index.html"
}

let buttonNotas = document.querySelector(".notasContent")
buttonNotas.addEventListener("click", ()=>{
    let modalNotas = document.querySelector(".modalNotas")
    modalNotas.style.display = "flex"

    let closeButton = document.querySelectorAll(".fechar")[0]
    closeButton.addEventListener("click", ()=>{
        let modalNotas = document.querySelector(".modalNotas")
        modalNotas.style.display = "none"

    })
})

let buttonAdvertencia = document.querySelector(".advertenceContent")
buttonAdvertencia.addEventListener("click", ()=>{
    let modalAdvertencia = document.querySelector(".modalAdvertencia")
    modalAdvertencia.style.display = "flex"

    let closeButton = document.querySelectorAll('.fechar')[1]
    closeButton.addEventListener("click", ()=>{
        let modalAdvertencia = document.querySelector(".modalAdvertencia")
        modalAdvertencia.style.display = "none"
    })
})