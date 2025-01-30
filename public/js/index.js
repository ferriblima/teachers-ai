document.addEventListener('DOMContentLoaded', () => {
    localStorage.removeItem('buttonId');

    // Seleciona todos os elementos com a classe ".teachers"
    document.querySelectorAll('.teachers').forEach(item => {
        item.addEventListener('click', (event) => {
            // 'item' representa o card inteiro
            const teacherId = item.getAttribute('data-teacher');
            
            localStorage.setItem('buttonId', teacherId);
            window.location.href = './chat.html';
        });
    });
});
