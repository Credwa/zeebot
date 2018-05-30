// var grabLocalStoragePostData = function() {
//   var item = localStorage.getItem("dataToSync");
//   return new Promise(function(resolve, reject) {
//     if (item) {
//       resolve(item);
//     } else {
//       reject();
//     }
//   });
// };
(function() {
  "use strict";
  // window.importScripts("../node_modules/localforage/dist/localforage.min.js");
  console.log("sw1");
  self.addEventListener("sync", function(event) {
    console.log("background syncing", event);
    if (event.tag === "sync-new-message") {
      console.log("syncing new messages");
      event
        .waitUntil(
          grabLocalStoragePostData().then(data => {
            fetch("https://chatdev.dynns.com/response", {
              methods: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: JSON.stringify(data)
            }).then(function(response) {
              clients.matchAll().then(clients => {
                clients.forEach(client => {
                  client.postMessage({
                    msg: "Hey I just got a fetch from you!",
                    data: response.data
                  });
                });
              });
            });
          })
        )
        .then(() => {});
    }
  });
  console.log("sw3");

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors.
  const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === "[::1]" ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );
  window.addEventListener("load", function() {
    if (
      "serviceWorker" in navigator &&
      (window.location.protocol === "https:" || isLocalhost)
    ) {
      navigator.serviceWorker
        .register("service-worker.js")
        .then(function(registration) {
          // updatefound is fired if service-worker.js changes.
          registration.onupdatefound = function() {
            // updatefound is also fired the very first time the SW is installed,
            // and there's no need to prompt for a reload at that point.
            // So check here to see if the page is already controlled,
            // i.e. whether there's an existing service worker.
            if (navigator.serviceWorker.controller) {
              // The updatefound event implies that registration.installing is set
              const installingWorker = registration.installing;

              installingWorker.onstatechange = function() {
                switch (installingWorker.state) {
                  case "installed":
                    // At this point, the old content will have been purged and the
                    // fresh content will have been added to the cache.
                    // It's the perfect time to display a "New content is
                    // available; please refresh." message in the page's interface.
                    break;

                  case "redundant":
                    throw new Error(
                      "The installing " + "service worker became redundant."
                    );

                  default:
                  // Ignore
                }
              };
            }
          };
        })
        .catch(function(e) {
          console.error("Error during service worker registration:", e);
        });
    }
  });
})();
