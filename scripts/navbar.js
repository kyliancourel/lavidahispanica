// Détecte la profondeur dans l'arborescence et ajuste le chemin vers navbar.html
const depth = location.pathname.split('/').length - 2; // -2 pour exclure le domaine et le fichier lui-même
const navbarPath = `${'../'.repeat(depth)}pages/navbar.html`;

fetch(navbarPath)
  .then(response => {
    if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    return response.text();
  })
  .then(data => {
    document.getElementById('navbar-container').innerHTML = data;
  })
  .catch(error => console.error('Erreur lors du chargement de la navbar :', error));
