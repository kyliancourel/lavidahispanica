fetch('public/html/navbar.html')
.then(response => response.text())
.then(data => {
    document.getElementById('navbar-container').innerHTML = data;
})
.catch(error => console.error('Erreur de chargement de la navbar:', error));