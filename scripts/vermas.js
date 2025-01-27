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

            // Vérifier si la description est complètement dépliée et cacher le bouton
            if (description.scrollHeight === description.offsetHeight) {
                this.style.display = 'none'; // Masquer le bouton si la description est complètement visible
            } else {
                this.style.display = ''; // Assurez-vous que le bouton est visible si nécessaire
            }
        });
    });

    // Fonction pour vérifier l'état des descriptions au chargement de la page
    const checkDescriptions = () => {
        document.querySelectorAll('.book-description').forEach((description) => {
            const button = description.parentElement.querySelector('.ver-mas-btn');
            if (description.scrollHeight === description.offsetHeight) {
                button.style.display = 'none'; // Masquer le bouton si la description est complètement visible
            } else {
                button.style.display = ''; // Afficher le bouton si nécessaire
            }
        });
    };

    // Vérifier l'état initial des descriptions au chargement de la page
    checkDescriptions();
    
    // Ajouter un écouteur pour vérifier l'état des descriptions lors du redimensionnement
    window.addEventListener('resize', checkDescriptions);
});
