# Bagaaz Rick and Morty

Um sistema desenvolvido em **React** com **Vite** que consulta a [API do Rick and Morty](https://rickandmortyapi.com/) para exibir dados dos personagens, episódios e locais. O projeto permite filtrar personagens por nome e status, além de oferecer páginas detalhadas para personagens, episódios e locais.

## Índice
- [Recursos](#recursos)
- [Funcionalidades](#funcionalidades)
- [Tecnologias e Bibliotecas Utilizadas](#tecnologias-e-bibliotecas-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Como Iniciar](#como-iniciar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Licença](#licença)

## Recursos
- **Consulta e exibição de dados:** Personagens, episódios e locais da série.
- **Filtros dinâmicos:** Permite filtrar personagens por nome e status.
- **Páginas detalhadas:**
    - **Personagens:** Informações detalhadas, incluindo os episódios em que aparecem, origem e local.
    - **Episódios:** Informações do episódio e lista de personagens presentes.
    - **Locais:** Informações do local e os personagens que nele residem.
- **Navegação e roteamento:** Implementado com React Router para uma experiência de usuário fluida.

## Funcionalidades
- **Listagem de Personagens:** Visualização com cartões contendo informações básicas.
- **Detalhes do Personagem:** Página com detalhes do personagem, incluindo episódios, origem e local.
- **Listagem de Episódios e Locais:** Visualização com informações detalhadas e respectivos personagens.
- **Sistema de Paginação:** Permite navegar por grandes volumes de dados.
- **Validação de Filtros:** Utiliza schemas para validar os filtros aplicados na busca de personagens.

## Tecnologias e Bibliotecas Utilizadas
- **Framework e Build Tool:**
    - [React](https://reactjs.org/)
    - [Vite](https://vitejs.dev/)
- **Linguagens e Estilização:**
    - JavaScript (ES6+)
    - CSS
    - [Tailwind CSS](https://tailwindcss.com/)
- **Requisições HTTP:**
    - [Axios](https://axios-http.com/)
- **Roteamento:**
    - [React Router DOM](https://reactrouter.com/)
- **Formulários e Validação:**
    - [React Hook Form](https://react-hook-form.com/)
    - [Yup](https://github.com/jquense/yup)
- **API:**
    - [API do Rick and Morty](https://rickandmortyapi.com/)
- **Ferramentas de Qualidade:**
    - ESLint para padronização e qualidade de código

## Pré-requisitos
Antes de começar, certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- npm (gerenciador de pacotes) ou yarn

## Instalação
1. Clone o repositório:
   ```bash
   git clone git@github.com:bagaaz/rickandmorty.git
   ```
2. Navegue até a pasta do projeto:
   ```bash
   cd rickandmorty
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
   ou, se preferir usar o yarn:
   ```bash
   yarn install
   ```
   
## Como Iniciar
Após a instalação das dependências, você pode iniciar o projeto localmente com:
   
```bash
   npm run dev
```
ou, se preferir usar o yarn:
  
```bash
   yarn dev
```

O servidor de desenvolvimento iniciará e você poderá acessar o projeto no navegador através do endereço exibido no terminal (geralmente `http://localhost:5173`).


## Estrutura do Projeto
A estrutura do projeto está organizada da seguinte forma:

```
bagaaz-rickandmorty/
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx
    ├── AppRoute.jsx
    ├── index.css
    ├── main.jsx
    ├── assets/
    │   └── icons/
    ├── components/
    │   ├── CharacterCard.jsx
    │   ├── Pagination.jsx
    │   └── Header/
    │       └── index.jsx
    ├── pages/
    │   ├── Character/
    │   │   └── index.jsx
    │   ├── Episode/
    │   │   └── index.jsx
    │   ├── Location/
    │   │   └── index.jsx
    │   └── NotFound/
    │       └── index.jsx
    ├── schemas/
    │   └── FilterCharactersSchema.js
    └── services/
        ├── CharactersService.js
        ├── EpisodeService.js
        ├── LocationService.js
        └── RequestService.js
```

- `src/`: Contém todos os arquivos fonte do projeto.
    - `assets/`: Imagens e ícones utilizados no projeto.
    - `components/`: Componentes reutilizáveis, como cartões de personagens e cabeçalho.
    - `pages/`: Páginas principais do projeto, cada uma com seu respectivo componente.
    - `schemas/`: Schemas de validação para os formulários.
    - `services/`: Serviços para realizar requisições à API e manipular dados.

## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).
```