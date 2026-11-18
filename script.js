// Animations qui montrent ce que fait chaque projet, comme une courte vidéo d'utilisation.
// Elles démarrent quand la carte arrive à l'écran, se jouent 2 fois, puis restent sur leur dernière image.
// Si l'utilisateur a demandé moins d'animations, on affiche directement l'image finale.

const calme = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const attendre = (ms) => new Promise((r) => setTimeout(r, calme ? 0 : ms));
const TOURS = 2;
const NS = "http://www.w3.org/2000/svg";

function quandVisible(el, lancer) {
  if (!el) return;
  const obs = new IntersectionObserver((entrees) => {
    if (entrees.some((e) => e.isIntersecting)) { obs.disconnect(); lancer(el); }
  }, { threshold: 0.35 });
  obs.observe(el);
}

async function taper(el, texte, vitesse = 28) {
  if (calme) { el.textContent = texte; return; }
  el.textContent = "";
  for (const ch of texte) { el.textContent += ch; await attendre(vitesse); }
}

/* ---------- Fenêtre d'application autour de chaque démo ---------- */
document.querySelectorAll(".demo[data-titre]").forEach((demo) => {
  const barre = document.createElement("div");
  barre.className = "barre-app";
  barre.innerHTML = `<i></i><i></i><i></i><span>${demo.dataset.titre}</span>`;
  demo.prepend(barre);
});

/* ---------- Curseur de souris simulé ---------- */
const FLECHE = '<svg viewBox="0 0 16 20" width="16" height="20"><path d="M1 1 L1 16 L5 12 L8 19 L11 18 L8 11 L14 11 Z" fill="#fff" stroke="#101820" stroke-width="1.2" stroke-linejoin="round"/></svg>';
function curseur(demo) {
  let c = demo.querySelector(".curseur");
  if (!c) {
    c = document.createElement("div");
    c.className = "curseur";
    c.innerHTML = FLECHE;
    demo.appendChild(c);
  }
  return c;
}
async function viser(demo, cible, fx = 0.5, fy = 0.5) {
  const c = curseur(demo);
  const r = cible.getBoundingClientRect();
  const d = demo.getBoundingClientRect();
  c.style.transform = `translate(${r.left - d.left + r.width * fx}px, ${r.top - d.top + r.height * fy}px)`;
  c.classList.add("vu");
  await attendre(700);
}
async function cliquer(demo) {
  const c = curseur(demo);
  c.classList.add("clic");
  await attendre(160);
  c.classList.remove("clic");
  await attendre(140);
}
function cacherCurseur(demo) { const c = demo.querySelector(".curseur"); if (c) c.classList.remove("vu"); }

/* ---------- Planning Salon ---------- */
async function planning(el) {
  const demo = el.closest(".demo");
  const cases = [...el.querySelectorAll(".pl-grille i")];
  const vue = el.querySelector(".pl-vue");
  const toast = el.querySelector(".pl-toast");
  const pop = document.createElement("div");
  pop.className = "pl-popup";
  el.appendChild(pop);
  const rdv = [
    [0, "Pose gel", "Mme L.", "a"], [4, "Tatouage", "M. D.", "b"], [8, "Épilation", "Mme R.", "a"],
    [10, "Manucure", "Mme K.", "b"], [2, "Épilation", "Mme P.", "a"],
  ];
  const poser = (i, presta, cliente, qui) => { cases[i].innerHTML = `<b>${presta}</b><small>${cliente}</small>`; cases[i].className = `pris ${qui}`; };
  const formulaire = async (titre, ligne) => {
    pop.innerHTML = `<p class="pp-titre">${titre}</p><p>${ligne}</p><span class="pp-bouton">Réserver</span>`;
    pop.classList.add("vu");
    await attendre(900);
    await viser(demo, pop.querySelector(".pp-bouton"));
    await cliquer(demo);
    pop.classList.remove("vu");
  };
  for (let passe = 0; passe < TOURS; passe++) {
    cases.forEach((c) => { c.className = ""; c.innerHTML = ""; });
    vue.textContent = "Vue : administratrice ▾";
    toast.className = "pl-toast";
    for (const r of rdv) { await attendre(260); poser(...r); }
    await attendre(500);
    // 1. on essaie de réserver une salle déjà prise
    await viser(demo, cases[4]);
    await cliquer(demo);
    await formulaire("Nouveau rendez-vous", "Épilation · Mme S. · mar. 10 h · salle 1");
    cases[4].classList.add("conflit");
    toast.textContent = "Salle déjà prise · refusé par la base";
    toast.classList.add("vu", "erreur");
    await attendre(1500);
    cases[4].classList.remove("conflit");
    toast.classList.remove("vu", "erreur");
    // 2. on choisit un créneau libre
    await viser(demo, cases[5]);
    await cliquer(demo);
    await formulaire("Nouveau rendez-vous", "Épilation · Mme S. · mer. 10 h · salle 2");
    poser(5, "Épilation", "Mme S.", "a");
    cases[5].classList.add("nouveau");
    toast.textContent = "Rendez-vous enregistré";
    toast.classList.add("vu", "succes");
    await attendre(1300);
    toast.classList.remove("vu", "succes");
    // 3. vue d'une collaboratrice : les clientes des autres sont masquées par les règles RLS
    await viser(demo, vue, 0.3);
    await cliquer(demo);
    vue.textContent = "Vue : collaboratrice A ▾";
    cases.forEach((c) => { if (c.classList.contains("b")) c.classList.add("masque"); });
    toast.textContent = "Clientes des autres masquées (RLS)";
    toast.classList.add("vu");
    cacherCurseur(demo);
    await attendre(2600);
    if (calme) return;
  }
}

