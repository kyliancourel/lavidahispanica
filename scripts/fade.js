document.addEventListener('DOMContentLoaded', () => {
    // Apparition progressive lors du chargement
    document.body.classList.add('fade-in');

    // Gestion des liens avec transition
    document.querySelectorAll('.transition-link').forEach(link => {
        link.addEventListener('click', function (e) {
            // Vérifie si le lien est interne
            if (this.hostname !== window.location.hostname) return;

            e.preventDefault();
            const href = this.href;

            // Ajoute l'effet de fade-out
            document.body.classList.add('fade-out');

            // Redirige après l'animation
            setTimeout(() => {
                window.location.href = href;
            }, 500); // Durée correspondant au CSS
        });
    });
});
