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
            
            // Vérification pour cacher le bouton si la description est complètement dépliée sur grands écrans
            if (window.innerWidth >= 1024 && description.scrollHeight === description.offsetHeight) {
                this.style.display = 'none'; // Masquer le bouton si la description est complètement visible
            }
        });
    });

    // Cacher le bouton "Ver más" sur les grands écrans si la description est totalement dépliée
    const checkDescriptions = () => {
        document.querySelectorAll('.book-description').forEach((description) => {
            const button = description.parentElement.querySelector('.ver-mas-btn');
            if (window.innerWidth >= 1024 && description.scrollHeight === description.offsetHeight) {
                button.style.display = 'none'; // Masquer le bouton si la description est complètement visible
            } else {
                button.style.display = ''; // Afficher le bouton si nécessaire
            }
        });
    };

    // Vérifier la taille de l'écran et ajuster au démarrage et lors du redimensionnement
    checkDescriptions();
    window.addEventListener('resize', checkDescriptions);
});
