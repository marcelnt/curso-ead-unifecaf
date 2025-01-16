        //Função tradicional (antigo - pouco utilizado)
        function somarValores(){
            var numero1 = document.getElementById('valor1')
            var numero2 = document.getElementById('valor2')

            var soma = Number(numero1.value) + Number(numero2.value)

            alert('O resultado é: ' + soma)
        }

        //Função anonima
        var somarValoresNovos = function(){
            var numero1 = document.getElementById('valor1')
            var numero2 = document.getElementById('valor2')

            var soma = Number(numero1.value) + Number(numero2.value)

            alert('O resultado da soma é: ' + soma)
        }

        //Função de seta (Arrow Function)
        var soma = () => {
            var numero1 = document.getElementById('valor1')
            var numero2 = document.getElementById('valor2')

            var soma = Number(numero1.value) + Number(numero2.value)

            alert('O resultado desta soma será: ' + soma)
        }