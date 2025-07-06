class ProdutoEstoque {
    // 5 atributos públicos (1 numérico)
    nomeCalcado;
    descCalcado; //descrição do calçado
    qtdeEstoque; //quaantidade calçado
    idCalcado;
    localArmazenamento;
}

constructor(nome = '', descricao = '', quantidade = 0, id = '', local = ''){
    this.nomeCalcado = nome;
    this.descCalcado = descricao;
    this.qtdeEstoque = quantidade;
    this.idCalcado = id;
    this.localArmazenamento = local;
}

// Método aumenta o atributo numérico
adicionarAoEstoque(valor) {
    //Verifica se o valor é positivo
    if (typeof valor === 'number' && valor > 0) {
        this.qtdeEstoque += valor;
        return true; // retorna true em caso de sucesso
    }
    return false;    //retorna false se o valor for inválido
}

// Método reduz o atributo numérico
removerDoEstoque(valor) {

}