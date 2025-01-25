document.addEventListener('DOMContentLoaded', function () {
    // Charger le fichier index.json
    fetch('https://kyliancourel.github.io/lavidahispanica/index.json') // Utilise './' pour accéder au fichier index.json relatif au site
        .then(response => response.json())
        .then(data => {
            // Initialiser Lunr.js
            const idx = lunr(function () {
                this.ref('url');
                this.field('title');
                this.field('content');

                // Ajouter les documents à l'index
                data.forEach(function (doc) {
                    this.add(doc);
                }, this);
            });

            // Fonction de recherche
            const searchInput = document.getElementById('searchInput');
            const searchButton = document.getElementById('searchButton');
            const searchResults = document.getElementById('results');

            // Vérifier si les éléments existent
            if (!searchInput || !searchButton || !searchResults) {
                console.error('Éléments de recherche introuvables.');
                return;
            }

            // Fonction de recherche
            function search(query) {
                // Si la recherche est vide, on vide les résultats
                if (query.length === 0) {
                    searchResults.innerHTML = '';
                    return;
                }

                // Effectuer la recherche avec Lunr.js
                const results = idx.search(query);

                // Afficher les résultats
                searchResults.innerHTML = results.map(function (result) {
                    const doc = data.find(d => d.url === result.ref);
                    return `
                        <div class="search-result">
                            <a href="${doc.url}" class="search-result-link">
                                <h5>${doc.title}</h5>
                                <p>${doc.content}</p>
                            </a>
                        </div>
                    `;
                }).join('');
            }

            // Écouter la saisie dans le champ de recherche
            searchInput.addEventListener('input', function () {
                const query = searchInput.value.trim();
                search(query);
            });

            // Écouter le clic sur le bouton de recherche
            searchButton.addEventListener('click', function () {
                const query = searchInput.value.trim();
                search(query);
            });
        })
        .catch(err => console.error('Erreur lors du chargement du fichier index.json:', err));
});
