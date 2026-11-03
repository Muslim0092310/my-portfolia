document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const menu = document.querySelector(".menu");

  const burger = document.createElement("button");
  burger.className = "burger";
  burger.setAttribute("aria-label", "Открыть меню");
  burger.innerHTML = "<span></span><span></span><span></span>";
  header.appendChild(burger);

  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    menu.classList.toggle("open");
  });
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("open");
      menu.classList.remove("open");
    });
  });

  const subtitle = document.querySelector(".hero h3");
  const fullText = subtitle.textContent;
  subtitle.textContent = "";
  let i = 0;
  (function typeLetter() {
    i++;
    subtitle.textContent = fullText.slice(0, i);
    if (i < fullText.length) setTimeout(typeLetter, 45);
  })();

  const items = document.querySelectorAll(
    ".container > h2, .box, .step, .list li, .tags, .cta p, .card",
  );
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  items.forEach((el) => {
    el.classList.add("reveal");

    const index = Array.from(el.parentElement.children).indexOf(el);
    el.style.transitionDelay = Math.min(index, 5) * 0.1 + "s";
    revealObserver.observe(el);
  });

  document.querySelectorAll(".fill").forEach((fill) => {
    fill.dataset.width = fill.style.width;
    fill.style.width = "0";
  });
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector(".fill");
          fill.style.width = fill.dataset.width;
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );
  document.querySelectorAll(".bar").forEach((bar) => barObserver.observe(bar));

  function countUp(el) {
    const match = el.textContent.match(/^(\d+)(.*)$/);
    if (!match) return;
    const end = Number(match[1]);
    const tail = match[2];
    let startTime = null;
    function step(time) {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / 1200, 1);
      el.textContent = Math.floor(progress * end) + tail;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          countUp(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.8 },
  );
  document.querySelectorAll(".stat b").forEach((b) => countObserver.observe(b));

  const progress = document.createElement("div");
  progress.className = "progress";
  document.body.appendChild(progress);

  const links = document.querySelectorAll(".menu a");
  const sections = Array.from(links).map((a) =>
    document.querySelector(a.getAttribute("href")),
  );

  window.addEventListener("scroll", () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (window.scrollY / total) * 100 + "%";

    let current = -1;
    sections.forEach((section, index) => {
      if (section && section.getBoundingClientRect().top <= 150)
        current = index;
    });
    links.forEach((link, index) =>
      link.classList.toggle("active", index === current),
    );
  });
});
