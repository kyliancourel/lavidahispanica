// Base URL pour GitHub Pages (ajustez si nécessaire pour d'autres environnements)
const navbarBasePath = '/La-Vida-Hispanica/';

// Détecte la profondeur dans l'arborescence et ajuste le chemin vers navbar.html
const depth = location.pathname.replace(navbarBasePath, '').split('/').length - 1; // -1 pour exclure le fichier lui-même
const navbarPath = `${navbarBasePath}${'../'.repeat(depth)}pages/navbar.html`;

fetch(navbarPath)
  .then(response => {
    if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    return response.text();
  })
  .then(data => {
    document.getElementById('navbar-container').innerHTML = data;
  })
  .catch(error => console.error('Erreur lors du chargement de la navbar :', error));
