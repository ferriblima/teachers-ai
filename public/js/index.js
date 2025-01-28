document.addEventListener('DOMContentLoaded', () => {

    localStorage.removeItem('buttonId'); // Garante que a variável buttonId começe limpa

    // E para os botões
    document.querySelectorAll('.start-button').forEach(item => {
        item.addEventListener('click', (event) => {
            const buttonId = event.target.id;
            console.log('Botão clicado:', buttonId);

            localStorage.setItem('buttonId', buttonId); // Armazena o buttonId no localStorage

            window.location.href = './chat.html';
        });
    });

});
