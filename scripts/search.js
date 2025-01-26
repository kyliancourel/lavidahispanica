// script/search.js

document.getElementById("search-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Empêche la soumission du formulaire

    // Récupérer la valeur du champ de recherche
    let query = document.getElementById("search-input").value.toLowerCase();

    // Cibler uniquement les liens dans la section searchable-links
    let container = document.getElementById("searchable-links");
    let links = container.querySelectorAll("a");

    let found = false; // Vérifie si une correspondance est trouvée

    links.forEach(function (link) {
        let text = link.textContent.toLowerCase();
        if (text.includes(query)) {
            link.style.display = "block"; // Afficher le lien
            found = true;
        } else {
            link.style.display = "none"; // Masquer le lien
        }
    });

    // Afficher un message si aucune correspondance
    if (!found) {
        alert(`Aucun résultat trouvé pour : "${query}"`);
    }
});
