// Garde la carte et le CV en mémoire pour qu'ils marchent même sans réseau (salons, forums).
const CACHE = "carte-v1";
const FICHIERS = ["./", "./index.html", "./qr.svg", "./qr-cv.svg", "./icone-192.png", "./icone-512.png", "../photo.jpg", "../CV_Sebastien_Beck.pdf"];
self.addEventListener("install", (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FICHIERS))));
self.addEventListener("activate", (e) => e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((n) => n !== CACHE).map((n) => caches.delete(n))))));
self.addEventListener("fetch", (e) => {
  e.respondWith(fetch(e.request).then((r) => { const copie = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copie)); return r; }).catch(() => caches.match(e.request)));
});
