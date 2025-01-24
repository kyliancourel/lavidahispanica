// Chargement du footer
fetch('https://kyliancourel.github.io/lavidahispanica/pages/footer.html')  // Ajout du préfixe '/lavidahispanica'
  .then(response => {
    if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    return response.text();
  })
  .then(data => {
    document.getElementById('footer-container').innerHTML = data;
  })
  .catch(error => console.error('Erreur lors du chargement du footer :', error));
