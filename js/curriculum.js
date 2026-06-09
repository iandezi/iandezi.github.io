(function () {
  var items = document.querySelectorAll("[data-week]");

  function closeItem(btn) {
    btn.classList.remove("open");
    btn.style.background = "transparent";
    btn.style.border = "1px solid transparent";
    btn.style.padding = "16px 4px";
    var content = btn.querySelector("[data-content]");
    if (content) { content.style.maxHeight = "0"; content.style.opacity = "0"; }
    var icon = btn.querySelector(".ph");
    if (icon) { icon.className = "ph ph-plus"; }
    var node = btn.closest(".tl-row").querySelector(".tl-node");
    node.style.background = "var(--surface-elevated)";
    node.style.border = "1px solid var(--hairline-dark)";
    node.style.boxShadow = "none";
  }

  function openItem(btn) {
    btn.classList.add("open");
    btn.style.background = "var(--surface-elevated)";
    btn.style.border = "1px solid var(--hairline-dark)";
    btn.style.padding = "20px 24px";
    var content = btn.querySelector("[data-content]");
    if (content) { content.style.maxHeight = "160px"; content.style.opacity = "1"; }
    var icon = btn.querySelector(".ph");
    if (icon) { icon.className = "ph ph-minus"; }
    var node = btn.closest(".tl-row").querySelector(".tl-node");
    node.style.background = "var(--accent)";
    node.style.border = "1px solid var(--accent)";
    node.style.boxShadow = "0 0 0 6px rgba(73,79,223,0.18)";
  }

  items.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var wasOpen = btn.classList.contains("open");
      items.forEach(closeItem);
      if (!wasOpen) openItem(btn);
    });
  });

  if (items.length > 0) items[0].click();
})();
