(function () {
  const body = document.body;
  const panel = document.getElementById("site-menu");
  const menuButtons = document.querySelectorAll("[data-menu-toggle]");
  const yearNodes = document.querySelectorAll("[data-year]");

  yearNodes.forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });

  function setMenu(open) {
    body.classList.toggle("menu-open", open);
    if (panel) {
      panel.setAttribute("aria-hidden", String(!open));
    }

    menuButtons.forEach(function (button) {
      button.setAttribute("aria-expanded", String(open));
      const label = button.querySelector("[data-menu-label]");
      if (label) {
        label.textContent = open ? "Close" : "Menu";
      }
    });
  }

  menuButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setMenu(!body.classList.contains("menu-open"));
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setMenu(false);
    }
  });

  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) {
    return;
  }

  const slides = carousel.querySelector("[data-slides]");
  const dotWrap = carousel.querySelector("[data-dots]");
  const prev = carousel.querySelector("[data-prev]");
  const next = carousel.querySelector("[data-next]");
  const count = slides ? slides.children.length : 0;
  const dots = [];
  let index = 0;

  if (!slides || !dotWrap || count === 0) {
    return;
  }

  function renderDots() {
    dots.forEach(function (dot, i) {
      dot.setAttribute("aria-current", String(i === index));
    });
  }

  function go(nextIndex) {
    index = (nextIndex + count) % count;
    slides.style.transform = "translateX(" + (-index * 100) + "%)";
    renderDots();
  }

  for (let i = 0; i < count; i += 1) {
    const button = document.createElement("button");
    button.className = "dot";
    button.type = "button";
    button.setAttribute("aria-label", "Go to image " + (i + 1));
    button.addEventListener("click", function () {
      go(i);
    });
    dotWrap.appendChild(button);
    dots.push(button);
  }

  if (prev) {
    prev.addEventListener("click", function () {
      go(index - 1);
    });
  }

  if (next) {
    next.addEventListener("click", function () {
      go(index + 1);
    });
  }

  go(0);
})();