/* ---------- Tableau de bord GraphQL ---------- */
async function graphql(el) {
  const demo = el.closest(".demo");
  const code = el.querySelector("code");
  const svg = el.querySelector("svg");
  const g = svg.querySelector(".barres");
  const courbe = svg.querySelector(".courbe");
  const login = document.createElement("div");
  login.className = "gq-login";
  login.innerHTML = '<p class="pp-titre">Connexion Zone01</p><p class="champ"><span class="u"></span></p><p class="champ"><span class="m"></span></p><span class="pp-bouton">Se connecter</span>';
  el.appendChild(login);
  const bulle = document.createElement("div");
  bulle.className = "gq-bulle";
  el.appendChild(bulle);
  const requete = 'query { user { transactions(type: "xp") { amount } } }';
  const valeurs = [30, 46, 41, 62, 55, 78, 70, 92];
  for (let passe = 0; passe < TOURS; passe++) {
    g.innerHTML = ""; svg.classList.remove("vu"); code.className = ""; code.textContent = "";
    bulle.classList.remove("vu");
    login.classList.add("vu");
    login.querySelector(".u").textContent = ""; login.querySelector(".m").textContent = "";
    await attendre(400);
    await taper(login.querySelector(".u"), "sbeck", 70);
    await taper(login.querySelector(".m"), "••••••••", 50);
    await viser(demo, login.querySelector(".pp-bouton"));
    await cliquer(demo);
    login.classList.remove("vu");
    cacherCurseur(demo);
    code.textContent = "✓ jeton JWT reçu";
    code.className = "ok";
    await attendre(700);
    code.className = "";
    await taper(code, requete, 20);
    code.classList.add("ok");
    code.textContent = requete + "\n→ 200 OK · données reçues";
    valeurs.forEach((v, i) => {
      const x = 22 + i * 34;
      const r = document.createElementNS(NS, "rect");
      r.setAttribute("x", x); r.setAttribute("width", 20); r.setAttribute("rx", 3);
      r.setAttribute("y", 120); r.setAttribute("height", 0);
      if (i === valeurs.length - 1) r.classList.add("fort");
      g.appendChild(r);
      setTimeout(() => { r.setAttribute("y", 120 - v); r.setAttribute("height", v); }, calme ? 0 : 90 * i);
    });
    courbe.setAttribute("points", valeurs.map((v, i) => `${22 + i * 34 + 10},${120 - v - 10}`).join(" "));
    await attendre(800);
    svg.classList.add("vu");
    await attendre(900);
    // survol de la dernière barre : une bulle d'information
    const derniere = g.lastElementChild;
    await viser(demo, derniere, 0.5, 0.2);
    const r = derniere.getBoundingClientRect(), d = el.getBoundingClientRect();
    bulle.style.left = `${Math.max(0, r.left - d.left - 120)}px`;
    bulle.style.top = `${r.top - d.top - 34}px`;
    bulle.textContent = "semaine 8 · la plus forte";
    bulle.classList.add("vu");
    await attendre(2400);
    cacherCurseur(demo);
    if (calme) return;
  }
}

