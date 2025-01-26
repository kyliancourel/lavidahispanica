function toggleDescription() {
    const description = document.querySelector('.book-description');
    const button = document.querySelector('.ver-mas-btn');
    
    // Toggle visibility of the rest of the description
    if (description.style.maxHeight) {
        description.style.maxHeight = null;
        button.textContent = 'Ver más';
    } else {
        description.style.maxHeight = description.scrollHeight + "px";
        button.textContent = 'Ver menos';
    }
}
