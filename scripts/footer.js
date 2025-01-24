// Chargement du footer
fetch('https://kyliancourel.github.io/lavidahispanica/pages/footer.html') // Ajout du préfixe '/lavidahispanica'
  .then(response => {
    if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    return response.text();
  })
  .then(data => {
    // Insérer le contenu du footer dans le conteneur
    document.getElementById('footer-container').innerHTML = data;

    // Ajouter dynamiquement la feuille de style footer.css
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://kyliancourel.github.io/lavidahispanica/styles/footer.css'; // Chemin du fichier CSS
    document.head.appendChild(linkElement);
  })
  .catch(error => console.error('Erreur lors du chargement du footer :', error));
