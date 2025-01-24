document.addEventListener('DOMContentLoaded', () => {
    // Ajout dynamique de la feuille de style transition.css
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://kyliancourel.github.io/lavidahispanica/styles/transition.css'; // Chemin du fichier CSS
    document.head.appendChild(linkElement);

    // Ajoute la classe fade-in au chargement
    document.body.classList.add('fade-in');

    // Applique l'effet de transition sur les liens internes
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
