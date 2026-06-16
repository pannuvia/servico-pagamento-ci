# Serviço de Pagamento

Projeto criado como trabalho de conclusao da disciplina de Integração Continua Para Automação de Testes.
O projeto implementa uma classe que possui dois métodos: um para realizar pagamento e outro para consultar o último pagamento. 
Foi feito usando JavaScript rodando no Node.js


# Requisitos

- Node.js instalado
- npm instalado

---


# Estrutura do Projeto

```txt
servico-pagamento/
├── src/
│   └── ServicoDePagamento.js
├── test/
│   └── ServicoDePagamento.test.js
├── package.json
└── README.md
```


# Funcionalidades

A classe possui dois métodos:

## realizarPagamento

Responsável por registrar um pagamento.

## consultarUltimoPagamento

Responsável por consultar o ultimo pagamento realizado.
Caso não exista pagamento, retorna `null`.

### Regra de categoria

- Valor maior que `100` → categoria `"cara"`
- Valor menor ou igual a `100` → categoria `"padrão"`

---

# Exemplo de uso

```javascript
const ServicoDePagamento = require('./src/ServicoDePagamento');

const servicoDePagamento = new ServicoDePagamento();

servicoDePagamento.pagar(
  '0987-7656-3475',
  'Samar',
  156.87
);

console.log(
  servicoDePagamento.consultarUltimoPagamento()
);
```

## Saída

```javascript
{
  codigoBarras: '0987-7656-3475',
  empresa: 'Samar',
  valor: 156.87,
  categoria: 'cara'
}
```


## Instalação

```bash
npm install
```

## Rodar testes

```bash
npm test
```

## Gerar relatório

```bash
npm run test:report
```

---

## Tecnologias utilizadas

- Node.js
- Mocha
- Assert

---

## Execução em pipeline

Pipeline de integração contínua utilizando GitHub Actions para um projeto com testes automatizados, contemplando:
- Execução manual: Permite que ative a pipeline manualmente pelo site do GitHub
- Execução por push: Roda automaticamente toda vez que é enviado um commit para a branch main
- Execução agendada: Roda sozinha todas as terças, quintas e sábados às 06:00 da manhã (UTC)
- Geração de relatório de testes.
- Armazenamento/publicação do relatório na pipeline.

## Estrutura dos Jobs

A pipeline é dividida em dois estágios principais (jobs):

1. Verificação de Código

Foca na integridade e padronização do código antes da execução de qualquer lógica.

    Checkout: Baixa o código do repositório para a máquina virtual.
    Setup Node: Configura o ambiente Node.js na versão mais recente.
    Instalação: Executa o npm install para baixar as dependências.
    Inspeção (Lint): Roda o ESLint para verificar erros de sintaxe e padrões de estilo.

2. Testes Unitários

Executado somente se a verificação de código for bem-sucedida.

    Setup e Instalação: Prepara o ambiente para os testes.
    Execução dos Testes: Roda o comando npm run test:report, que utiliza o Mocha para validar as regras de negócio e gera um relatório visual.
    Upload de Artefato: Salva o relatório gerado pelo Mochawesome como um artefato da pipeline, permitindo que o resultado dos testes seja baixado e visualizado em formato HTML.


---

# Autor

Desenvolvido para desafio técnico por Pannuvia Soares Monteiro