/* ---------- CyberGuard ---------- */
async function scan(el) {
  const demo = el.closest(".demo");
  const appareils = [
    ["box", "192.168.1.1", "22, 80", "bas", 82, 30],
    ["PC", "192.168.1.12", "445", "moyen", 30, 44],
    ["caméra", "192.168.1.23", "23 telnet", "haut", 88, 84],
    ["téléphone", "192.168.1.40", "aucun", "bas", 40, 92],
  ];
  const ul = el.querySelector("ul");
  const titre = el.querySelector(".scan-titre");
  const points = el.querySelector(".r-points");
  const radar = el.querySelector(".radar");
  const panneau = document.createElement("div");
  panneau.className = "ia-panneau";
  el.appendChild(panneau);
  for (let passe = 0; passe < TOURS; passe++) {
    ul.innerHTML = ""; points.innerHTML = ""; panneau.classList.remove("vu");
    titre.textContent = "Scan du réseau local…";
    radar.classList.add("actif");
    for (const [nom, ip, ports, risque, x, y] of appareils) {
      await attendre(600);
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", x); c.setAttribute("cy", y); c.setAttribute("r", 4);
      c.setAttribute("class", `p-${risque}`);
      points.appendChild(c);
      const li = document.createElement("li");
      li.innerHTML = `<span><b>${nom}</b> ${ip}</span><span>${ports} <b class="risque ${risque}">${risque}</b></span>`;
      ul.appendChild(li);
      await attendre(40);
      li.classList.add("vu");
    }
    radar.classList.remove("actif");
    titre.textContent = "4 appareils · 1 risque élevé";
    await attendre(500);
    // on clique sur l'appareil à risque : l'IA locale explique
    const camera = ul.children[2];
    await viser(demo, camera, 0.3);
    await cliquer(demo);
    camera.classList.add("choisi");
    panneau.innerHTML = '<p class="pp-titre">Explication · IA locale</p><p class="ia-texte"></p>';
    panneau.classList.add("vu");
    cacherCurseur(demo);
    await taper(panneau.querySelector(".ia-texte"), "Le port 23 (telnet) envoie les mots de passe en clair sur le réseau. Conseil : désactiver telnet sur la caméra.", 16);
    await attendre(2600);
    camera.classList.remove("choisi");
    if (calme) return;
  }
}

/* ---------- Net-Cat : trois clients connectés au même serveur ---------- */
async function chat(el) {
  const [lea, seb] = [...el.querySelectorAll(".lignes")];
  const serveur = el.closest(".demo").querySelector(".serveur");
  const ecrire = async (zone, classe, texte) => {
    const p = document.createElement("p");
    p.className = `l ${classe}`;
    zone.appendChild(p);
    if (classe === "moi") await taper(p, texte, 30); else p.textContent = texte;
    while (zone.children.length > 8) zone.firstChild.remove();
  };
  const ecritEnCours = async (zone, nom) => {
    const p = document.createElement("p");
    p.className = "l sys ecrit";
    p.textContent = `${nom} écrit…`;
    zone.appendChild(p);
    await attendre(700);
    p.remove();
  };
  for (let passe = 0; passe < TOURS; passe++) {
    lea.innerHTML = ""; seb.innerHTML = "";
    serveur.textContent = "serveur :8989 · 2 clients connectés";
    await ecrire(lea, "sys", "connectée · salon général");
    await ecrire(seb, "sys", "connecté · salon général");
    await attendre(300);
    await ecrire(lea, "moi", "salut !");
    await ecrire(seb, "", "[léa] salut !");
    await ecritEnCours(lea, "seb");
    await ecrire(seb, "moi", "/create projet-go");
    await ecrire(seb, "sys", "salon projet-go créé");
    await ecrire(lea, "sys", "nouveau salon : projet-go");
    await ecrire(lea, "moi", "/join projet-go");
    await ecrire(seb, "sys", "léa a rejoint projet-go");
    await attendre(400);
    serveur.textContent = "serveur :8989 · 3 clients connectés";
    serveur.classList.add("flash");
    await ecrire(seb, "sys", "max a rejoint projet-go");
    await ecrire(lea, "sys", "max a rejoint projet-go");
    await attendre(300);
    serveur.classList.remove("flash");
    await ecritEnCours(seb, "léa");
    await ecrire(lea, "moi", "on teste à 3 ?");
    await ecrire(seb, "", "[léa] on teste à 3 ?");
    await attendre(2600);
    if (calme) return;
  }
}

