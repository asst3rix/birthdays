// Import des SDK Firebase Web (Modular v10+)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getMessaging, getToken, requestPermission } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging.js";

// 1. Vos identifiants Firebase (collez votre config ici)
const firebaseConfig = {
    apiKey: "AIzaSyB_sQfn8l6XcW1zlcIz5Rhudyy9B-13Jh8",
    authDomain: "birthdays-notifications.firebaseapp.com",
    projectId: "birthdays-notifications",
    storageBucket: "birthdays-notifications.firebasestorage.app",
    messagingSenderId: "1040189479045",
    appId: "1:1040189479045:web:0b3dfce7b4fdf94709f1ec"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 2. Gestion du clic sur le bouton
const btn = document.querySelector('#btn-notifications');
const text = document.querySelector('#token');
btn.addEventListener('click', async () => {
    try {
        // Demande la permission à l'utilisateur
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
            console.log('Permission accordée !');

            // Récupère le token FCM (Clé VAPID nécessaire pour le Web)
            // On génèrera cette clé à l'étape suivante dans la console Firebase
            const token = await getToken(messaging, {
                vapidKey: 'BLuuxjr5-a7EbeV8-px_ob0yYuQzz4G74oRvoSisMeB0eikOgo2P20heWGe5uu8ul2oujh49r3S4vgkISWO7WtA'
            });

            text.textContent = token;
            /*console.log('Voici votre Token FCM :', token);
            alert('Notifications activées ! Token généré (voir console)');*/
        } else {
            alert('Permission refusée.');
        }
    } catch (error) {
        console.error('Erreur :', error);
    }
});

// Écoute si une notification arrive pendant que l'app est ouverte
onMessage(messaging, (payload) => {
  alert(`[Test Réussi] ${payload.notification.title} : ${payload.notification.body}`);
});