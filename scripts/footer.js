// Base URL pour GitHub Pages (ajustez si nécessaire pour d'autres environnements)
const basePath = '/La-Vida-Hispanica/';

// Détecte la profondeur dans l'arborescence et ajuste le chemin vers footer.html
const depth = location.pathname.replace(basePath, '').split('/').length - 1; // -1 pour exclure le fichier lui-même
const footerPath = `${basePath}${'../'.repeat(depth)}pages/footer.html`;

fetch(footerPath)
  .then(response => {
    if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    return response.text();
  })
  .then(data => {
    document.getElementById('footer-container').innerHTML = data;
  })
  .catch(error => console.error('Erreur lors du chargement du footer :', error));