/* ---------- Lem-in : exploration du graphe, puis les fourmis ---------- */
async function lemin(svg) {
  const aretes = [...svg.querySelectorAll(".aretes line")];
  const salles = [...svg.querySelectorAll(".salles circle")];
  const g = svg.querySelector(".pions");
  const tour = svg.querySelector(".tour");
  const haut = [[30, 80], [110, 35], [190, 35], [270, 80]];
  const bas = [[30, 80], [110, 125], [190, 125], [270, 80]];
  const fourmis = [];
  for (let i = 0; i < 4; i++) {
    const grp = document.createElementNS(NS, "g");
    grp.setAttribute("class", "fourmi cache");
    const c = document.createElementNS(NS, "circle");
    c.setAttribute("r", 6);
    const t = document.createElementNS(NS, "text");
    t.textContent = i + 1;
    t.setAttribute("text-anchor", "middle"); t.setAttribute("dy", "3");
    grp.append(c, t);
    g.appendChild(grp);
    fourmis.push({ grp, chemin: i % 2 ? bas : haut, depart: Math.floor(i / 2) });
  }
  const placer = (f, p) => { const [x, y] = f.chemin[p]; f.grp.style.transform = `translate(${x}px, ${y}px)`; };
  // exploration en largeur : Start, puis ses voisins, puis les suivants, puis End
  const niveaux = [{ s: [0], a: [] }, { s: [1, 2], a: [0, 1] }, { s: [3, 4], a: [2, 3] }, { s: [5], a: [4, 5] }];
  for (let passe = 0; passe < TOURS; passe++) {
    aretes.forEach((a) => a.classList.remove("explore", "chemin"));
    salles.forEach((s) => s.classList.remove("visite", "front"));
    fourmis.forEach((f) => { f.grp.classList.add("cache"); placer(f, 0); });
    tour.textContent = "recherche des chemins…";
    for (const n of niveaux) {
      salles.forEach((s) => s.classList.remove("front"));
      n.a.forEach((i) => aretes[i].classList.add("explore"));
      n.s.forEach((i) => salles[i].classList.add("visite", "front"));
      await attendre(600);
    }
    salles.forEach((s) => s.classList.remove("front"));
    [0, 1, 2, 3, 4, 5].forEach((i) => aretes[i].classList.add("chemin"));
    tour.textContent = "2 chemins sans croisement trouvés";
    await attendre(900);
    fourmis.forEach((f) => f.grp.classList.remove("cache"));
    for (let t = 1; t <= 4; t++) {
      tour.textContent = `tour ${t}`;
      fourmis.forEach((f) => placer(f, Math.min(Math.max(t - f.depart, 0), 3)));
      await attendre(800);
    }
    tour.textContent = "4 fourmis arrivées en 4 tours";
    await attendre(2200);
    if (calme) return;
  }
}

/* ---------- Discussion en boucle dans le bas de page ---------- */
async function discussion(scene) {
  const fil = scene.querySelector(".fil");
  const echanges = [
    ["eux", "Bonjour Sébastien, votre profil nous intéresse"],
    ["moi", "Merci ! Je suis disponible dès maintenant"],
    ["eux", "Vous codez avec quels langages ?"],
    ["moi", "Surtout Go et JavaScript, avec SQL"],
    ["eux", "Et le rythme de l'alternance ?"],
    ["moi", "3 semaines en entreprise, 1 semaine à l'école"],
    ["eux", "Vous avez déjà un projet utilisé en vrai ?"],
    ["moi", "Oui, une appli de planning pour un salon"],
    ["eux", "On peut s'appeler cette semaine ?"],
    ["moi", "Avec plaisir : 06 64 06 27 75"],
  ];
  const ajouter = (classe, html) => {
    const d = document.createElement("div");
    d.className = `msg ${classe}`;
    d.innerHTML = html;
    fil.appendChild(d);
    while (fil.children.length > 5) fil.firstChild.remove();
    return d;
  };
  if (calme) { echanges.slice(0, 4).forEach(([q, t]) => ajouter(q, t)); return; }
  for (;;) {
    for (const [qui, texte] of echanges) {
      const points = ajouter(`${qui} ecrit`, "<i></i><i></i><i></i>");
      await attendre(qui === "eux" ? 1100 : 900);
      points.remove();
      ajouter(qui, texte);
      await attendre(1500);
    }
    await attendre(1500);
    fil.innerHTML = "";
  }
}
quandVisible(document.getElementById("scene-contact"), discussion);
quandVisible(document.getElementById("demo-planning"), planning);
quandVisible(document.getElementById("demo-graphql"), graphql);
quandVisible(document.getElementById("demo-scan"), scan);
quandVisible(document.getElementById("demo-chat"), chat);
quandVisible(document.getElementById("demo-lemin"), lemin);
