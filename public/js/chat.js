document.addEventListener('DOMContentLoaded', () => {

    const sendButton = document.getElementById('sendButton');
    const resetButton = document.getElementById('resetButton');
    const messageBox = document.getElementById('messageBox');
    const chatHistory = document.getElementById('chatHistory');

    // Fazer com que o cursor vá direto para o messageBox para escrever a pergunta ao abrir a url chat.html
    if (messageBox) {
        messageBox.focus();
    }

    let messageHistory = []; // Variável que registra o histórico de mensagens enviadas e recebidas
    let professorEscolhido = localStorage.getItem('buttonId'); // Traz o valor do buttonId salvo no local storage
    
    // Adicionar um prompt específico
    selecionaProfessor(professorEscolhido);
    console.log(messageHistory);

    // Enviar mensagem quando o botão Enviar é clicado
    sendButton.addEventListener('click', () => {
        const userMessage = messageBox.value.trim();
        if (userMessage) {
            displayMessage(userMessage, 'user');
            sendMessageToChatGPT(userMessage);
            messageBox.value = ''; // Limpa a caixa de mensagem
        }
    });

    // Enviar mensagem quando a tecla Enter é pressionada
    messageBox.addEventListener('keypress', (event) => {
        const userMessage = messageBox.value.trim();
        if (event.key === 'Enter') {
            event.preventDefault(); // Impede ação padrão do Enter, que pode incluir enviar um formulário
            displayMessage(userMessage, 'user');
            sendMessageToChatGPT(userMessage);
            messageBox.value = ''; // Limpa a caixa de mensagem
        }
    });

    // Limpar histórico de conversa
    resetButton.addEventListener('click', () => {
        chatHistory.innerHTML = '';
        messageHistory = []; // Limpa o histórico de mensagens
        selecionaProfessor(professorEscolhido);
    });

    // Botão Voltar
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        window.history.back(); // Usa o histórico do navegador para voltar à página anterior
    });

    // Botão Início
    const homeButton = document.getElementById('homeButton');
    homeButton.addEventListener('click', () => {
        window.location.href = '/'; // Altera a localização para a raiz do site
        // Se a sua página inicial tiver um caminho diferente, substitua '/' pelo caminho correto
    });

    // Função que escreve o prompt inicial baseado na ecolha do professor
    function selecionaProfessor(professorEscolhido){
        let promptMessage = "";
        switch (professorEscolhido) {
            case "professorHistoria":
                promptMessage = 'Responda como se fosse um professor de história e geografia aventureiro. Explique como se estivesse explicando para uma criança de 5 anos de idade e quero que as respostas possuam no máximo 150 caracteres.';
                break;
            case "professorFisica":
                promptMessage = 'Responda como se fosse uma professora de ciências naturais (física, química e biologia) fascinado por experiências escolares dessas matérias. Explique como se estivesse explicando para uma criança de 5 anos de idade e quero que as respostas possuam no máximo 150 caracteres. Use expressões energéticas, malucas e infames no meio das explicações. Permita-se utilizar mais 50 caracteres caso ache necessário para as expressões. O texto deve ter um formato humanizado. Sempre que possível sugira uma experiência escolar para ser feita com base na pergunta.';
                break;
            case "professorPortugues":
                promptMessage = 'Responda como se fosse um professor de português apaixonado por música que procura dar exemplos baseados em letras de canções brasileiras. Explique como se estivesse explicando para uma criança de 5 anos de idade e quero que as respostas possuam no máximo 150 caracteres.';
                break;
            default:
                promptMessage = 'Responda como se fosse um professor. Explique como se estivesse explicando para uma criança de 5 anos de idade e quero que as respostas possuam no máximo 150 caracteres.';
        }
        messageHistory.push({
            role: "user",
            content: promptMessage
        });
    }

    function sendMessageToChatGPT(message) {

        // Atualiza o histórico com a mensagem do usuário
        messageHistory.push({
            role: "user",
            content: message
        });

        console.log(messageHistory);

        // Verifica se a mensagem é uma string vazia ou não está definida.
        // Se for, retorna ou define um valor padrão.
        if (!message || message.trim() === "") {
            console.log("A mensagem enviada está vazia.");
            // Você pode optar por retornar aqui ou definir um valor padrão para `message`.
            // return;
            message = " "; // Definindo um espaço como valor padrão para evitar o erro.
            return;
        }

        axios.post('./src/proxyOpenAi.php', {
            model: "gpt-3.5-turbo",
            messages: messageHistory,
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        })
        .then(function (response) {
            console.log('Resposta Completa da API:', response.data); // Adicionado para depuração

            // Assume que a resposta inclui a mensagem gerada pela IA
            const botMessage = response.data.choices[0].message.content;
    
            // Atualiza o histórico com a resposta do bot
            messageHistory.push({
                role: "assistant",
                content: botMessage
            });
    
            // Exibe a resposta na interface do usuário
            displayMessage(botMessage, 'bot');
        })
        .catch(function (error) {
            console.error(error);
            displayMessage('Desculpe, ocorreu um erro ao processar sua mensagem.', 'bot');
        });
    }

    // Mostrar mensagem
    function displayMessage(message, sender) {
        const messageContainer = document.createElement('div');
        const messageContent = document.createElement('div'); // Usa div para o conteúdo da mensagem
    
        messageContainer.classList.add('message');
        messageContent.classList.add('content');
    
        // Define o título e o alinhamento baseado no remetente
        // const titleText = sender === 'user' ? 'Curioso:' : 'Professor:';
        const title = document.createElement('div');
        // title.textContent = titleText;
        title.style.fontWeight = 'bold';
    
        // Aplica a classe para alinhamento específico
        messageContainer.classList.add(sender);
    
        messageContent.textContent = message;
        messageContainer.appendChild(title);
        messageContainer.appendChild(messageContent);
    
        chatHistory.appendChild(messageContainer);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }    

});
