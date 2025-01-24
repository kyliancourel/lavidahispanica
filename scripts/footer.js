// Détecte la profondeur dans l'arborescence et ajuste le chemin vers footer.html
const depth = location.pathname.split('/').length - 2; // -2 pour exclure le domaine et le fichier lui-même
const footerPath = `${'../'.repeat(depth)}pages/footer.html`;

fetch(footerPath)
  .then(response => {
    if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    return response.text();
  })
  .then(data => {
    document.getElementById('footer-container').innerHTML = data;
  })
  .catch(error => console.error('Erreur lors du chargement du footer :', error));
