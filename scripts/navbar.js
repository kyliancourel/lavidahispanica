// Base URL pour GitHub Pages (ajustez si nécessaire pour d'autres environnements)
const navbarBasePath = ''; // Pas besoin de '/La-Vida-Hispanica/' ici pour GitHub Pages

// Détecte la profondeur dans l'arborescence et ajuste le chemin vers navbar.html
const navbarDepth = location.pathname.split('/').length - 1;
const navbarPath = `${'../'.repeat(navbarDepth)}pages/navbar.html`;

fetch(navbarPath)
  .then(response => {
    if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    return response.text();
  })
  .then(data => {
    document.getElementById('navbar-container').innerHTML = data;
  })
  .catch(error => console.error('Erreur lors du chargement de la navbar :', error));
