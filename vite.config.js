import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // Mise à jour automatique
      injectRegister: "auto", // Injecte automatiquement l'enregistrement
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,json}"], // Fichiers à mettre en cache
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api.themoviedb.org\/.*/, // Gère les requêtes d'API
            handler: "CacheFirst",
            options: {
              cacheName: "tmdb-api-cache",
              expiration: {
                maxEntries: 50, // Limite le cache à 50 entrées
                maxAgeSeconds: 60 * 60 * 24 * 7, // Expiration après 7 jours
              },
            },
          },
        ],
      },
      manifest: {
        name: "Movie App",
        short_name: "Movies",
        description: "Une application pour afficher des films populaires.",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/favicon/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/favicon/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
