// Base URL pour GitHub Pages (ajustez si nécessaire pour d'autres environnements)
const footerBasePath = ''; // Pas besoin de '/La-Vida-Hispanica/' ici pour GitHub Pages

// Détecte la profondeur dans l'arborescence et ajuste le chemin vers footer.html
const footerDepth = location.pathname.split('/').length - 1;
const footerPath = `${'../'.repeat(footerDepth)}pages/footer.html`;

fetch(footerPath)
  .then(response => {
    if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    return response.text();
  })
  .then(data => {
    document.getElementById('footer-container').innerHTML = data;
  })
  .catch(error => console.error('Erreur lors du chargement du footer :', error));
