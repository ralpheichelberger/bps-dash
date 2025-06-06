// service-worker.js
self.addEventListener('install', (event) => {
    console.log('Service Worker installing…');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated!');
});

self.addEventListener('push', (event) => {
    // Hier kannst du Push-Daten verarbeiten
    const data = event.data?.text() || 'Push ohne Inhalt';
    event.waitUntil(
        self.registration.showNotification('Push-Titel', {
            body: data,
        })
    );
});
  