// Chargement de la navbar
fetch('/La-Vida-Hispanica/pages/navbar.html') // Utilisation du chemin correct pour GitHub Pages
  .then(response => {
    if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    return response.text();
  })
  .then(data => {
    document.getElementById('navbar-container').innerHTML = data;
  })
  .catch(error => console.error('Erreur lors du chargement de la navbar :', error));
