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

1. Execute o comando `docker-compose up` para baixar as imagens e executar os containers;
2. Liste seus containers usando `docker container ls` para pegar o `containerID` da imagem `lucassodrem/rest-api-example:db`.
3. Após pegar o container ID, acesse o container usando `docker exec -it [containerID] bash`.
4. Use `psql -U postgres` para acessar o psql, depois crie um database chamado `restapiexample`e outro chamado `testrestapiexample`;
5. Execute o passo **1** novamente e execute o comando `npm run up:docker` dentro do app `restapiexample/restapiexample_app_1` para rodar a migration e...

...pronto! Sua aplicação já está pronta! \\(^o^)/

Obs: Caso queira executar os testes unitários dentro do composer, use o comando `TEST_ENV=docker npm run test:docker`.
