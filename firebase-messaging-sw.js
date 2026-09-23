importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyB_sQfn8l6XcW1zlcIz5Rhudyy9B-13Jh8",
    authDomain: "birthdays-notifications.firebaseapp.com",
    projectId: "birthdays-notifications",
    storageBucket: "birthdays-notifications.firebasestorage.app",
    messagingSenderId: "1040189479045",
    appId: "1:1040189479045:web:0b3dfce7b4fdf94709f1ec"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const title = payload.notification.title || "Anniversaire";
    const options = {
        body: payload.notification.body,
        icon: "/icon-192.png"
    };

    self.registration.showNotification(title, options);
});