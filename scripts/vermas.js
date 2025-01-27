// Gestion indépendante des boutons "Ver más"
document.querySelectorAll('.ver-mas-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const description = button.parentElement.querySelector('.book-description');
        
        // Basculer entre afficher/réduire
        if (description.style.maxHeight && description.style.maxHeight !== '100px') {
            description.style.maxHeight = '100px';
            button.textContent = 'Ver más';
        } else {
            description.style.maxHeight = description.scrollHeight + "px";
            button.textContent = 'Ver menos';
        }
    });
});
