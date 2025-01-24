document.addEventListener("DOMContentLoaded", function() {
    fetch("pages/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
        })
        .catch(error => console.error("Erreur de chargement du footer:", error));
});
