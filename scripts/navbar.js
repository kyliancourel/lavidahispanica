document.addEventListener("DOMContentLoaded", () => {
    fetch("https://kyliancourel.github.io/La-Vida-Hispanica/pages/navbar.html")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur lors du chargement de navbar.html: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            const navbarContainer = document.getElementById("navbar-container");
            if (navbarContainer) {
                navbarContainer.innerHTML = data;
            } else {
                console.error("Élément #navbar-container non trouvé !");
            }
        })
        .catch(error => console.error("Erreur :", error));
});
