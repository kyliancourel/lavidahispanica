document.getElementById("search-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Empêche la soumission du formulaire

    // Récupérer la valeur du champ de recherche
    let query = document.getElementById("search-input").value.toLowerCase();

    // Ajouter dynamiquement le lien vers le fichier CSS si ce n'est pas déjà fait
    if (!document.getElementById("search-results-styles")) {
        let link = document.createElement("link");
        link.id = "search-results-styles";
        link.rel = "stylesheet";
        link.href = "styles/search-results.css"; // Chemin vers ton fichier CSS
        document.head.appendChild(link); // Ajouter le lien au <head> du document
    }

    // Charger le fichier index.json
    fetch("/index.json")
        .then(response => response.json())
        .then(data => {
            // Filtrer les pages qui contiennent la recherche dans leur titre ou mots-clés
            let results = data.pages.filter(page => 
                page.title.toLowerCase().includes(query) || 
                (page.keywords && page.keywords.toLowerCase().includes(query)) // Assurer que "keywords" existe
            );

            // Vérifier si le conteneur des résultats existe déjà, sinon le créer
            let resultsContainer = document.getElementById("search-results");
            if (!resultsContainer) {
                resultsContainer = document.createElement("div");
                resultsContainer.id = "search-results";
                document.body.appendChild(resultsContainer); // Ajouter le conteneur au body
            } else {
                resultsContainer.innerHTML = ""; // Vider les anciens résultats
            }

            // Afficher les résultats de la recherche
            if (results.length > 0) {
                results.forEach(result => {
                    let resultItem = document.createElement("p");
                    resultItem.innerHTML = `<a href="${result.url}">${result.title}</a>`;
                    resultsContainer.appendChild(resultItem);
                });
            } else {
                resultsContainer.innerHTML = `Aucun résultat trouvé pour : "${query}"`;
            }
        })
        .catch(error => console.error("Erreur lors du chargement du fichier index.json :", error));
});
