// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function () {
    // Récupérer tous les boutons "Ver más"
    const buttons = document.querySelectorAll('.ver-mas-btn');
    
    // Pour chaque bouton, ajouter un événement de clic
    buttons.forEach((button) => {
        button.addEventListener('click', function () {
            // Trouver la description du livre associée
            const description = this.parentElement.querySelector('.book-description');
            
            // Vérifier la hauteur actuelle du texte
            const currentMaxHeight = window.getComputedStyle(description).maxHeight;
            
            if (currentMaxHeight === '100px' || currentMaxHeight === 'none') {
                // Si l'élément est réduit, développer
                description.style.maxHeight = description.scrollHeight + 'px'; // Afficher toute la description
                this.textContent = 'Ver menos'; // Changer le texte du bouton
            } else {
                // Sinon, réduire
                description.style.maxHeight = '100px'; // Réduire la description
                this.textContent = 'Ver más'; // Restaurer le texte du bouton
            }
        });
    });
});
