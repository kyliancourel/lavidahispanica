document.addEventListener('DOMContentLoaded', () => {
    const avisForm = document.getElementById('avis-form');
    const avisList = document.getElementById('avis-list');
    const ratingStars = document.querySelectorAll('#rating i');
    let ratingValue = 0;
    const userId = "user123"; // Simuler l'identifiant unique de l'utilisateur connecté

    // Récupérer les avis existants et les afficher
    const fetchAvis = async () => {
        try {
            const response = await fetch('http://localhost:3000/avis');  // URL du backend
            const avis = await response.json();
            renderAvis(avis);
        } catch (error) {
            console.error('Erreur lors de la récupération des avis:', error);
        }
    };

    // Fonction pour afficher les avis dans la section correspondante
    const renderAvis = (avis) => {
        avisList.innerHTML = '';
        avis.forEach((avisItem) => {
            const avisElement = document.createElement('div');
            avisElement.classList.add('avis');
            avisElement.innerHTML = `
                <p class="nom">${avisItem.prenom} ${avisItem.nom}</p>
                <p><strong>Avis:</strong> ${avisItem.message}</p>
                ${avisItem.suggestions ? `<p><strong>Suggestions:</strong> ${avisItem.suggestions}</p>` : ''}
                <p><strong>Note:</strong> ${'★'.repeat(avisItem.rating)}${'☆'.repeat(5 - avisItem.rating)}</p>
                <p class="date">Posté le ${new Date(avisItem.date).toLocaleDateString()}</p>
                ${avisItem.userId === userId ? `<button class="delete-btn" data-id="${avisItem.id}">Supprimer</button>` : ''}
            `;
            avisList.appendChild(avisElement);

            // Ajouter un événement de suppression si le bouton existe
            const deleteBtn = avisElement.querySelector('.delete-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => deleteAvis(avisItem.id));
            }
        });
    };

    // Fonction pour supprimer un avis
    const deleteAvis = async (avisId) => {
        try {
            const response = await fetch(`http://localhost:3000/avis/${avisId}`, {  // URL du backend
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Avis supprimé avec succès!');
                fetchAvis();  // Récupérer à nouveau les avis
            } else {
                alert('Erreur lors de la suppression de l\'avis.');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'avis:', error);
        }
    };

    // Gérer la notation
    ratingStars.forEach(star => {
        star.addEventListener('click', () => {
            ratingValue = parseInt(star.dataset.value);
            updateRatingStars();
        });
    });

    const updateRatingStars = () => {
        ratingStars.forEach(star => {
            if (parseInt(star.dataset.value) <= ratingValue) {
                star.classList.add('text-warning');
            } else {
                star.classList.remove('text-warning');
            }
        });
    };

    // Ajouter un avis
    avisForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const prenom = document.getElementById('prenom').value;
        const nom = document.getElementById('nom').value;
        const message = document.getElementById('message').value;
        const suggestions = document.getElementById('suggestions').value;

        if (!prenom || !message || ratingValue === 0) {
            alert('Veuillez remplir tous les champs obligatoires!');
            return;
        }

        const avisData = {
            prenom,
            nom,
            message,
            suggestions,
            rating: ratingValue,
            userId, // ID utilisateur
            date: new Date().toISOString(),
        };

        try {
            const response = await fetch('http://localhost:3000/avis', {  // URL du backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(avisData),
            });

            if (response.ok) {
                alert('Avis ajouté avec succès!');
                fetchAvis();  // Récupérer les avis après l'ajout
            } else {
                alert('Erreur lors de l\'ajout de l\'avis.');
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'avis:', error);
        }
    });

    // Initialiser les avis
    fetchAvis();
});
