# 💳 Serviço de Pagamento (CI/CD com GitHub Actions)

Projeto prático desenvolvido como **Trabalho de Conclusão de Disciplina** para a pós-graduação em Automação de Testes de Software. O objetivo principal é demonstrar a aplicação prática de conceitos de **Integração Contínua (CI)** utilizando o **GitHub Actions** para automatizar a inspeção de código, execução de testes unitários e gerenciamento de artefatos.

A aplicação consiste em uma API de gerenciamento de pagamentos desenvolvida em **JavaScript (Node.js)** que valida regras de negócio baseadas em faixas de valores e fornece relatórios automatizados.

---

## 🚀 Tecnologias e Ferramentas Utilizadas

* **Ambiente de Execução:** Node.js (v24+ garantido na pipeline)
* **Linguagem:** JavaScript (ES6+ / ESModules)
* **Framework de Testes:** Mocha
* **Biblioteca de Asserções:** Node.js Assert (Nativo)
* **Inspeção de Código (Linter):** ESLint
* **Relatório Visual:** Mochawesome Reporter
* **Orquestração de CI/CD:** GitHub Actions

---

## 📦 Estrutura do Projeto

```
servico-pagamento-ci/
├── .github/
│   └── workflows/
│       └── pipeline.yaml     # Configuração da Pipeline CI
├── src/
│   └── servicoDePagamento.js # Regras de negócio da aplicação
├── test/
│   └── servicoDePagamento.test.js # Testes unitários automatizados
├── package.json              # Gerenciador de dependências e scripts
└── README.md                 # Documentação do projeto
```
---

## 🛠️ Funcionalidades e Regras de Negócio

A classe ServicoDePagamento expõe métodos para registrar e consultar transações de contas (ex: Cagece, Enel, Claro), aplicando uma categorização automática baseada no valor:

    - realizarPagamento(codigoBarras, empresa, valor): Registra o pagamento no histórico interno do sistema.
    - consultarUltimoPagamento(): Retorna o último pagamento efetuado. Caso não haja registros, retorna null.

Critério de Categorização de Gastos:

    - Valores maiores que 100 -> Categoria: "cara"
    - Valores menores ou iguais a 100 -> Categoria: "padrão"

---

## ⚙️ Instalação e Execução Local

Pré-requisitos

    Node.js instalado localmente.

1. Clonar o repositório e instalar dependências:

```Bash

npm install

```
2. Rodar a inspeção de código (Linter):

```Bash

npm run lint

```

(Para corrigir problemas automáticos de espaçamento/ponto e vírgula, utilize: npm run lint -- --fix)

3. Rodar os testes unitários e gerar relatório:

```Bash

npm run test

```

Após a execução, a pasta mochawesome-report/ será criada contendo o relatório detalhado em formato HTML.

---

## 🔄 Solução de Integração Contínua (CI)

A pipeline foi projetada dividindo o fluxo de trabalho em estágios interdependentes (Jobs). Desse modo, o deploy ou a execução de testes só ocorrem se o código estiver estritamente dentro dos padrões de formatação definidos.

Cenários de Gatilhos (Triggers) Implementados:

    - Gatilho por Push: Executa de forma 100% automatizada a cada commit enviado para a branch main.
    - Gatilho Manual (workflow_dispatch): Permite que qualquer analista ou testador acione a pipeline sob demanda através do painel do GitHub Actions.
    - Gatilho Agendado (schedule / cron): Configurado para rodar de forma recorrente em horários de menor pico: Terças, Quintas e Sábados às 09:00 UTC (06:00 da manhã no horário de Brasília).

---

## 🏗️ Arquitetura da Pipeline (Jobs)

A pipeline executa sequencialmente três grandes etapas em máquinas virtuais limpas baseadas em ubuntu-latest:

1. Inspeção de Código (inspecao)

Foca em validar a qualidade estrutural e legibilidade do código antes de processar lógicas complexas.

    Faz o download do repositório (actions/checkout).
    Prepara o ambiente isolado com Node.js (actions/setup-node).
    Instala as dependências de desenvolvimento (npm install).
    Roda o eslint para garantir que o código submetido não possua variáveis mortas ou quebras de padrão.

2. Testes Unitários (unidade)

Depende do sucesso do job de Inspeção (needs: [inspecao]).

    Configura o ambiente e roda a suite de testes automatizados com o Mocha.
    Geração e Armazenamento do Artefato: Utiliza a action actions/upload-artifact. Mesmo que um teste falhe (if: ${{ always() }}), a pipeline garante a coleta do relatório gerado pelo mochawesome-report em HTML, disponibilizando-o diretamente na interface do GitHub para auditoria.

3. Deploy Simulador (deploy)

Depende do sucesso do job de Unidade (needs: [unidade]).

    Simula a última etapa de uma esteira de entrega contínua (CD), garantindo que o código só estaria apto para produção após passar por todas as travas de segurança anteriores.

---

## 🧑‍💻 Exemplo de Uso Prático da Classe

```javascript

import { ServicoDePagamento } from './src/servicoDePagamento.js';

const servico = new ServicoDePagamento();

// Realizando um pagamento acima de 100
servico.realizarPagamento('0987-7656-3475', 'Cagece', 156.87);

// Consultando a saída processada
console.log(servico.consultarUltimoPagamento());

```

```Bash

Saída no terminal:
{
  "codigoBarras": "0987-7656-3475",
  "empresa": "Cagece",
  "valor": 156.87,
  "categoria": "cara"
}

```
---

## 👩‍💻 Autora

    Pannuvia Soares Monteiro

    Trabalho prático de avaliação da disciplina de Integração Contínua para Automação de Testes.