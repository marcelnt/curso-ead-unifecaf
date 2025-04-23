/*********************************************************************
 * Objetivo: Arquivo para criar CARDS de livros no HTML
 * Data: 08/10/2024
 * Autor: Marcel
 * Versão: 1.0
 *********************************************************************/
import { livros } from './livros.js'

const setDadosLivros = function(listaDeLivros) {
    
    //Recebendo o objeto <div> principal que irá ter todos os cards criados
    let cardProdutos = document.getElementById('cardProdutos')
    
    //Repetição para percorrer o array de livros
    listaDeLivros.books.forEach(function(item){

    //Criamos uma tag no HTML para uma div
    let divCaixaProduto     = document.createElement('div')
    let h2CaixaTitulo       = document.createElement('h2')
    //Permite criar uma área de texto para colocar em algum elemento HTML
    let textoTitulo         = document.createTextNode(item.title)
    let figureCaixaImagem   = document.createElement('figure')
    let img                 = document.createElement('img')
    let divCaixaTexto       = document.createElement('div')
    let pCaixaTexto         = document.createElement('p')
    let textoDescricao      = document.createTextNode(item.subtitle)
    let divBotao            = document.createElement('div')


    //Adiciona um novo atributo em uma tag no HTML
    divCaixaProduto.setAttribute('class', 'caixa_produto')
    h2CaixaTitulo.setAttribute('class', 'caixa_titulo')
    figureCaixaImagem.setAttribute('class', 'caixa_imagem')
    img.setAttribute('src', item.image)
    img.setAttribute('alt', 'Foto de livro')
    img.setAttribute('title', 'Foto do livro de Tecnologia JS')
    divCaixaTexto.setAttribute('class', 'caixa_texto')
    divBotao.setAttribute('class', 'comprar')
    
    //divCaixaProduto.setAttribute('id', 1)

    
    //Adicionei a nova div dentro do elemento pai (cardProdutos)
    cardProdutos.appendChild(divCaixaProduto)
    divCaixaProduto.appendChild(h2CaixaTitulo)
    h2CaixaTitulo.appendChild(textoTitulo)
    divCaixaProduto.appendChild(figureCaixaImagem)
    figureCaixaImagem.appendChild(img)
    divCaixaProduto.appendChild(divCaixaTexto)
    divCaixaTexto.appendChild(pCaixaTexto)
    pCaixaTexto.appendChild(textoDescricao)
    divCaixaProduto.appendChild(divBotao)
    divBotao.innerText = 'Comprar'

}) //Fechamento do forEach


}

const getLivrosAPI = async function(){
    //Link da url da API de livros
    
    //URL antiga
    //let url = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/livros'

    //URL Nova
    let url = 'https://projeto-livraria-latx.onrender.com/v2/livraria/livro/1'

    //Executa a URL utilizando o fetch
    let response = await fetch(url)

    //Converte os dados em json
    let dadosLivros = await response.json()

    //Chama a função para criar os cards dos livros
    setDadosLivros(dadosLivros)
}

window.addEventListener('load', function(){
    //getDadosLivros(livros[0].books)
    //setDadosLivros(livros[0])
    getLivrosAPI()
})
