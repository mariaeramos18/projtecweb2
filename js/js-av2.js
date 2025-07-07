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
}    