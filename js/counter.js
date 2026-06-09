(function () {
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (el.dataset.counted) return;
        el.dataset.counted = "1";
        observer.unobserve(el);

        var to = parseFloat(el.dataset.countTo);
        var suffix = el.dataset.suffix || "";
        var prefix = el.dataset.prefix || "";
        var decimals = parseInt(el.dataset.decimals || "0", 10);
        var duration = 1100;
        var start = performance.now();

        function tick(now) {
          var p = Math.min(1, (now - start) / duration);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = to * eased;
          var display = decimals > 0
            ? val.toFixed(decimals)
            : Math.round(val).toLocaleString();
          el.textContent = prefix + display + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.5 }
  );

  function init() {
    document.querySelectorAll("[data-count-to]").forEach(function (el) {
      observer.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
