// Importation of SDK Firebase Web (Modular v10+).
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging.js";

const firebaseConfig = {
    apiKey: "AIzaSyB_sQfn8l6XcW1zlcIz5Rhudyy9B-13Jh8",
    authDomain: "birthdays-notifications.firebaseapp.com",
    projectId: "birthdays-notifications",
    storageBucket: "birthdays-notifications.firebasestorage.app",
    messagingSenderId: "1040189479045",
    appId: "1:1040189479045:web:0b3dfce7b4fdf94709f1ec"
};

// Initializing Firebase.
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Activating notifications.
const btn = document.querySelector('#btn-notifications');
const text = document.querySelector('#token');
btn.addEventListener('click', async () => {
    try {
        // Ask permission to the user.
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
            // We store the Service Worker (important for iOS).
            const register = await navigator.serviceWorker.register('./firebase-messaging-sw.js');

            // We store the FCM token (vapid key for the web).
            const token = await getToken(messaging, {
                vapidKey: 'BLuuxjr5-a7EbeV8-px_ob0yYuQzz4G74oRvoSisMeB0eikOgo2P20heWGe5uu8ul2oujh49r3S4vgkISWO7WtA',
                serviceWorkerRegistration: register
            });

            if (token) {
                text.textContent = token;
            } else {
                alert("Can't retrieve the token.");
            }
            /*console.log('Voici votre Token FCM :', token);
            alert('Notifications activées ! Token généré (voir console)');*/
        } else {
            alert('Permission refused.');
        }
    } catch (error) {
        alert('Error while trying to get the FCM token: ' + error.message);
    }
});

// Listen if a notification arrives while the app is open.
onMessage(messaging, (payload) => {
    alert(`[Test succesfull] ${payload.notification.title} : ${payload.notification.body}`);
});