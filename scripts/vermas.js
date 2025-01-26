function toggleDescription() {
    const description = document.querySelector('.book-description');
    const button = document.querySelector('.ver-mas-btn');
    
    // Si la description est déjà complètement affichée
    if (description.style.maxHeight && description.style.maxHeight !== '100px') {
        description.style.maxHeight = '100px';  // Réduit la taille du texte visible
        button.textContent = 'Ver más';  // Change le texte du bouton
    } else {
        description.style.maxHeight = description.scrollHeight + "px";  // Affiche le texte complet
        button.textContent = 'Ver menos';  // Change le texte du bouton
    }
}