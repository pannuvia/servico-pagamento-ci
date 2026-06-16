export class ServicoDePagamento {
  #pagamentos;

  constructor() {
    this.#pagamentos = [];
  }

  realizarPagamento(codigoBarras, empresa, valor, categoria) {
    this.#pagamentos.push ({
      codigoBarras: codigoBarras,
      empresa: empresa,
      valor: valor,
      categoria: valor > 100 ? 'cara' : 'padrão'
   });
  }

  consultarUltimoPagamento() {
    if (this.#pagamentos.length === 0) {
      return null;
    }

    return this.#pagamentos.at(-1)
  }
}
