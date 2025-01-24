// Chargement de la navbar
fetch('https://kyliancourel.github.io/lavidahispanica/pages/navbar.html') // Ajout du préfixe '/lavidahispanica'
  .then(response => {
    if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    return response.text();
  })
  .then(data => {
    // Insérer le contenu de la navbar dans le conteneur
    document.getElementById('navbar-container').innerHTML = data;

    // Ajouter dynamiquement la feuille de style navbar.css
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://kyliancourel.github.io/lavidahispanica/styles/navbar.css'; // Chemin du fichier CSS
    document.head.appendChild(linkElement);
  })
  .catch(error => console.error('Erreur lors du chargement de la navbar :', error));
