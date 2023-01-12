



const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];
console.log(itens);

itens.forEach((elemento) => {
    criaElemento(elemento)

})

form.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find(elemento => elemento.nome === nome.value)
    
    const itemAtual= {
        "nome": nome.value,
        "quantidade": quantidade.value
    }
    if(existe){
        itemAtual.id = existe.id
        
        atualizaElemento(itemAtual)

        itens[itens.find(elemento => elemento.id === existe.id)] = itemAtual
    }else{
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id +1 : 0;

        // if (itens[itens.length -1]) {
        //     itemAtual.id = (itens[itens.length-1]).id +1;
        // } else {
        //     itemAtual.id = 0;
        // }

        criaElemento(itemAtual)

        itens.push(itemAtual);
    }

    
    // pega a string em formato JSON e transforma em objeto 
    //JSON.parse();
    // pega um objeto e transforma em string em formato json 
   // JSON.stringify

   
   //local Storage só deixa guardar Strings 
   
    localStorage.setItem("itens",JSON.stringify(itens));

    nome.value= "";
    quantidade.value = "";
})

function criaElemento(item){
    // para criar um elemento preciso receber esses dados , preciso receber um nome e quantidade
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;

    numeroItem.dataset.id = item.id

    novoItem.appendChild(numeroItem); 
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));
    lista.appendChild(novoItem); 
   
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id){
    const elementoBotao = document.createElement("button");
    elementoBotao.innerHTML = "X";
    elementoBotao.addEventListener("click", function (){
        deletaElemento(this.parentNode,id);
    })
    return elementoBotao;
}

function deletaElemento(tag,id) {
    tag.remove();
    // remover um item do array 
   itens.splice(itens.findIndex(elemento => elemento.id === id ),1)
   
    // e escrever no local Storage
    localStorage.setItem("itens",JSON.stringify(itens));
}










// const form = document.getElementById("novoItem")
// const lista = document.getElementById("lista")
// const itens = JSON.parse(localStorage.getItem("itens")) || []

// itens.forEach( (elemento) => {
//     criaElemento(elemento)
// } )

// form.addEventListener("submit", (evento) => {
//     evento.preventDefault()

//     const nome = evento.target.elements['nome']
//     const quantidade = evento.target.elements['quantidade']

//     const existe = itens.find( elemento => elemento.nome === nome.value )

//     const itemAtual = {
//         "nome": nome.value,
//         "quantidade": quantidade.value
//     }

//     if (existe) {
//         itemAtual.id = existe.id
        
//         atualizaElemento(itemAtual)

//         itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
//     } else {
//         itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

//         criaElemento(itemAtual)

//         itens.push(itemAtual)
//     }

//     localStorage.setItem("itens", JSON.stringify(itens))

//     nome.value = ""
//     quantidade.value = ""
// })

// function criaElemento(item) {
//     const novoItem = document.createElement("li")
//     novoItem.classList.add("item")

//     const numeroItem = document.createElement("strong")
//     numeroItem.innerHTML = item.quantidade
//     numeroItem.dataset.id = item.id
//     novoItem.appendChild(numeroItem)
    
//     novoItem.innerHTML += item.nome

//     novoItem.appendChild(botaoDeleta(item.id))

//     lista.appendChild(novoItem)
// }

// function atualizaElemento(item) {
//     document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
// }

// function botaoDeleta(id) {
//     const elementoBotao = document.createElement("button")
//     elementoBotao.innerText = "X"

//     elementoBotao.addEventListener("click", function() {
//         deletaElemento(this.parentNode, id)
//     })

//     return elementoBotao
// }

// function deletaElemento(tag, id) {
//     tag.remove()

//     itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

//     localStorage.setItem("itens", JSON.stringify(itens))
// }