document.addEventListener("DOMContentLoaded", () => {
    console.log("%cready", "color: #2ecc71; font-weight: 900");

    const socket = new WebSocket('ws://localhost:8080');

    socket.addEventListener("message", event => {
        console.log(event.data);
    });

});

console.log("loading app.js...");