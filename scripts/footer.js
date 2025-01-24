document.addEventListener("DOMContentLoaded", () => {
    fetch("../pages/footer.html")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur lors du chargement de footer.html: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            const footerContainer = document.getElementById("footer-container");
            if (footerContainer) {
                footerContainer.innerHTML = data;
            } else {
                console.error("Élément #footer-container non trouvé !");
            }
        })
        .catch(error => console.error("Erreur :", error));
});
