document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const response = await fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
    });

    if (response.ok) {
        alert('Formulaire soumis avec succès!');
    } else {
        alert('Erreur lors de la soumission du formulaire');
    }
});
