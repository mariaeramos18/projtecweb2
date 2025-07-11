/**
 * Classe Calcado para gerenciamento de estoque de calçados
 */
class Calcado {
    constructor() {
        this.codigo = '';          // Código do calçado
        this.modelo = '';          // Modelo/descrição
        this.cor = '';             // Cor do calçado
        this.tamanho = 0;          // Tamanho numérico
        this.quantidade = 0;       // Quantidade em estoque (atributo numérico)
    }

    /**Cadastra todos os atributos do calçado
    *   
    */
    cadastrar(codigo, modelo, cor, tamanho, quantidade) {
        this.codigo = codigo;          // Atribui o código do calçado
        this.modelo = modelo;          // Atribui o modelo/descrição
        this.cor = cor;                // Atribui a cor do calçado
        this.tamanho = tamanho;        // Atribui o tamanho numérico
        this.quantidade = quantidade;  // Atribui a quantidade em estoque
        this._salvar();              // Chama o método para salvar os dados
    }
    /**Adiciona qunatidade ao estoque */
    adicionarQuantidade(qtde) {
        qtde = Number(qtde); // Converte a quantidade para número
        if (isNaN(qtde) || qtde <= 0) {
            throw new Error('Quantidade inválida para adição.');
        }
        this.quantidade += qtde; // Adiciona a quantidade ao estoque
        this._salvar(); // Chama o método para salvar os dados
        return this.quantidade; // Retorna a nova quantidade
    }

    /**Remove quantidade do estoque */
    removerQuantidade(qtde) {
        qtde = Number(qtde); // Converte a quantidade para número
        if (isNaN(qtde)) {
            throw new Error('Quantidade inválida para remoção.');
        }
        if (qtde <= 0) {
            throw new Error('Quantidade deve ser positiva.');
        }
    }

    /**Retorna os dados do calçado */
    obterDados() {
        this._carregar(); // Chama o método para carregar os dados
        return this; // Retorna o objeto atual com os dados carregados
    }

    /**Limpa os dados */
    limparDados() {
        sessionStorage.removeItem('calcado'); // Remove os dados do calçado do sessionStorage
        this.codigo = '';          // Limpa o código do calçado
        this.modelo = '';          // Limpa o modelo/descrição
        this.cor = '';             // Limpa a cor do calçado
        this.tamanho = 0;          // Limpa o tamanho numérico
        this.quantidade = 0;       // Limpa a quantidade em estoque
    }

    /**Método privado para salvar na sessão */
    _salvar() {
        const dados = {
            codigo: this.codigo,
            modelo: this.modelo,
            cor: this.cor,
            tamanho: this.tamanho,
            quantidade: this.quantidade
        };
        sessionStorage.setItem('calcado', JSON.stringify(dados)); // Salva os dados do calçado no sessionStorage
    }

    // Método privado para carregar da sessão
    _carregar() {
        const dados = sessionStorage.getItem('calcado');
        if (dados) {
            const obj = JSON.parse(dados);
            this.codigo = obj.codigo || '';
            this.modelo = obj.modelo || '';
            this.cor = obj.cor || '';
            this.tamanho = Number(obj.tamanho) || 0;
            this.quantidade = Number(obj.quantidade) || 0;
        }
        return this;
    }

    /**
     * Adiciona um novo calçado ao estoque, cadastrando todos os atributos
     * @param {string} codigo Código do calçado
     * @param {string} modelo Modelo/descrição
     * @param {string} cor Cor do calçado
     * @param {number} tamanho Tamanho numérico
     * @param {number} quantidade Quantidade em estoque
     */
    adicionarNovoCalcado(codigo, modelo, cor, tamanho, quantidade) {
        if (!codigo || !modelo || !cor || isNaN(tamanho) || isNaN(quantidade) || quantidade < 0) {
            throw new Error('Preencha todos os campos corretamente.');
        }
        this.codigo = codigo;
        this.modelo = modelo;
        this.cor = cor;
        this.tamanho = Number(tamanho);
        this.quantidade = Number(quantidade);
        this._salvar();
        return this;
    }

    /**
     * Cadastra um novo calçado e salva no sessionStorage
     */
    cadastrarCalcado(codigo, modelo, cor, tamanho, quantidade) {
        if (!codigo || !modelo || !cor || isNaN(tamanho) || isNaN(quantidade) || quantidade < 0) {
            return false;
        }
        this.codigo = codigo;
        this.modelo = modelo;
        this.cor = cor;
        this.tamanho = Number(tamanho);
        this.quantidade = Number(quantidade);
        sessionStorage.setItem("calcado_codigo", this.codigo);
        sessionStorage.setItem("calcado_modelo", this.modelo);
        sessionStorage.setItem("calcado_cor", this.cor);
        sessionStorage.setItem("calcado_tamanho", this.tamanho);
        sessionStorage.setItem("calcado_quantidade", this.quantidade);
        return true;
    }

    /**
     * Consulta o calçado cadastrado no sessionStorage
     */
    consultarCalcado() {
        this.codigo = sessionStorage.getItem("calcado_codigo") || '';
        this.modelo = sessionStorage.getItem("calcado_modelo") || '';
        this.cor = sessionStorage.getItem("calcado_cor") || '';
        this.tamanho = Number(sessionStorage.getItem("calcado_tamanho")) || 0;
        this.quantidade = Number(sessionStorage.getItem("calcado_quantidade")) || 0;
        return {
            codigo: this.codigo,
            modelo: this.modelo,
            cor: this.cor,
            tamanho: this.tamanho,
            quantidade: this.quantidade
        };
    }
}

// Função para login
function login() {
    const email = document.getElementById('txtEmail').value;
    const senha = document.getElementById('txtSenha').value;
    const msg = document.getElementById('txtMensagem');

    //Só será possível entrar com o e-mail teste.com.br e senha teste
    if (email === 'teste.com.br' && senha === 'teste') {
        window.location.href = 'menu.html';
    } else {
        msg.innerHTML = 'E-mail ou senha incorretos';
        document.getElementById('txtEmail').focus();
    }
}

// Função para encerrar
function encerrar() {
    window.location.href = 'encerrar.html';
}