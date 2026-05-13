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

  const previewLinks = document.querySelectorAll("[data-menu-preview]");
  const previewImage = document.querySelector("[data-menu-preview-image]");
  const previewTitle = document.querySelector("[data-menu-preview-title]");
  const previewDescription = document.querySelector("[data-menu-preview-description]");
  const previewLink = document.querySelector("[data-menu-preview-link]");
  const previewButton = document.querySelector("[data-menu-preview-button]");

  function setPreview(link) {
    if (!link || !previewImage || !previewTitle || !previewDescription || !previewLink || !previewButton) {
      return;
    }

    const title = link.dataset.title || link.textContent.trim();
    const description = link.dataset.description || "";
    const image = link.dataset.image || previewImage.getAttribute("src");
    const href = link.getAttribute("href");

    previewImage.classList.add("is-changing");
    window.setTimeout(function () {
      previewImage.setAttribute("src", image);
      previewImage.setAttribute("alt", title);
      previewTitle.textContent = title;
      previewDescription.textContent = description;
      previewLink.setAttribute("href", href);
      previewButton.setAttribute("href", href);
      previewButton.textContent = title === "Model Jedan" ? "View Model" : "Open " + title;
      previewImage.classList.remove("is-changing");
    }, 90);
  }

  previewLinks.forEach(function (link) {
    link.addEventListener("mouseenter", function () {
      setPreview(link);
    });
    link.addEventListener("focus", function () {
      setPreview(link);
    });
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
