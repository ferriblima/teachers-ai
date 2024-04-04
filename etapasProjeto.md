1. Definição de Objetivos e Escopo

    Objetivo: Criar um chatbot na web no qual o usuário escolhe com qual tipo de especialista ele quer conversar. O público alvo são crianças curiosas que ainda não tem conhecimento de como construir um prompt descritivamente.
    Escopo: Chatbot, Arquivar histórico de conversa até reiniciá-la, página web para interação, três epecialistas, três níveis técnicos de explicação.

2. Pesquisa e Análise

    Tecnologias: API do Chat GPT, PHP, HTML, CSS, JavaScript, Axios.
    Concorrência e Inspiração: Site referência com ideia similar: https://kidschatgpt.com/appstore

3. Planejamento

    Arquitetura do Sistema: Defina a arquitetura básica do seu chatbot, incluindo frontend (interface com o usuário) e backend (lógica do servidor, integração com o Chat G

    Etapa	Atividade	Descrição	Tecnologias / Ferramentas
    1	Configuração do Ambiente de Desenvolvimento	Prepare o ambiente de desenvolvimento instalando PHP e um servidor web (como Apache ou Nginx).	PHP, Apache/Nginx
    2	Criação da Interface do Usuário	Desenvolva a interface web, incluindo um text box para perguntas do usuário, um botão de envio, e um botão de reset.	HTML, CSS, JavaScript
    3	Integração com a API do Chat GPT	Implemente a lógica no cliente (JavaScript) para enviar perguntas do usuário para a API do Chat GPT e receber respostas usando Axios.	JavaScript, Axios
    4	Armazenamento de Histórico de Conversas	Implemente a funcionalidade para arquivar perguntas e respostas no lado do cliente, usando listas em JavaScript, permitindo que a conversa tenha sequência e memória.	JavaScript
    5	Implementação do Botão de Reset	Implemente a funcionalidade para limpar o histórico de conversas armazenadas no lado do cliente, permitindo iniciar uma nova conversa.	JavaScript
    6	Testes	Realize testes para garantir que todas as funcionalidades estão operando conforme esperado, focando em testes de interface do usuário e na lógica de armazenamento de mensagens.	Ferramentas de teste de JavaScript (Jest)
    7	Documentação do Projeto	Documente o projeto, incluindo uma visão geral, instruções de como configurar e executar o bot, descrições das APIs e bibliotecas utilizadas, e instruções de uso.	Markdown, repositório Git (GitHub/GitLab)
    
    Observações Importantes:

    JavaScript e Axios são usados para a lógica do cliente, incluindo a interface do usuário e a comunicação com a API do Chat GPT. Axios é uma popular biblioteca JavaScript baseada em promessas para o cliente HTTP, facilitando a realização de chamadas HTTP.
    Listas em JavaScript são utilizadas para armazenar o histórico de mensagens no navegador do usuário, eliminando a necessidade de um banco de dados.
    HTML, CSS são usados para estruturar e estilizar a interface do usuário, respectivamente.
    PHPUnit pode não ser necessário, uma vez que o foco do teste se deslocou para o lado do cliente. Jest é recomendado para testes de JavaScript, cobrindo tanto a lógica de armazenamento de mensagens quanto a integração com a API.