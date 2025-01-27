document.addEventListener('DOMContentLoaded', function () {
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

            // Vérifier si la description est complètement dépliée et ajuster la visibilité du bouton
            toggleButtonVisibility(description, this);
        });
    });

    // Fonction pour vérifier l'état des descriptions au chargement de la page
    const checkDescriptions = () => {
        document.querySelectorAll('.book-description').forEach((description) => {
            const button = description.parentElement.querySelector('.ver-mas-btn');
            // Initialiser la visibilité du bouton en fonction de l'état de la description
            toggleButtonVisibility(description, button);
        });
    };

    // Fonction pour ajuster la visibilité du bouton selon la description et la taille de l'écran
    const toggleButtonVisibility = (description, button) => {
        // Si la description est complètement visible
        if (description.scrollHeight <= description.offsetHeight) {
            // Vérifier la taille de l'écran pour décider de l'affichage du bouton
            if (window.innerWidth >= 1024) {
                // Cacher le bouton sur les écrans plus grands si la description est visible
                button.style.display = 'none';
            } else {
                // Afficher le bouton sur les petits écrans
                button.style.display = '';
            }
        } else {
            // Si la description n'est pas complètement visible, afficher le bouton
            button.style.display = '';
        }
    };

    // Vérifier l'état initial des descriptions au chargement de la page
    checkDescriptions();
    
    // Ajouter un écouteur pour vérifier l'état des descriptions lors du redimensionnement
    window.addEventListener('resize', checkDescriptions);
});
