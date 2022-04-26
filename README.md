# (Em português)

## Introdução

A [livraria virtual da Humana](https://loja.humanasebolivraria.com.br) foi construída com as seguintes ferramentas:

- Frontend: [Next.js](https://nextjs.org);
- Gerenciamento de conteúdo: [Sanity](https://www.sanity.io);
- Shopping cart: [Snipcart](https://snipcart.com);
- Payment gateway: [Stripe](http://stripe.com);
- Webhook para cálculo do frete: [AWS Lambda](https://aws.amazon.com/pt/lambda/);
- Sistema de pesquisa: [Algolia](https://www.algolia.com);
- Deployment: [Netlify](https://www.netlify.com).

O site utiliza os modos de pré-renderização [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) para as telas dos livros e [Server-side Rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering) para o mostruário dinâmico de livros.

A Humana é uma livraria, editora e galeria de arte localizada em Chapecó, no oeste de Santa Catarina, Brasil. Para mais informações, clique [aqui](http://www.humanasebolivraria.com.br).

## Configuração

Se você não possui nenhuma experiência com o Next.js, comece por [aqui](https://nextjs.org/docs/getting-started).

Após clonar o projeto (`git clone git@bitbucket.org:fabricioboppre/humana.git`), não esqueça de instalar suas dependências (`npm install`).

As seguintes [variáveis de ambiente](https://nextjs.org/docs/basic-features/environment-variables) precisam ser configuradas:

- FRONT\_PAGE\_URL: URL base da loja, utilizada em alguns webhooks;
- SANITY\_PROJECT\_ID: ID do projeto no Sanity;
- SANITY\_DATASET: Nome do dataset no Sanity;
- SNIPCART\_API\_KEY: API key no Snipcart.

Se você quiser consultar a estrutura de dados criada no Sanity, é só entrar em [contato](mailto:fabricio.boppre@gmail.com).

## Tradução

Os comentários ao longo do código-fonte estão em inglês. Se algum brasileiro interessado em consultá-lo encontrar alguma dificuldade, entre em [contato](mailto:fabricio.boppre@gmail.com).

## Licença

O código-fonte deste site está compartilhado sob a licença MIT. Para mais informações, leia o arquivo [LICENSES](LICENSES.md).

# (In English)

## Introduction

[Humana's virtual bookstore](https://loja.humanasebolivraria.com.br) was built with the following tools:

- Frontend: [Next.js](https://nextjs.org);
- Content management: [Sanity](https://www.sanity.io);
- Shopping cart: [Snipcart](https://snipcart.com);
- Payment gateway: [Stripe](http://stripe.com);
- Shipping webhook: [AWS Lambda](https://aws.amazon.com/lambda/);
- Search feature: [Algolia](https://www.algolia.com);
- Deployment: [Netlify](https://www.netlify.com).

The site uses [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) pre-rendering mode for book screens and [Server-side Rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering) for the dynamic book showcase.

Humana is a bookstore, book publisher and art gallery located in Chapecó, Brazil. For more information, check [here](http://www.humanasebolivraria.com.br) (site in Portuguese).

## Configuration

If you have no experience with Next.js, start [here](https://nextjs.org/docs/getting-started).

After cloning the project (`git clone git@bitbucket.org:fabricioboppre/humana.git`), don't forget to install its dependencies (`npm install`).

These [environment variables](https://nextjs.org/docs/basic-features/environment-variables) must be set:

- FRONT\_PAGE\_URL: Store Base URL, needed by some webhooks;
- SANITY\_PROJECT\_ID: Project ID on Sanity;
- SANITY\_DATASET: Dataset name on Sanity;
- SNIPCART\_API\_KEY: API key on Snipcart.

If you want to check the data structure created on Sanity, [send me an email](mailto:fabricio.boppre@gmail.com).

## Translation

The store was created to serve Brazilian readers and that's why its frontend is in Portuguese. If a non-Portuguese speaker needs some clarification, I'll be glad [to help](mailto:fabricio.boppre@gmail.com).

## License

The source code of this website is shared under the MIT license. For more information, see [LICENSES](LICENSES.md).