(function () {
  var nav = document.getElementById("main-nav");
  var stickyCta = document.getElementById("sticky-cta");

  function onScroll() {
    var y = window.scrollY;

    if (nav) {
      if (y > 12) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    }

    if (stickyCta) {
      var max = document.body.scrollHeight - window.innerHeight - 800;
      if (y > 700 && y < max) {
        stickyCta.classList.add("show");
      } else {
        stickyCta.classList.remove("show");
      }
    }
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
