# REST API Example

REST API feita em Node.js, utlizando postregreSQL como banco de dados.

## URL Base

`http://localhost:3000/api/v1/`

## Documentação da API

`https://app.swaggerhub.com/apis-docs/lucassodrem1/Rest-API-Example/1.0.0/`

## Importar Requisições

Baixe o arquivo `assets/RestAPIExample.collection.json` e importe no seu programa de API Client(Postman, Insomnia, etc.) preferido para ter todas as requisições.

## Passo a passo

Passo a passo de como rodar a aplicação em ambiente de desenvolvimento ou produção.

1. Faça o download do json das requisições para importar no seu API Client;
2. Crie um database com o nome de `restapiexample`;
3. Execute `npm i` para instalar as dependências;
4. Execute `npm run up` para popular o banco com a migration;
5. Para iniciar o servidor em ambiente de produção, use: `npm start`. Para desenvolvimento, use: `npm run start:dev`.

## Testes

Passo a passo para rodar testes da aplicação.

1. Crie um database com o nome de `testrestapiexample`;
2. Para fazer os testes, basta executar o comando `npm test`.
