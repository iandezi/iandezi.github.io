(function () {
  var tabs = document.querySelectorAll("[data-project]");
  var stage = document.getElementById("project-device");
  var titleEl = document.getElementById("project-title");
  var descEl = document.getElementById("project-desc");
  var glowEl = document.getElementById("project-glow");
  var badgeEl = document.getElementById("project-badge");

  var projects = [
    { label: "Fintech app", desc: "Payments, wallets & dashboards", color: "var(--accent-teal)", kind: "phone" },
    { label: "Ecommerce platform", desc: "Browse, cart & checkout", color: "var(--accent-pink)", kind: "browser" },
    { label: "Travel booking app", desc: "Search, book & itinerary", color: "var(--accent-light-blue)", kind: "phone" },
    { label: "Student platform", desc: "Courses & community", color: "var(--accent-warning)", kind: "browser" },
    { label: "Health solution", desc: "Tracking & care", color: "var(--accent-light-green)", kind: "phone" },
  ];

  function setActive(index) {
    var p = projects[index];
    tabs.forEach(function (t, i) {
      var active = i === index;
      t.style.borderColor = active ? p.color : "var(--hairline-dark)";
      t.style.background = active ? "rgba(255,255,255,0.06)" : "transparent";
      t.style.color = active ? "#fff" : "var(--on-dark-mute)";
    });
    titleEl.textContent = p.label;
    descEl.textContent = p.desc + ". You'll research it, design it, prototype it, and present it as a portfolio ready case study.";
    glowEl.style.background = p.color;
    badgeEl.style.background = p.color;
    stage.style.width = p.kind === "phone" ? "220px" : "100%";
    stage.style.maxWidth = "420px";
    stage.setAttribute("data-kind", p.kind);
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { setActive(i); });
  });

  setActive(0);
})();
