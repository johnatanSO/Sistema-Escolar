  /* --------------------------------------------- */
console.log()
  db.collection('teste').get()
    .then((snapshot)=>{
        snapshot.forEach((element)=>{
            console.log(element.data())
        }) 
    })