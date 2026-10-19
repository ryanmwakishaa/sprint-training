const CACHE = 'sprint-tracker-v20';

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@500;700&display=swap',
  'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.10.0/dist/tabler-icons.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(async cache => {
      await cache.addAll(['/', '/index.html', '/manifest.json']);
      await cache.addAll(CORE_ASSETS.filter(asset => asset.startsWith('http'))).catch(() => {});
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Never cache writes, Supabase traffic, Netlify functions, or other dynamic endpoints.
  if (request.method !== 'GET') return;
  if (url.pathname.startsWith('/.netlify/')) return;

  // External requests are network-only unless they were explicitly precached (fonts/icons).
  if (url.origin !== self.location.origin) {
    event.respondWith(caches.match(request).then(cached => cached || fetch(request)));
    return;
  }

  // Only cache app shell/static assets. Do not cache arbitrary same-origin GET responses.
  const isStaticAsset = url.pathname === '/' ||
    url.pathname === '/index.html' ||
    /\.(?:js|css|json|png|svg|webp|ico|woff2?)$/i.test(url.pathname);
  if (!isStaticAsset) return;

  // Network-first keeps account/auth code current; cached assets remain an offline fallback.
  event.respondWith(
    fetch(request).then(response => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(request, copy));
      }
      return response;
    }).catch(async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      if (request.mode === 'navigate') return caches.match('/index.html');
      return Response.error();
    })
  );
});
