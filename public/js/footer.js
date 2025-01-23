fetch('public/js/footer.js')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-container').innerHTML = data;
    })
    .catch(error => console.error('Erreur de chargement de la navbar:', error));