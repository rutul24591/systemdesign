// Check if the service worker is supported
if (navigator.serviceWorker) {
  // Register the service worker
  // Not a good practice to declare service worker in root, as the scope would be entire app. Keep it at folder level.
  // The service worker will be registered in the same directory as the file.
  navigator.serviceWorker.register('./sw.js', { scope: './' })
    // navigator.serviceWorker.register('./sw.js', { scope: './offline/' })
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error);
    });
}