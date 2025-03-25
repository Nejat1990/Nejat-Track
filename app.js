document.getElementById("trackBtn").addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        // Nachricht für die E-Mail
        const message = `Standort:\nBreitengrad: ${latitude}\nLängengrad: ${longitude}`;

        // Formspree API URL mit deiner Form-ID
        const formspreeUrl = 'https://formspree.io/f/mpwplqao';

        // Formulardaten erstellen
        const formData = new FormData();
        formData.append('email', 'nejat.balta@outlook.de'); // Deine E-Mail-Adresse
        formData.append('message', message); // Standortnachricht

        // E-Mail senden
        fetch(formspreeUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert("Standort erfolgreich gesendet!");
            } else {
                alert("Fehler beim Senden des Standorts.");
            }
        })
        .catch(error => {
            alert("Ein Fehler ist aufgetreten.");
        });
    }, (error) => {
        alert("Standort konnte nicht erfasst werden.");
    });
});
