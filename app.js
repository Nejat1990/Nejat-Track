// Funktion, um den Standort des Benutzers zu ermitteln und die Bilder hinzuzufügen
document.getElementById('trackBtn').addEventListener('click', function() {
    getLocation();
    showNewImages(); // Neue Bilder immer anzeigen, auch bei Fehlern
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendLocationByEmail, showError);
    } else {
        document.getElementById("status").innerHTML = "Geolocation wird von diesem Browser nicht unterstützt.";
        showNewImages(); // Auch hier werden die Bilder angezeigt, wenn die Geolocation nicht unterstützt wird
    }
}

// Funktion zum Senden des Standorts per E-Mail
function sendLocationByEmail(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Hier könntest du eine Funktion zum Senden der Daten per E-Mail einfügen.
    // Zum Beispiel eine Fetch-Anfrage oder eine andere Methode zum Senden der Daten an deinen Server.
    const locationData = {
        latitude: lat,
        longitude: lon
    };

    // Beispiel: Senden der Daten an einen Server (hier simuliert durch console.log)
    console.log("Standortdaten senden:", locationData);

    // Hier könntest du eine Funktion verwenden, die die Daten per E-Mail versendet (z.B. über ein Backend oder ein Formular)
    // Zum Beispiel mit Fetch API oder AJAX, um die Daten an einen Server zu senden.
    // fetch('/send-location', {
    //   method: 'POST',
    //   body: JSON.stringify(locationData),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
}

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

    // Neue Bilder auch bei einem Fehler anzeigen
    showNewImages();
}

// Funktion, um neue Bilder hinzuzufügen
function showNewImages() {
    // Anzeigen des Containers für neue Bilder
    document.getElementById("new-images").style.display = "block";

    // Hier fügen wir dynamisch 3 neue Bilder hinzu
    const newImages = [
        'bild4.jpg', // Bild 4
        'bild5.jpg', // Bild 5
        'bild6.jpg'  // Bild 6
    ];

    // Hole den Container für zusätzliche Bilder
    const additionalImagesContainer = document.getElementById("additional-images");

    // Füge jedes Bild dynamisch zum Container hinzu
    newImages.forEach(function(imageSrc) {
        const imgElement = document.createElement("img");
        imgElement.src = imageSrc;
        imgElement.alt = "Weitere Bilder";
        additionalImagesContainer.appendChild(imgElement);
    });

    // Zeige den Text "Weitere Bilder & Videos in Kürze"
    document.getElementById("message").style.display = "block";
}
