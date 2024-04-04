
# Teachers AI Project

## Mensagem do criador
Meu conhecimento de programação web é mediano e este projeto foi inteiramente criado por Inteligência Artificial utilizando a versão 4.0 do chat GPT, códigos, imagens, documentação e resoluçções de dúvidas ao decorrer do mesmo.
O tempo total para a elaboração do mesmo, incluindo a resolução de problemas na integração de API foi de apriximadamente 8h30m. Os maiores gargalos foram: resolução de problema em integração com API, geração de imagens apropriadas, testes de posicionamento e estilização de blocos, imagens e botões.

## Introdução

Este projeto é uma aplicação web que integra funcionalidades de inteligência artificial, utilizando a API da OpenAI, para criar um assistente virtual destinado a crianças curiosas. Os usuários podem interagir com o assistente através de uma interface de chat para obter informações e assistência relacionada ao ensino e à educação.

## Configuração do Ambiente

Antes de executar o projeto, é necessário configurar a chave de acesso à API da OpenAI. Siga os passos abaixo para configurar:

1. Renomeie o arquivo `.env.example` para `.env`.
2. Abra o arquivo `.env` e substitua o valor de `OPENAI_API_KEY` pela sua chave de API da OpenAI.

Para obter uma chave de API da OpenAI, siga os passos abaixo:

1. Visite [https://openai.com/](https://openai.com/) e crie uma conta ou faça login.
2. Navegue até a seção de API e siga as instruções para gerar uma nova chave de API.
3. Copie a chave gerada e cole-a no arquivo `.env`, como descrito na seção de Configuração do Ambiente.

## Instalação de Dependências

Este projeto requer o PHP para ser executado. Certifique-se de ter o PHP instalado em seu ambiente. Além disso, algumas dependências do PHP podem ser necessárias. Execute o seguinte comando no terminal para instalar as dependências:

```bash
composer install
```

## Arquivos Principais

- `proxyOpenAi.php`: Script PHP que atua como um proxy para as requisições à API da OpenAI. Isso evita a exposição direta da chave da API no lado do cliente.
- `index.js` e `chat.js`: Arquivos JavaScript que implementam a lógica do lado do cliente para interagir com o usuário e enviar requisições ao proxy PHP.
- `.env`: Arquivo que armazena variáveis de ambiente, como a chave da API da OpenAI.

## Como Executar o Projeto

Após configurar o ambiente e instalar as dependências, você pode iniciar o projeto abrindo o arquivo `index.html` em um navegador* ou configurando um servidor PHP local e navegando até o diretório do projeto.
*Por questões de segurança, abrir o arquivo através do navegagor possui a limitação de não realizar requisições HTTP. Na prática o bot não dará respostas corretas, apenas a mensagem de erro.
