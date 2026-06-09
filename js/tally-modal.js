(function () {
  var overlay = document.getElementById("tally-overlay");
  var iframe = document.getElementById("tally-iframe");
  var src = "https://tally.so/r/wA7B4N?transparentBackground=1";

  window.openTallyModal = function () {
    if (!iframe.src) iframe.src = src;
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  function close() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.getElementById("tally-close").addEventListener("click", close);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("open")) close();
  });
})();
