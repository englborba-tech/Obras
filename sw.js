const CACHE="obras-v3";
const FB="https://www.gstatic.com/firebasejs/10.12.2/",JS="https://cdnjs.cloudflare.com/ajax/libs/";
const ARQ=["./","index.html","manifest.json","icon-192.png","icon-512.png",FB+"firebase-app-compat.js",FB+"firebase-auth-compat.js",FB+"firebase-firestore-compat.js",JS+"jspdf/2.5.1/jspdf.umd.min.js",JS+"jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(ARQ.map(u=>c.add(u).catch(()=>{})))));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET")return;
  const externo=u.origin!==location.origin;
  if(externo&&!/cdnjs\.cloudflare\.com|gstatic\.com\/firebasejs/.test(u.href))return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("index.html"))));
});
