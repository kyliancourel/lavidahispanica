// Gestion indépendante des boutons "Ver más"
document.querySelectorAll('.ver-mas-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const description = button.parentElement.querySelector('.book-description');

        // Vérifier si la description est actuellement réduite
        if (description.style.maxHeight === '100px' || !description.style.maxHeight) {
            description.style.maxHeight = description.scrollHeight + "px"; // Développer la description
            button.textContent = 'Ver menos'; // Modifier le texte du bouton
        } else {
            description.style.maxHeight = '100px'; // Réduire la description
            button.textContent = 'Ver más'; // Modifier le texte du bouton
        }
    });
});
