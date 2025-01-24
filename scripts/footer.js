// Chargement du footer
fetch('/La-Vida-Hispanica/pages/footer.html') // Utilisation du chemin correct pour GitHub Pages
  .then(response => {
    if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    return response.text();
  })
  .then(data => {
    document.getElementById('footer-container').innerHTML = data;
  })
  .catch(error => console.error('Erreur lors du chargement du footer :', error));
