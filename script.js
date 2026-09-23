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

// To keep (default) or remove (granted or denied) the notification banner.
updateNotificationUI();

// Activating notifications.
const btn = document.querySelector('#btn-notifications');
btn.addEventListener('click', async () => {
    try {
        // Ask permission to the user.
        const permission = await Notification.requestPermission();

        // To keep (default) or remove (granted or denied) the notification banner.
        updateNotificationUI();

        if (permission === 'granted') {

            // We store the Service Worker (important for iOS).
            const register = await navigator.serviceWorker.register('./firebase-messaging-sw.js');

            // We store the FCM token (vapid key for the web).
            const token = await getToken(messaging, {
                vapidKey: 'BLuuxjr5-a7EbeV8-px_ob0yYuQzz4G74oRvoSisMeB0eikOgo2P20heWGe5uu8ul2oujh49r3S4vgkISWO7WtA',
                serviceWorkerRegistration: register
            });

            console.log('FCM token:', token);
        } else {
            console.log('Permission denied.');
        }
    } catch (error) {
        console.log('Error while trying to get the FCM token: ' + error.message);
    }
});

// Listen if a notification arrives while the app is open.
onMessage(messaging, (payload) => {
    console.log(`[Test successfull] ${payload.notification.title} : ${payload.notification.body}`);
});

function updateNotificationUI () {
    const notificationBanner = document.querySelector('#notificationBanner');
    // granted = accepted
    // denied = refused
    // default = not yet accepted
    const notificationStatus = Notification.permission;
    if (notificationStatus !== 'default') {
        notificationBanner.classList.add('displayNone');
    }
}