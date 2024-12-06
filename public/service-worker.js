const CACHE_NAME = "movie-pwa-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/offline.html",
  "/manifest.json",
  "/favicon/web-app-manifest-192x192.png",
  "/favicon/web-app-manifest-512x512.png",
  // "/favicon/favicon-96x96.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching static assets");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

// Interception des requêtes réseau
// self.addEventListener("fetch", (event) => {
//   if (event.request.url.includes("api.themoviedb.org")) {
//     // Gestion des requêtes API
//     event.respondWith(
//       caches.open(CACHE_NAME).then((cache) =>
//         fetch(event.request)
//           .then((response) => {
//             cache.put(event.request, response.clone()); // Cache la réponse
//             return response;
//           })
//           .catch(() => caches.match(event.request)) // Retourne le cache en cas d'échec
//       )
//     );
//   } else {
//     // Gestion des ressources statiques
//     event.respondWith(
//       caches.match(event.request).then((response) => {
//         return (
//           response ||
//           fetch(event.request).catch(() => {
//             // Retourner une page hors ligne si elle existe
//             if (event.request.mode === "navigate") {
//               return caches.match("/offline.html");
//             }
//           })
//         );
//       })
//     );
//   }
// });

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    // Navigation : vérifier si l'utilisateur est hors ligne
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match("/offline.html");
      })
    );
  } else if (event.request.url.includes("api.themoviedb.org")) {
    // Gestion des requêtes API
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        fetch(event.request)
          .then((response) => {
            cache.put(event.request, response.clone());
            return response;
          })
          .catch(() => caches.match(event.request))
      )
    );
  } else {
    // Gestion des ressources statiques
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).catch(() => caches.match("/offline.html"));
      })
    );
  }
});
