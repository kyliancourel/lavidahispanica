// Chargement de la navbar
fetch('pages/navbar.html')
  .then(response => {
    if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    return response.text();
  })
  .then(data => {
    document.getElementById('navbar-container').innerHTML = data;
  })
  .catch(error => console.error('Erreur lors du chargement de la navbar :', error));
