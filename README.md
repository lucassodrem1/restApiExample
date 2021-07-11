# REST API Example

REST API feita em Node.js, utlizando postregreSQL como banco de dados.

## URL Base

`http://localhost:3000/api/v1/`

## Documentação da API

`https://app.swaggerhub.com/apis-docs/lucassodrem1/Rest-API-Example/1.0.0/`

## Passo a passo

Passo a passo de como rodar a aplicação em ambiente de desenvolvimento ou produção.

1. Importe as requisições no seu programa de API Client(Postman, Insomnia, etc.) usando o arquivo `assets/RestAPIExample.collection.json`;
2. Altere as variáveis `DATABASE_URL`e `TEST_DATABASE_URL` no arquivo `config.env` com as credenciais do seu banco de dados.
3. Crie um database com o nome de `restapiexample`;
4. Execute `npm i` para instalar as dependências;
5. Execute `npm run up` para popular o banco com a migration;
6. Para iniciar o servidor em ambiente de produção, use: `npm start`. Para desenvolvimento, use: `npm run start:dev` e...
   ...pronto! Sua aplicação já está pronta! \\(^o^)/

## Testes

Passo a passo para rodar testes da aplicação.

1. Crie um database com o nome de `testrestapiexample`;
2. Para fazer os testes, basta executar o comando `npm test`.

## Docker

`https://hub.docker.com/r/lucassodrem/rest-api-example`

1. Dê o pull nas 3 imagens do repositório acima;

   - `docker pull lucassodrem/rest-api-example:app`
   - `docker pull lucassodrem/rest-api-example:db`
   - `docker pull lucassodrem/rest-api-example:adminer`

2. Execute o comando `dock-composer up` para executar o container;
3. Crie a tabela `restapiexample`e `testrestapiexample` na imagem do db;
4. Execute o passo **2** novamente e execute o comando `npm run up:docker` para rodar a migration e...

...pronto! Sua aplicação já está pronta! \\(^o^)/

Obs: Caso queira fazer testes dentro do composer, use o comando `TEST_ENV=docker npm run test:docker`.
