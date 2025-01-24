// Adaptez les chemins pour un fichier à la racine ou dans un sous-dossier
const navbarPath = location.pathname.includes('pages/') ? '../pages/navbar.html' : 'pages/navbar.html';

fetch(navbarPath)
  .then(response => {
    if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    return response.text();
  })
  .then(data => {
    document.getElementById('navbar-container').innerHTML = data;
  })
  .catch(error => console.error('Erreur lors du chargement de la navbar :', error));
