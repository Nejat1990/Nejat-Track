document.getElementById("trackBtn").addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        const message = `Standort:\nBreitengrad: ${latitude}\nLängengrad: ${longitude}`;
        const formspreeUrl = 'https://formspree.io/f/mpwplqao'; // Ersetze mit deiner Form-ID

        const formData = new FormData();
        formData.append('email', 'nejat.balta@outlook.de'); // Deine E-Mail-Adresse
        formData.append('message', message);

        fetch(formspreeUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert("Standort erfolgreich gesendet!");
            } else {
                response.text().then(text => {
                    alert(`Fehler beim Senden des Standorts: ${response.status} - ${text}`);
                });
            }
        })
        .catch(error => {
            alert(`Fehler beim Senden: ${error}`);
        });
    }, (error) => {
        alert("Standort konnte nicht erfasst werden.");
    });
});
