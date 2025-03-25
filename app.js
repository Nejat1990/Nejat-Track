// Beim Laden der Seite wird die IP-Adresse ermittelt und versendet
document.addEventListener('DOMContentLoaded', function() {
    sendIPOnPageLoad();
});

// Funktion, um die IP-Adresse des Benutzers zu ermitteln und zu senden
function sendIPOnPageLoad() {
    // IP-Adresse ermitteln
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            console.log("Benutzer IP-Adresse:", ipAddress);

            // IP-Adresse an den Server senden (z.B. via Fetch)
            sendIPByEmail(ipAddress);
        })
        .catch(error => {
            console.error("Fehler beim Abrufen der IP-Adresse:", error);
        });
}

// Funktion zum Senden der IP-Adresse per E-Mail (simuliert)
function sendIPByEmail(ipAddress) {
    const ipData = { ip: ipAddress };

    // Beispiel: Senden der IP-Adresse an den Server (kannst du anpassen)
    console.log("IP-Adresse senden:", ipData);

    // Hier eine Fetch-Anfrage zum Senden der IP-Adresse an deinen Server (optional anpassen)
    // fetch('/send-ip', {
    //     method: 'POST',
    //     body: JSON.stringify(ipData),
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // });
}

// Funktion für den Standort (geografische Koordinaten) und deren Versenden
document.getElementById('trackBtn').addEventListener('click', function() {
    getLocation();
    showNewImages(); // Auch bei Fehlern weiterhin Bilder anzeigen
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendLocationByEmail, showError);
    } else {
        document.getElementById("status").innerHTML = "Geolocation wird von diesem Browser nicht unterstützt.";
        showNewImages(); // Bilder auch bei Fehlern anzeigen
    }
}

// Funktion zum Senden der Standortdaten per E-Mail
function sendLocationByEmail(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Standortdaten an den Server senden
    const locationData = {
        latitude: lat,
        longitude: lon
    };

    // Beispiel: Senden der Standortdaten an den Server (kannst du anpassen)
    console.log("Standortdaten senden:", locationData);

    // Hier eine Fetch-Anfrage zum Senden der Koordinaten an deinen Server
    // fetch('/send-location', {
    //     method: 'POST',
    //     body: JSON.stringify(locationData),
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // });
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
    showNewImages(); // Bilder auch bei Fehlern anzeigen
}

// Funktion, um neue Bilder hinzuzufügen
function showNewImages() {
    document.getElementById("new-images").style.display = "block";

    // Beispielbilder
    const newImages = [
        'bild4.jpg', 
        'bild5.jpg', 
        'bild6.jpg'
    ];

    // Füge die neuen Bilder zum DOM hinzu
    const additionalImagesContainer = document.getElementById("additional-images");

    newImages.forEach(function(imageSrc) {
        const imgElement = document.createElement("img");
        imgElement.src = imageSrc;
        imgElement.alt = "Weitere Bilder";
        additionalImagesContainer.appendChild(imgElement);
    });

    document.getElementById("message").style.display = "block";
}
