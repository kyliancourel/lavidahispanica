// script/search.js

document.getElementById("search-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Empêche la soumission du formulaire

    // Récupérer la valeur du champ de recherche
    let query = document.getElementById("search-input").value.toLowerCase();

    // Sélectionner tous les liens de la page
    let links = document.querySelectorAll("a");

    // Parcourir chaque lien et afficher/masquer en fonction de la recherche
    links.forEach(function(link) {
        let text = link.textContent.toLowerCase();
        if (text.includes(query)) {
            link.style.display = "block"; // Afficher le lien
        } else {
            link.style.display = "none"; // Masquer le lien
        }
    });
});
