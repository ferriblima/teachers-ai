document.addEventListener('DOMContentLoaded', () => {

    // TO DO: parei aqui
    // 1. Remover key do código que vai subir para o github
    // 2. Enviar os prompts dos professores a depender do professor escolhido
        // Responda como se fosse um professor de história e geografia aventureiro. Explique como se estivesse explicando para uma criança de 5 anos de idade e quero que as respostas possuam no máximo 150 caracteres.
        // Responda como se fosse um professor de ciências naturais (física, química e biologia) fascinado por experiências escolares dessas matérias. Explique como se estivesse explicando para uma criança de 5 anos de idade e quero que as respostas possuam no máximo 150 caracteres.
        // Responda como se fosse um professor de português apaixonado por música que procura dar exemplos baseados em letras de canções brasileiras. Explique como se estivesse explicando para uma criança de 5 anos de idade e quero que as respostas possuam no máximo 150 caracteres.
    // 3. Nomear quem pergunta e quem responde na caixa de texto 
    // 4. Embelezar

    let messageHistory = []; // Variável que registra o histórico de mensagens enviadas e recebidas

    // Adicionar um prompt específico
    let promptMessage = 'Responda como se fosse um professor de história e geografia aventureiro. Explique como se estivesse explicando para uma criança de 5 anos de idade e quero que as respostas possuam no máximo 150 caracteres.';
    messageHistory.push({
        role: "user",
        content: promptMessage
    });

    const sendButton = document.getElementById('sendButton');
    const resetButton = document.getElementById('resetButton');
    const messageBox = document.getElementById('messageBox');
    const chatHistory = document.getElementById('chatHistory');

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

        axios.post('./proxyOpenAi.php', {
            model: "gpt-3.5-turbo",
            messages: messageHistory,
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        })
        .then(function (response) {
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
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.className = sender; // Adicione uma classe para estilizar diferentemente mensagens do usuário e do bot
        chatHistory.appendChild(messageElement);
        chatHistory.scrollTop = chatHistory.scrollHeight; // Rola para a mensagem mais recente
    }

    // Limpar histórico de conversa
    resetButton.addEventListener('click', () => {
        chatHistory.innerHTML = '';
        messageHistory = []; // Limpa o histórico de mensagens
    });

});
