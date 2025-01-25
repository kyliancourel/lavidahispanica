document.addEventListener('DOMContentLoaded', () => {
    // Apparition progressive lors du chargement de la page
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

            // Redirige après l'animation (500 ms pour correspondre à l'animation CSS)
            setTimeout(() => {
                window.location.href = href;
            }, 500); // La durée doit correspondre à celle de fade-out (1s ici, donc 1000ms)
        });
    });
});
