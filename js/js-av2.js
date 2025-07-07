/**
 * Arquivo: js/js-av2.js
 * Descrição: Classe Calcado com métodos para cadastro, consulta e gestão de estoque
 */

class Calcado {
    constructor() {
        // Atributos públicos conforme exigido (5 no total)
        this.idCalcado = '';      // Atributo de texto (código identificador)
        this.nomeCalcado = '';   // Atributo de texto
        this.corCalcado = '';     // Atributo de texto
        this.tamanhoCalcado = 0;  // Atributo numérico
        this.qtdeEstoque = 0;     // Atributo numérico obrigatório

        // Carrega os dados do sessionStorage ao inicializar
        this.obterDados();
    }

    // Método público para cadastrar todos os atributos
    cadastrar(id, nome, cor, tamanho, quantidade) {
        // Validações básicas
        if (!id || !nome || !cor || tamanho <= 0 || quantidade < 0) {
            throw new Error('Dados inválidos para cadastro');
        }

        this.idCalcado = id;
        this.nomeCalcado = nome;
        this.corCalcado = cor;
        this.tamanhoCalcado = Number(tamanho);
        this.qtdeEstoque = Number(quantidade);

        this._salvar(); // Persiste no sessionStorage
        return true;
    }

    // Método público para aumentar o estoque (atributo numérico)
    adicionarEstoque(quantidade) {
        if (isNaN(quantidade) || quantidade <= 0) {
            throw new Error('Quantidade deve ser um número positivo');
        }
        this.qtdeEstoque += Number(quantidade);
        this._salvar();
        return this.qtdeEstoque;
    }

    // Método público para reduzir o estoque (atributo numérico)
    removerEstoque(quantidade) {
        if (isNaN(quantidade) || quantidade <= 0) {
            throw new Error('Quantidade deve ser um número positivo');
        }
        if (quantidade > this.qtdeEstoque) {
            throw new Error('Quantidade indisponível em estoque');
        }
        this.qtdeEstoque -= Number(quantidade);
        this._salvar();
        return this.qtdeEstoque;
    }

    // Método público para exibir todos os atributos
    exibirDados() {
        return {
            id: this.idCalcado,
            nome: this.nomeCalcado,
            cor: this.corCalcado,
            tamanho: this.tamanhoCalcado,
            estoque: this.qtdeEstoque
        };
    }

    // Carrega os dados do sessionStorage
    obterDados() {
        const dados = sessionStorage.getItem('calcado');
        if (dados) {
            const calcadoObj = JSON.parse(dados);
            this.idCalcado = calcadoObj.idCalcado || '';
            this.nomeCalcado = calcadoObj.nomeCalcado || '';
            this.corCalcado = calcadoObj.corCalcado || '';
            this.tamanhoCalcado = Number(calcadoObj.tamanhoCalcado) || 0;
            this.qtdeEstoque = Number(calcadoObj.qtdeEstoque) || 0;
        }
        return this;
    }

    // Método privado para salvar no sessionStorage
    _salvar() {
        const dadosParaSalvar = {
            idCalcado: this.idCalcado,
            nomeCalcado: this.nomeCalcado,
            corCalcado: this.corCalcado,
            tamanhoCalcado: this.tamanhoCalcado,
            qtdeEstoque: this.qtdeEstoque
        };
        sessionStorage.setItem('calcado', JSON.stringify(dadosParaSalvar));
    }

    // Limpa os dados da sessão (para logout)
    limparDados() {
        sessionStorage.removeItem('calcado');
        this.idCalcado = '';
        this.nomeCalcado = '';
        this.corCalcado = '';
        this.tamanhoCalcado = 0;
        this.qtdeEstoque = 0;
    }
}

/**
 * Funções para integração com a interface HTML
 */

// Função para cadastrar calçado (chamada pelo botão Gravar)
function cadastrar() {
    try {
        const id = document.getElementById('id-calcado').value.trim();
        const nome = document.getElementById('nome-calcado').value.trim();
        const cor = document.getElementById('cor-calcado').value.trim();
        const tamanho = document.getElementById('tamanho-calcado').value;
        const quantidade = document.getElementById('qtde-estoque').value;

        // Validações
        if (!id || !nome || !cor || !tamanho || !quantidade) {
            throw new Error('Por favor, preencha todos os campos.');
        }

        const calcado = new Calcado();
        calcado.cadastrar(id, nome, cor, tamanho, quantidade);

        exibirMensagem('success', `Calçado cadastrado com sucesso!<br>
            ID: ${id}<br>
            Nome: ${nome}<br>
            Estoque: ${quantidade}`);

        // Limpa o formulário (opcional)
        document.getElementById('id-calcado').focus();

    } catch (error) {
        exibirMensagem('error', error.message);
        console.error('Erro no cadastro:', error);
    }
}

// Função para consultar calçado
function consultar() {
    try {
        const codigo = document.getElementById('txtCodCalcado').value.trim();
        const calcado = new Calcado().obterDados();

        if (!calcado.idCalcado) {
            throw new Error('Nenhum calçado cadastrado no sistema.');
        }

        if (codigo !== calcado.idCalcado) {
            throw new Error(`Calçado não encontrado. O código cadastrado é: ${calcado.idCalcado}`);
        }

        const dados = calcado.exibirDados();
        let resultadoHTML = `
            <h3>Dados do Calçado</h3>
            <p><strong>Código:</strong> ${dados.id}</p>
            <p><strong>Nome:</strong> ${dados.nome}</p>
            <p><strong>Cor:</strong> ${dados.cor}</p>
            <p><strong>Tamanho:</strong> ${dados.tamanho}</p>
            <p><strong>Estoque:</strong> ${dados.estoque}</p>
        `;

        document.getElementById('resultado').innerHTML = resultadoHTML;

    } catch (error) {
        document.getElementById('resultado').innerHTML = `
            <p class="error">${error.message}</p>
        `;
    }
}

// Função auxiliar para exibir mensagens
function exibirMensagem(tipo, mensagem) {
    const elemento = document.getElementById('txtMensagem');
    elemento.innerHTML = mensagem;
    elemento.className = tipo;
}