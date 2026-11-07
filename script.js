document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     1. COMPÉTENCES (générées depuis un tableau)
     Pour ajouter une compétence, ajoute-la simplement ici.
  ========================= */
  const skills = ["HTML", "CSS", "JavaScript"];
  const skillsList = document.getElementById("skills-list");

  if (skillsList) {
    skillsList.innerHTML = "";
    skills.forEach((skill) => {
      const li = document.createElement("li");
      li.textContent = skill;
      skillsList.appendChild(li);
    });
  }

  /* =========================
     2. STYLES AJOUTÉS PAR LE JS
     (mode clair, animation d'apparition, boutons)
  ========================= */
  const style = document.createElement("style");
  style.textContent = `
    body.light { background-color: #f3f6ff; color: #111827; }
    body.light header { background-color: #dbe4ff; }
    body.light footer { color: #4b5563; }
    body.light a { color: #1d4ed8; }

    section.hidden { opacity: 0; transform: translateY(30px); }
    section { transition: opacity 0.7s ease, transform 0.7s ease; }

    .floating-btn {
      position: fixed; right: 20px; width: 46px; height: 46px;
      border: none; border-radius: 50%; cursor: pointer;
      font-size: 20px; background: #7dd3fc; color: #060829;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
    #theme-btn { bottom: 76px; }
    #top-btn { bottom: 20px; display: none; }
  `;
  document.head.appendChild(style);

  /* =========================
     3. MODE CLAIR / SOMBRE
     Le choix est gardé en mémoire dans le navigateur.
  ========================= */
  const themeBtn = document.createElement("button");
  themeBtn.id = "theme-btn";
  themeBtn.className = "floating-btn";
  themeBtn.setAttribute("aria-label", "Changer de thème");
  document.body.appendChild(themeBtn);

  function applyTheme(light) {
    document.body.classList.toggle("light", light);
    themeBtn.textContent = light ? "🌙" : "☀️";
  }

  let savedLight = false;
  try {
    savedLight = localStorage.getItem("theme") === "light";
  } catch (e) {}
  applyTheme(savedLight);

  themeBtn.addEventListener("click", () => {
    const isLight = !document.body.classList.contains("light");
    applyTheme(isLight);
    try {
      localStorage.setItem("theme", isLight ? "light" : "dark");
    } catch (e) {}
  });

  /* =========================
     4. APPARITION DES SECTIONS AU SCROLL
  ========================= */
  const sections = document.querySelectorAll("section");
  sections.forEach((s) => s.classList.add("hidden"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("hidden");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  sections.forEach((s) => observer.observe(s));

  /* =========================
     5. BOUTON « RETOUR EN HAUT »
  ========================= */
  const topBtn = document.createElement("button");
  topBtn.id = "top-btn";
  topBtn.className = "floating-btn";
  topBtn.textContent = "↑";
  topBtn.setAttribute("aria-label", "Retour en haut");
  document.body.appendChild(topBtn);

  window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});