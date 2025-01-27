document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.ver-mas-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const description = button.parentElement.querySelector('.book-description');
            
            // Utilisation de getComputedStyle pour obtenir la hauteur actuelle
            const currentMaxHeight = window.getComputedStyle(description).maxHeight;

            // Vérifier si la description est actuellement réduite
            if (currentMaxHeight === '100px' || currentMaxHeight === 'none') {
                description.style.maxHeight = description.scrollHeight + "px"; // Développer la description
                button.textContent = 'Ver menos'; // Modifier le texte du bouton
            } else {
                description.style.maxHeight = '100px'; // Réduire la description
                button.textContent = 'Ver más'; // Modifier le texte du bouton
            }
        });
    });
});
