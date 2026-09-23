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

// To keep (default) or remove (granted) the notification banner or show special text (denied).
updateNotificationUI();

// Activating notifications.
const btnEnableNotification = document.querySelector('#btn-notifications');
btnEnableNotification.addEventListener('click', async () => {
    try {
        // Ask permission to the user.
        const permission = await Notification.requestPermission();

        // To keep (default) or remove (granted) the notification banner or show special text (denied).
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

function updateNotificationUI() {
    const notificationBanner = document.querySelector('#notificationBanner');
    const notificationsBannerDenied = document.querySelector('#notificationBannerDenied');
    const notificationStatus = Notification.permission;

    switch (notificationStatus) {
        case 'granted':
            notificationBanner.classList.add('hidden');
            notificationsBannerDenied.classList.add('hidden');
            break;

        case 'denied':
            notificationBanner.classList.add('hidden');
            notificationsBannerDenied.classList.remove('hidden');
            break;

        case 'default':
        default:
            notificationBanner.classList.remove('hidden');
            notificationsBannerDenied.classList.add('hidden');
            break;
    }
}