// Adaptez les chemins pour un fichier à la racine ou dans un sous-dossier
const footerPath = location.pathname.includes('pages/') ? '../pages/footer.html' : 'pages/footer.html';

fetch(footerPath)
  .then(response => {
    if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    return response.text();
  })
  .then(data => {
    document.getElementById('footer-container').innerHTML = data;
  })
  .catch(error => console.error('Erreur lors du chargement du footer :', error));
