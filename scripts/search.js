document.getElementById("search-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Empêche la soumission du formulaire

    // Récupérer la valeur du champ de recherche
    let query = document.getElementById("search-input").value.toLowerCase();

    // Charger le fichier index.json
    fetch("https://kyliancourel.github.io/lavidahispanica/index.json")
        .then(response => response.json())
        .then(data => {
            // Filtrer les pages qui contiennent la recherche dans leur titre ou mots-clés
            let results = data.pages.filter(page => 
                page.title.toLowerCase().includes(query) || 
                page.keywords.toLowerCase().includes(query)
            );

            // Vérifier si le conteneur des résultats existe déjà, sinon le créer
            let resultsContainer = document.getElementById("search-results");
            if (!resultsContainer) {
                resultsContainer = document.createElement("div");
                resultsContainer.id = "search-results";
                resultsContainer.style.marginTop = "20px";
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
