// This service worker file is effectively a 'no-op' that will reset any
// previous service worker registered for the same host:port combination.
// In the production build, this file is replaced with an actual service worker
// file that will precache your site's local assets.
// See https://github.com/facebookincubator/create-react-app/issues/2272#issuecomment-302832432
console.log("sw2");
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("sync", function(event) {
  console.log("background syncing", event);
  if (event.tag === "sync-new-message") {
    console.log("syncing new messages");
  }
});
self.addEventListener("activate", () => {
  self.clients.matchAll({ type: "window" }).then(windowClients => {
    for (const windowClient of windowClients) {
      // Force open pages to refresh, so that they have a chance to load the
      // fresh navigation response from the local dev server.
      windowClient.navigate(windowClient.url);
    }
  });
});
