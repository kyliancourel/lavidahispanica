function toggleDescription() {
    const description = document.querySelector('.book-description');
    const button = document.querySelector('.ver-mas-btn');

    // Vérifie si la description est déployée
    if (description.classList.contains('expanded')) {
        description.classList.remove('expanded'); // Réduit le texte
        button.textContent = 'Ver más'; // Change le texte du bouton
    } else {
        description.classList.add('expanded'); // Déploie le texte
        button.textContent = 'Ver menos'; // Change le texte du bouton
    }
}
