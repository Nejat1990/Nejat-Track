document.getElementById("trackBtn").addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        alert(`Dein Standort:\nBreitengrad: ${latitude}\nLängengrad: ${longitude}`);
    }, () => {
        alert("Standort konnte nicht erfasst werden.");
    });
});
