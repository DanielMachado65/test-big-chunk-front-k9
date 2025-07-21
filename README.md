# test-big-chunk-front-k9

Este projeto demonstra como executar um teste de carga simples utilizando [k6](https://k6.io/).

## Requisitos

- [Node.js](https://nodejs.org/)
- [k6](https://k6.io/docs/get-started/installation/) instalado globalmente ou via `npm`.

## Instalação

```bash
npm install
```

## Executando o teste

Defina a variável `BASE_URL` apontando para a aplicação que deseja testar e execute:

```bash
npm run load-test
```

Exemplo:

```bash
BASE_URL=https://meusite.com npm run load-test
```

Os scripts de teste ficam na pasta `tests/`.
