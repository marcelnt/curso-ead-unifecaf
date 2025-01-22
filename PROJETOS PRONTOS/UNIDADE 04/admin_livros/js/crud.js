/****************************************************************************************************************
 * Objetivo: Realizar o CRUD de dados referente aos livros
 * Data: 21/01/2025
 * Autor: Marcel
 * Versão: 1.0
 * Git: https://github.com/marcelnt/curso-ead-unifecaf
 * API: https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/livros
 *****************************************************************************************************************/

const botaoSalvar = document.getElementById('salvar')

//Inserir um novo Livro
const postLivro = async function(){
    
    let URL = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/livro'

    let dadosJSON = {}

    //Receber os dados do formulário
    let nomeLivro  = document.getElementById('title')
    let descLivro  = document.getElementById('subtitle')
    let fotoLivro  = document.getElementById('image')
    let valorLivro = document.getElementById('price')

    //Validação ...


    //Criar o JSON de dados {title: "livro1", subtitle: "Livro de progr..."}
    dadosJSON.title    = nomeLivro.value
    dadosJSON.subtitle = descLivro.value
    dadosJSON.image     = fotoLivro.value
    dadosJSON.price     = valorLivro.value


    //POST do dados para a API de livros
    let response = await fetch(URL, {
        method: 'POST',
        mode: 'cors',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(dadosJSON)
    })

    if(response.status == 201){
        alert('Registro foi inserido com sucesso!')
        resetForm()
        getAllLivros()
    }else{
        alert('Houve problemas na requisição dos dados!')
    }

}

//Atualizar um Livro existente
const putLivro = async function(){
    let id = sessionStorage.getItem('idLivro')

    let URL = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/atualizar/livro/'+id

    let dadosJSON = {}

    //Receber os dados do formulário
    let nomeLivro  = document.getElementById('title')
    let descLivro  = document.getElementById('subtitle')
    let fotoLivro  = document.getElementById('image')
    let valorLivro = document.getElementById('price')

    //Validação ...


    //Criar o JSON de dados {title: "livro1", subtitle: "Livro de progr..."}
    dadosJSON.title    = nomeLivro.value
    dadosJSON.subtitle = descLivro.value
    dadosJSON.image     = fotoLivro.value
    dadosJSON.price     = valorLivro.value


    //POST do dados para a API de livros
    let response = await fetch(URL, {
        method: 'PUT',
        mode: 'cors',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(dadosJSON)
    })

    if(response.status == 200){
        alert('Registro foi atualizado com sucesso!')
        resetForm()
        document.getElementById('salvar').innerText = 'Salvar'
        getAllLivros()
    }else{
        alert('Houve problemas na requisição dos dados!')
    }

}

//Excluir um Livro existente
const deleteLivro = async function(id){
    let URL = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/excluir/livro/'+id

    let response = await fetch(URL, {
        method: 'DELETE'
    })

    if(response.status == 200){
        alert('Registro excluído com sucesso!')
        getAllLivros()
    }else{
        alert('Não foi possível encontrar ou excluído o registro solicitado!')
    }


}

//Retorna Todos os Livros
const getAllLivros = async function(){
    let URL = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/livros'

    let response = await fetch(URL)

    let dados = await response.json()
    
    //Recebe o elemento principal para colocar a lista de dados
    let divListDados = document.getElementById('listDados')

    divListDados.innerText = '' //Limpando a lista de livros

    dados.books.forEach(function(itemLivro){
   
        let nomeLivro   = itemLivro.title
        let descLivro   = itemLivro.subtitle
        let valorLivro  = itemLivro.price
        let idLivro     = itemLivro.id

        //Criar elementos no HTML
        let divDados    = document.createElement('div')
        let divTitle    = document.createElement('div')
        let divSubtitle = document.createElement('div')
        let divPrice    = document.createElement('div')
        let divOpcoes   = document.createElement('div')
        let spanEditar  = document.createElement('span')
        let spanExcluir = document.createElement('span')
        let imgEditar   = document.createElement('img')
        let imgExcluir  = document.createElement('img')

        //Adicionar atributos
        divDados.setAttribute('class', 'linha dados')
        imgEditar.setAttribute('src', 'icones/editar.png')
        imgEditar.setAttribute('idLivro', idLivro)
        imgExcluir.setAttribute('src', 'icones/excluir.png')
        imgExcluir.setAttribute('idLivro', idLivro)

        //Textos
        divTitle.innerText = nomeLivro
        divSubtitle.innerText = descLivro
        divPrice.innerText = valorLivro

        //Associar elementos pai e seus filhos
        divListDados.appendChild(divDados)
        divDados.appendChild(divTitle)
        divDados.appendChild(divSubtitle)
        divDados.appendChild(divPrice)
        divDados.appendChild(divOpcoes)
        divOpcoes.appendChild(spanEditar)
        divOpcoes.appendChild(spanExcluir)
        spanEditar.appendChild(imgEditar)
        spanExcluir.appendChild(imgExcluir)


        //Função para excluir um livro
        imgExcluir.addEventListener('click', function(){
            deleteLivro(imgExcluir.getAttribute('idLivro'))
        })

        //Função para buscar um livro pelo id
        imgEditar.addEventListener('click', function(){
            getByIdLivro(imgEditar.getAttribute('idLivro'))
        })

    })

}

//Buscar um Livro pelo ID
const getByIdLivro = async function(id){

    //Guarda o ID de forma que possamos recurar em outra função independente do evento
    sessionStorage.setItem('idLivro', id)

    let URL = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/livro/'+id

    let response = await fetch(URL)

    let dados = await response.json()

    document.getElementById('title').value = dados.books[0].title
    document.getElementById('subtitle').value = dados.books[0].subtitle
    document.getElementById('image').value = dados.books[0].image
    document.getElementById('price').value = dados.books[0].price

    document.getElementById('salvar').innerText = 'Atualizar'
}

const resetForm = function(){

    document.getElementById('title').value = ''
    document.getElementById('subtitle').value = ''
    document.getElementById('image').value = ''
    document.getElementById('price').value = ''
}

botaoSalvar.addEventListener('click', function(){
    if(botaoSalvar.innerText == 'Salvar'){
        postLivro()
    }else{
        putLivro()
    }
})

window.addEventListener('load', function(){
    getAllLivros()
})

