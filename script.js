document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const menu = document.querySelector(".menu");

  const burger = document.createElement("button");
  burger.className = "burger";
  burger.innerHTML = "<span></span><span></span><span></span>";
  header.appendChild(burger);

  burger.onclick = () => {
    burger.classList.toggle("open");
    menu.classList.toggle("open");
  };

  menu.querySelectorAll("a").forEach(link => {
    link.onclick = () => {
      burger.classList.remove("open");
      menu.classList.remove("open");
    };
  });

  const progress = document.createElement("div");
  progress.className = "progress";
  document.body.appendChild(progress);

  window.onscroll = () => {
    const total = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = (scrollY / total) * 100 + "%";
  };
});
