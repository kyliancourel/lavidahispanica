document.addEventListener('DOMContentLoaded', function () {
    // Fonction pour vérifier la taille de la description et l'état du bouton
    const updateButtonVisibility = () => {
        document.querySelectorAll('.book-description').forEach((description) => {
            const button = description.parentElement.querySelector('.ver-mas-btn');
            
            // Si la description est complètement visible selon la taille de l'écran
            if (description.scrollHeight <= description.offsetHeight) {
                button.style.display = 'none'; // Masquer le bouton si la description est entièrement visible
            } else {
                button.style.display = ''; // Afficher le bouton si la description est incomplète
            }
        });
    };

    // Récupérer tous les boutons "Ver más"
    const buttons = document.querySelectorAll('.ver-mas-btn');
    
    buttons.forEach((button) => {
        button.addEventListener('click', function () {
            const description = this.parentElement.querySelector('.book-description');
            const currentMaxHeight = window.getComputedStyle(description).maxHeight;

            if (currentMaxHeight === '100px' || currentMaxHeight === 'none') {
                // Développer la description
                description.style.maxHeight = description.scrollHeight + 'px';
                this.textContent = 'Ver menos'; // Modifier le texte du bouton
            } else {
                // Réduire la description
                description.style.maxHeight = '100px';
                this.textContent = 'Ver más'; // Modifier le texte du bouton
            }

            // Vérifier l'état du bouton après avoir cliqué
            updateButtonVisibility();
        });
    });

    // Vérification initiale de l'état des descriptions au chargement de la page
    updateButtonVisibility();
    
    // Vérifier l'état du bouton lors du redimensionnement de la fenêtre
    window.addEventListener('resize', updateButtonVisibility);
});
