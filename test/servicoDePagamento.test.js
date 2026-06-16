import { ServicoDePagamento } from '../src/servicoDePagamento.js';
import assert from 'node:assert';


describe('Testes da Classe de Servico de Pagamento', () => {

  it('Deve realizar um pagamento com valor maior que 100', () => {
    const servicoDePagamento = new ServicoDePagamento();

    servicoDePagamento.realizarPagamento('0987-7656-3475', 'Cagece', 156.87);
    const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

    assert.equal(ultimoPagamento.codigoBarras, '0987-7656-3475');
    assert.equal(ultimoPagamento.empresa, 'Cagece');
    assert.equal(ultimoPagamento.valor, 156.87);
    assert.equal(ultimoPagamento.categoria, 'cara');
  });

  it('Deve realizar um pagamento com valor igual a 100', () => {
    const servicoDePagamento = new ServicoDePagamento();

    servicoDePagamento.realizarPagamento('1234-5678-0000', 'Enel', 100);
    const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

    assert.equal(ultimoPagamento.codigoBarras, '1234-5678-0000');
    assert.equal(ultimoPagamento.empresa, 'Enel');
    assert.equal(ultimoPagamento.valor, 100);
    assert.equal(ultimoPagamento.categoria, 'padrão');
  });

  it('Deve realizar um pagamento com valor menor que 100', () => {
    const servicoDePagamento = new ServicoDePagamento();

    servicoDePagamento.realizarPagamento('4321-8765-0000', 'Claro', 99.99);
    const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

    assert.equal(ultimoPagamento.codigoBarras, '4321-8765-0000');
    assert.equal(ultimoPagamento.empresa, 'Claro');
    assert.equal(ultimoPagamento.valor, 99.99);
    assert.equal(ultimoPagamento.categoria, 'padrão');
  });

  it('Deve retornar apenas o último pagamento', () => {
    const servicoDePagamento = new ServicoDePagamento();

    servicoDePagamento.realizarPagamento('0987-7656-3475', 'Cagece', 156.87);
    servicoDePagamento.realizarPagamento('1234-5678-0000', 'Enel', 100);
    servicoDePagamento.realizarPagamento('4321-8765-0000', 'Claro', 99.99);
    const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

    assert.equal(ultimoPagamento.codigoBarras, '4321-8765-0000');
    assert.equal(ultimoPagamento.empresa, 'Claro');
    assert.equal(ultimoPagamento.valor, 99.99);
    assert.equal(ultimoPagamento.categoria, 'padrão');
  });

  it('Deve retornar null quando não houver pagamentos', () => {
    const servicoDePagamento = new ServicoDePagamento();
    const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

    assert.equal(ultimoPagamento, null);
  });

});