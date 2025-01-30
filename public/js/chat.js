document.addEventListener('DOMContentLoaded', () => {

    const sendButton = document.getElementById('sendButton');
    const resetButton = document.getElementById('resetButton');
    const messageBox = document.getElementById('messageBox');
    const chatHistory = document.getElementById('chatHistory');

    // Automatically focus on the messageBox when opening chat.html
    if (messageBox) {
        messageBox.focus();
    }

    let messageHistory = []; // Variable to record the history of sent and received messages
    let selectedProfessor = localStorage.getItem('buttonId'); // Retrieves the buttonId saved in local storage

    // Add a specific prompt
    selectProfessor(selectedProfessor);
    console.log(messageHistory);

    // Send a message when the Send button is clicked
    sendButton.addEventListener('click', () => {
        const userMessage = messageBox.value.trim();
        if (userMessage) {
            displayMessage(userMessage, 'user');
            sendMessageToChatGPT(userMessage);
            messageBox.value = ''; // Clears the message box
        }
    });

    // Send a message when the Enter key is pressed
    messageBox.addEventListener('keypress', (event) => {
        const userMessage = messageBox.value.trim();
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents the default Enter action, which may include submitting a form
            displayMessage(userMessage, 'user');
            sendMessageToChatGPT(userMessage);
            messageBox.value = ''; // Clears the message box
        }
    });

    // Clear conversation history
    resetButton.addEventListener('click', () => {
        chatHistory.innerHTML = '';
        messageHistory = []; // Clears the message history
        selectProfessor(selectedProfessor);
    });

    // Back button
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        window.history.back(); // Uses browser history to go back to the previous page
    });

    // Home button
    const homeButton = document.getElementById('homeButton');
    homeButton.addEventListener('click', () => {
        window.location.href = '/'; // Redirects to the root of the site
        // If your homepage has a different path, replace '/' with the correct path
    });

    // Function to write the initial prompt based on the chosen professor
    function selectProfessor(selectedProfessor) {
        let promptMessage = "";
        console.log(selectedProfessor);
        switch (selectedProfessor) {
            case "professorHistoria":
                promptMessage = 'Respond as if you were a history and geography professor adventurer. Explain as if talking to a 5-year-old and keep responses within 150 characters.';
                break;
            case "professorFisica":
                promptMessage = 'Respond as if you were a natural science professor (physics, chemistry, and biology) passionate about school experiments. Explain as if talking to a 5-year-old and keep responses within 150 characters. Use energetic, quirky, and cheeky expressions in your explanations. If necessary, allow 50 more characters for expressions. The text should be humanized. Whenever possible, suggest a school experiment based on the question.';
                break;
            case "professorPortugues":
                promptMessage = 'Respond as if you were a Portuguese language professor passionate about music, giving examples based on Brazilian song lyrics. Explain as if talking to a 5-year-old and keep responses within 150 characters.';
                break;
            default:
                promptMessage = 'Respond as if you were a professor. Explain as if talking to a 5-year-old and keep responses within 150 characters.';
        }
        messageHistory.push({
            role: "user",
            content: promptMessage
        });
    }

    function sendMessageToChatGPT(message) {

        // Updates the history with the user's message
        messageHistory.push({
            role: "user",
            content: message
        });

        console.log(messageHistory);

        // Check if the message is empty or undefined
        if (!message || message.trim() === "") {
            console.log("The sent message is empty.");
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
            console.log('Full API Response:', response.data); // Added for debugging

            const botMessage = response.data.choices[0].message.content;
    
            // Updates the history with the bot's response
            messageHistory.push({
                role: "assistant",
                content: botMessage
            });
    
            // Displays the response in the user interface
            displayMessage(botMessage, 'bot');
        })
        .catch(function (error) {
            console.error(error);
            displayMessage('Sorry, there was an error processing your message.', 'bot');
        });
    }

    function displayMessage(message, sender) {
        const messageContainer = document.createElement('div');
        const messageContent = document.createElement('div'); // Uses div for the message content

        messageContainer.classList.add('message');
        messageContent.classList.add('content');

        // Applies the class for specific alignment
        messageContainer.classList.add(sender);

        messageContent.textContent = message;
        messageContainer.appendChild(messageContent);

        chatHistory.appendChild(messageContainer);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }    
});
