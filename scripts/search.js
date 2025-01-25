document.addEventListener('DOMContentLoaded', function () {
    // Charger le fichier index.json
    fetch('/index.json')
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
            const searchInput = document.getElementById('search-input');
            const searchResults = document.getElementById('search-results');

            // Écouter la saisie dans le champ de recherche
            searchInput.addEventListener('input', function () {
                const query = searchInput.value.trim();

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
            });
        })
        .catch(err => console.error('Erreur lors du chargement du fichier index.json:', err));
});
