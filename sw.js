/* نظام تزكية — Service Worker
   الصفحة: الشبكة أولًا (فيصلك كل تحديث تلقائيًا) ثم النسخة المحفوظة عند انقطاع الإنترنت.
   الملفات الثابتة (الأيقونات): من النسخة المحفوظة أولًا. غيّر رقم CACHE إذا غيّرت الأيقونات. */
const CACHE = 'tazkiyah-v3';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', function (e) {
    e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
    e.waitUntil(caches.keys().then(function (ks) {
        return Promise.all(ks.filter(function (k) { return k.indexOf('tazkiyah-') === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); }));
});
async function pageRequest(req) {
    const cache = await caches.open(CACHE);
    try {
        const ctl = new AbortController(), t = setTimeout(function () { ctl.abort(); }, 4000); // إنترنت بطيء جدًا: اعرض المحفوظ
        const res = await fetch(req, { signal: ctl.signal, cache: 'no-cache' });
        clearTimeout(t);
        if (res && res.ok) cache.put('./index.html', res.clone());
        return res;
    } catch (err) {
        return (await cache.match('./index.html', { ignoreSearch: true })) || (await cache.match('./')) || Response.error();
    }
}
self.addEventListener('fetch', function (e) {
    const req = e.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);
    if (url.origin !== location.origin) return;
    if (req.mode === 'navigate') { e.respondWith(pageRequest(req)); return; }
    e.respondWith(caches.match(req).then(function (hit) {
        return hit || fetch(req).then(function (res) {
            if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); }
            return res;
        });
    }));
});
