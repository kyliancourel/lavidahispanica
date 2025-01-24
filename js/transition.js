document.querySelectorAll('.transition-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.href;

        // Ajoute l'effet de fade-out
        document.body.classList.add('fade-out');

        // Redirige après l'animation
        setTimeout(() => {
            window.location.href = href;
        }, 500); // Doit correspondre à la durée de transition dans le CSS
    });
});
