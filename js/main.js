/* main.js — loaded in <head>, before any image is parsed.
   Image fallback: <img> tags point at assets/images/*.jpg first. If a local file is
   missing, the error is caught here and the image switches to its data-fallback URL,
   so the site never shows a broken picture. Once you add the files to assets/images/,
   the local copies are used automatically. */
(function () {
  document.addEventListener("error", function (e) {
    var img = e.target;
    if (!img || img.tagName !== "IMG") return;
    var fallback = img.getAttribute("data-fallback");
    if (!fallback || img.getAttribute("data-fallback-used")) return;
    img.setAttribute("data-fallback-used", "true");
    img.src = fallback;
  }, true); // capture: image "error" events don't bubble
})();
