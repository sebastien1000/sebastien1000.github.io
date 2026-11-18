// Mode « Discuter avec moi » : une scène animée.
// Le personnage est assis derrière son ordinateur, à côté d'un grand écran.
// Le recruteur pose une question (clavier, boutons ou micro) : le personnage parle dans une bulle,
// montre l'écran du bras, et l'écran affiche au fur et à mesure ce qu'il présente.
// Les réponses sont écrites à l'avance à partir du vrai contenu du portfolio (pas d'IA en ligne).

(() => {
  const TEL = "06 64 06 27 75";
  const MAIL = "beck.sebastien76220@gmail.com";
  const GITHUB = "https://github.com/sebastien1000";
  const LINKEDIN = "https://www.linkedin.com/in/sebastien-beck-dev-web";
  const CV = "CV_Sebastien_Beck.pdf";
  const calme = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pause = (ms) => new Promise((r) => setTimeout(r, calme ? 0 : ms));
  const echapper = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const logo = (slug) => `https://cdn.simpleicons.org/${slug}`;

  const PROJETS = [
    { cle: "planning", nom: "Planning Salon", quoi: "Une appli de gestion utilisée par un vrai salon : rendez-vous, fiches clientes, absences, prestations.", stack: ["JavaScript", "Supabase", "PostgreSQL", "Vercel"], id: "p-planning", lien: null, badge: "Vrai client" },
    { cle: "graphql", nom: "Tableau de bord GraphQL", quoi: "Connexion à l'API de Zone01 avec un jeton JWT, puis mes statistiques en graphiques SVG faits à la main.", stack: ["JavaScript", "GraphQL", "JWT", "SVG"], id: "p-graphql", lien: "https://graph-ql-rho-azure.vercel.app" },
    { cle: "cyberguard", nom: "CyberGuard", quoi: "Un assistant qui scanne le réseau de la maison, repère les ports ouverts et explique les risques avec une IA locale.", stack: ["Go", "Ollama", "tests unitaires"], id: "p-cyberguard", lien: null },
    { cle: "netcat", nom: "Net-Cat", quoi: "Un serveur de chat recodé en Go : plusieurs personnes connectées en même temps, avec des salons.", stack: ["Go", "TCP", "goroutines"], id: "p-netcat", lien: "https://github.com/sebastien1000/net-cat" },
    { cle: "lemin", nom: "Lem-in", quoi: "Un programme qui trouve les meilleurs chemins pour faire traverser une fourmilière.", stack: ["Go", "graphes"], id: "p-lemin", lien: "https://github.com/sebastien1000/lem-in" },
    { cle: "forteam", nom: "ForTeam", quoi: "Un assistant d'aide basé sur l'IA, que je construis en équipe. En cours.", stack: ["projet en équipe"], id: "p-forteam", lien: null, badge: "En cours" },
  ];
  const STACK = [["go", "Go"], ["javascript", "JavaScript"], ["react", "React"], ["postgresql", "PostgreSQL"], ["supabase", "Supabase"], ["graphql", "GraphQL"], ["docker", "Docker"], ["linux", "Linux"], ["git", "Git"], ["githubactions", "GitHub Actions"], ["vercel", "Vercel"], ["jsonwebtokens", "JWT"]];
  const DEPART = ["Montre-moi tes projets", "Quelle stack tu utilises ?", "Tu es disponible quand ?", "Envoie-moi ton CV"];

  // ---------- Ce que le personnage répond, et ce qu'il affiche à l'écran ----------
  const intentions = [
    { cles: ["planning", "salon", "rendez-vous", "rdv"], rep: () => unProjet("planning") },
    { cles: ["graphql", "tableau de bord", "dashboard", "jwt"], rep: () => unProjet("graphql") },
    { cles: ["cyberguard", "scan", "radar", "ollama"], rep: () => unProjet("cyberguard") },
    { cles: ["net-cat", "netcat", "chat tcp", "tcp"], rep: () => unProjet("netcat") },
    { cles: ["lem-in", "lemin", "fourmi", "graphe"], rep: () => unProjet("lemin") },
    { cles: ["forteam", "jarvis", "assistant"], rep: () => unProjet("forteam") },
    { cles: ["important", "meilleur", "fier", "phare", "principal"], rep: () => ({ ...unProjet("planning"), dire: "Mon projet le plus important, c'est Planning Salon : une vraie appli, utilisée par un vrai salon." }) },
    { cles: ["stack", "langage", "techno", "compétence", "competence", "outil", "sais faire", "react", "javascript", "sql"], rep: () => ({
      dire: "Voici ma stack. Je code surtout en Go et en JavaScript, avec SQL derrière.", ecran: "stack",
      suite: ["Et la cybersécurité ?", "Montre-moi tes projets"] }) },
    { cles: ["cyber", "sécurité", "securite", "blue team", "wazuh", "siem", "badge", "tryhackme", "hack the box"], rep: () => ({
      dire: "Je pousse mon apprentissage en cybersécurité : je suis un parcours Blue Team. Regardez ce que j'ai déjà fait.", ecran: "cyber",
      suite: ["Quelle stack tu utilises ?", "Envoie-moi ton CV"] }) },
    { cles: ["dispo", "disponible", "quand", "commencer", "début", "debut", "rythme", "alternance", "semaine"], rep: () => ({
      dire: "Je suis disponible dès maintenant, pour 1 à 2 ans. Voici les infos de mon alternance.", ecran: "alternance",
      suite: ["Tu es où ?", "On peut s'appeler ?"] }) },
    { cles: ["où", "ville", "mobilité", "mobilite", "habite", "rouen", "paris", "lille", "permis"], rep: () => ({
      dire: "J'habite à Beauvoir-en-Lyons, en Normandie, et j'ai le permis. Je peux travailler dans ces villes.", ecran: "villes",
      suite: ["Tu es disponible quand ?", "On peut s'appeler ?"] }) },
    { cles: ["diplôme", "diplome", "formation", "zone01", "études", "etudes", "école", "ecole", "rncp", "avant", "expérience", "experience", "leroy", "parcours", "reconversion"], rep: () => ({
      dire: "Voici mon parcours : 6 ans de logistique chez Leroy Merlin, puis Zone01 Rouen. Et la prochaine étape, c'est peut-être chez vous.", ecran: "parcours",
      suite: ["Montre-moi tes projets", "Tu es disponible quand ?"] }) },
    { cles: ["pourquoi", "motivation", "envie"], rep: () => ({
      dire: "J'aime comprendre comment les choses marchent et régler des problèmes concrets. Le code, c'est exactement ça.", ecran: "accueil",
      suite: ["Montre-moi tes projets", "On peut s'appeler ?"] }) },
    { cles: ["rqth", "handicap", "aide", "agefiph"], rep: () => ({
      dire: "J'ai la RQTH : mon contrat d'alternance peut ouvrir droit à des aides de l'Agefiph pour l'entreprise.", ecran: "alternance",
      suite: ["Envoie-moi ton CV"] }) },
    { cles: ["github", "code source", "dépôt", "depot"], rep: () => ({
      dire: "Voici mon GitHub. Je vous l'ouvre à l'écran.", ecran: "github",
      suite: ["Montre-moi tes projets", "Envoie-moi ton CV"] }) },
    { cles: ["linkedin"], rep: () => ({
      dire: "Voici mon LinkedIn.", ecran: "linkedin", suite: ["Envoie-moi ton CV"] }) },
    { cles: ["cv", "curriculum", "envoie", "envoyer", "pdf"], rep: () => ({
      dire: "Avec plaisir ! Le voici. Vous pouvez le télécharger, ou me laisser votre adresse et je vous l'envoie.", ecran: "cv",
      suite: ["On peut s'appeler ?"] }) },
    { cles: ["appel", "appeler", "téléphone", "telephone", "numéro", "numero", "contact", "joindre", "mail", "entretien", "rencontrer"], rep: () => ({
      dire: "Bien sûr ! Appelez-moi ou écrivez-moi, je réponds vite.", ecran: "contact",
      suite: ["Envoie-moi ton CV"] }) },
    { cles: ["projet", "réalisation", "realisation", "travaux", "portfolio", "montre", "fait", "voir"], rep: () => ({
      dire: "Avec plaisir, je vous montre mes projets ! Le premier est utilisé par un vrai salon. Touchez-en un pour le voir en détail.", ecran: "projets",
      suite: ["Lequel est le plus important ?", "Quelle stack tu utilises ?"] }) },
    { cles: ["merci", "au revoir", "bye", "parfait", "super", "top"], rep: () => ({
      dire: "Merci à vous ! J'espère qu'on se parlera bientôt.", ecran: "contact" }) },
    { cles: ["bonjour", "salut", "hello", "coucou", "bonsoir", "hey"], rep: () => ({
      dire: "Bonjour ! Je suis Sébastien, développeur full stack en recherche d'alternance. Que voulez-vous voir ?", ecran: "accueil", suite: DEPART }) },
  ];
  function unProjet(cle) {
    const p = PROJETS.find((x) => x.cle === cle);
    return { dire: `Voici ${p.nom}. ${p.quoi}`, ecran: "projet", projet: p, suite: ["Montre-moi un autre projet", "Quelle stack tu utilises ?"] };
  }
  const sansAccents = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  function trouver(texte) {
    const t = " " + sansAccents(texte) + " ";
    if (/autre projet/.test(t)) return intentions.find((i) => i.cles.includes("projet")).rep();
    let best = null, score = 0;
    for (const it of intentions) {
      const s = it.cles.filter((k) => t.includes(sansAccents(k))).length;
      if (s > score) { score = s; best = it; }
    }
    return best ? best.rep() : { dire: "Je n'ai pas bien compris. Voici ce que je peux vous montrer.", ecran: "menu" };
  }

  // ---------- La scène ----------
  const scene = document.createElement("div");
  scene.className = "sc";
  scene.setAttribute("role", "dialog");
  scene.setAttribute("aria-label", "Discuter avec Sébastien");
  scene.innerHTML = `
    <div class="sc-haut">
      <span class="sc-statut"><i></i>Sébastien est là · posez-lui une question</span>
      <button type="button" class="sc-fermer">Vue classique</button>
    </div>
    <div class="sc-plateau">
      <div class="sc-ecran-zone">
        <div class="sc-moniteur">
          <div class="sc-barre"><i></i><i></i><i></i><span class="sc-url">sebastien.dev</span></div>
          <div class="sc-ecran" aria-live="polite"></div>
        </div>
        <div class="sc-pied"></div>
      </div>
      <div class="sc-perso-zone">
        <div class="sc-bulle" aria-live="polite"><p></p></div>
        <svg class="sc-perso" viewBox="0 0 300 300" aria-hidden="true">
  <defs>
    <linearGradient id="av-peau1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6c7a6"/><stop offset="1" stop-color="#eab18f"/></linearGradient>
    <linearGradient id="av-sweat1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3a52"/><stop offset="1" stop-color="#1c2738"/></linearGradient>
  </defs>
  <g class="corps">
    <!-- sweat à capuche -->
    <path fill="url(#av-sweat1)" d="M58 300 C 60 236, 98 206, 150 206 C 202 206, 240 236, 242 300 Z"/>
    <path fill="#b9c0c7" d="M112 214 Q150 248 188 214 L180 204 Q150 230 120 204 Z"/>
    <path fill="none" stroke="#0f151f" stroke-width="3" stroke-linecap="round" d="M130 222 Q127 248 126 270 M170 222 Q173 248 174 270"/>
    <circle cx="126" cy="272" r="3.5" fill="#0f151f"/><circle cx="174" cy="272" r="3.5" fill="#0f151f"/>
    <rect x="137" y="176" width="26" height="34" rx="11" fill="#e3a684"/>
    <g class="tete">
      <!-- oreilles -->
      <circle cx="94" cy="132" r="13" fill="#eab18f"/><circle cx="206" cy="132" r="13" fill="#eab18f"/>
      <circle cx="95" cy="133" r="6" fill="#dc9c7a"/><circle cx="205" cy="133" r="6" fill="#dc9c7a"/>
      <!-- visage -->
      <rect x="96" y="66" width="108" height="128" rx="54" fill="url(#av-peau1)"/>
      <!-- cheveux courts châtains -->
      <path fill="#5b4030" d="M96 118 C 92 80, 114 56, 150 56 C 186 56, 208 80, 204 118 C 200 102, 194 94, 186 90 C 182 98, 172 100, 164 92 C 158 100, 146 101, 138 93 C 130 100, 118 100, 112 92 C 104 98, 99 106, 96 118 Z"/>
      <path fill="#6e4f3c" d="M118 64 C 132 56, 168 56, 182 64 C 170 62, 160 64, 150 70 C 140 64, 130 62, 118 64 Z"/>
      <!-- sourcils -->
      <path fill="none" stroke="#4a3426" stroke-width="5" stroke-linecap="round" d="M118 112 Q129 106 140 111 M160 111 Q171 106 182 112"/>
      <!-- yeux -->
      <g class="yeux">
        <ellipse cx="130" cy="128" rx="9" ry="10" fill="#fff"/><ellipse cx="170" cy="128" rx="9" ry="10" fill="#fff"/>
        <circle cx="131" cy="129" r="6" fill="#4f7391"/><circle cx="171" cy="129" r="6" fill="#4f7391"/>
        <circle cx="131" cy="129" r="3" fill="#1b2028"/><circle cx="171" cy="129" r="3" fill="#1b2028"/>
        <circle cx="133.5" cy="126.5" r="1.8" fill="#fff"/><circle cx="173.5" cy="126.5" r="1.8" fill="#fff"/>
      </g>
      <!-- lunettes -->
      <g fill="none" stroke="#3a3f47" stroke-width="3">
        <rect x="112" y="113" width="36" height="30" rx="11"/><rect x="152" y="113" width="36" height="30" rx="11"/>
        <path d="M148 125 Q150 122 152 125 M112 124 L100 120 M188 124 L200 120"/>
      </g>
      <!-- joues -->
      <ellipse cx="116" cy="154" rx="10" ry="6" fill="#f08d7c" opacity="0.35"/><ellipse cx="184" cy="154" rx="10" ry="6" fill="#f08d7c" opacity="0.35"/>
      <!-- nez -->
      <path fill="#e09f7c" d="M146 138 Q150 152 145 155 Q150 159 156 155 Q151 152 154 138 Z"/>
      <!-- bouc -->
      <path fill="#5b4030" d="M128 166 Q150 152 172 166 Q174 172 168 172 Q160 166 150 166 Q140 166 132 172 Q126 172 128 166 Z"/>
      <path fill="#5b4030" d="M134 174 Q150 180 166 174 Q166 194 150 198 Q134 194 134 174 Z"/>
      <!-- bouche souriante -->
      <path class="bouche" fill="#7e3b33" d="M138 170 Q150 182 162 170 Q150 175 138 170 Z"/>
    </g>
  </g>
<g class="bras"><path class="manche" d="M92 240 L40 200 L30 214 L80 258 Z"/><circle class="main" cx="35" cy="205" r="11"/></g><g class="portable"><path class="clavier" d="M54 300 L246 300 L230 284 L70 284 Z"/><rect class="capot" x="74" y="222" width="152" height="64" rx="9"/><rect class="sb" x="137" y="241" width="26" height="26" rx="7"/><text x="150" y="258">SB</text></g></svg>
        <div class="sc-bureau"></div>
      </div>
    </div>
    <div class="sc-question" aria-live="polite"></div>
    <div class="sc-puces"></div>
    <form class="sc-saisie">
      <input type="text" placeholder="Posez votre question à Sébastien…" aria-label="Votre question" autocomplete="off">
      <button type="button" class="sc-micro" aria-label="Poser la question à la voix" hidden><svg viewBox="0 0 24 24"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4"/></svg></button>
      <button type="submit" class="sc-envoyer" aria-label="Demander"><svg viewBox="0 0 24 24"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg></button>
    </form>`;
  document.body.appendChild(scene);

  const flottant = document.createElement("button");
  flottant.type = "button";
  flottant.className = "sc-flottant";
  flottant.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span>Discuter avec moi</span>';
  document.body.appendChild(flottant);

  const ecran = scene.querySelector(".sc-ecran");
  const url = scene.querySelector(".sc-url");
  const bulle = scene.querySelector(".sc-bulle");
  const bulleTexte = bulle.querySelector("p");
  const perso = scene.querySelector(".sc-perso");
  const puces = scene.querySelector(".sc-puces");
  const question = scene.querySelector(".sc-question");
  const form = scene.querySelector(".sc-saisie");
  const champ = form.querySelector("input");
  const micro = form.querySelector(".sc-micro");
  let occupe = false, demarre = false;

  // ---------- Le personnage parle ----------
  async function parler(texte) {
    bulle.classList.add("vu");
    perso.classList.add("parle");
    bulleTexte.textContent = "";
    if (calme) bulleTexte.textContent = texte;
    else for (const mot of texte.split(" ")) { bulleTexte.textContent += (bulleTexte.textContent ? " " : "") + mot; await pause(70); }
    perso.classList.remove("parle");
  }
  async function montrer() { perso.classList.add("montre"); await pause(1600); perso.classList.remove("montre"); }

  // ---------- Ce qui s'affiche sur le grand écran ----------
  async function afficher(type, r) {
    ecran.classList.add("change");
    await pause(220);
    ecran.innerHTML = "";
    ecran.className = `sc-ecran e-${type}`;
    const ajouter = async (html, cls = "", delai = 160) => {
      const d = document.createElement("div");
      d.className = `sc-el ${cls}`;
      d.innerHTML = html;
      ecran.appendChild(d);
      await pause(delai);
      return d;
    };
    switch (type) {
      case "accueil":
        url.textContent = "sebastien.dev";
        await ajouter('<p class="e-titre">Sébastien Beck</p><p class="e-sous">Développeur full stack · en recherche d\'alternance</p>', "", 300);
        await ajouter('<p class="e-dispo"><i></i>Disponible dès maintenant</p>');
        break;
      case "menu":
        url.textContent = "sebastien.dev/aide";
        await ajouter('<p class="e-sous">Vous pouvez me demander :</p>');
        for (const q of ["Mes projets", "Ma stack", "La cybersécurité", "Mes disponibilités", "Mon parcours", "Mon CV", "Mon GitHub", "Me contacter"]) await ajouter(`<p class="e-ligne">→ ${q}</p>`, "", 110);
        break;
      case "projets":
        url.textContent = "sebastien.dev/projets";
        { const g = await ajouter("", "e-grille", 0);
          for (const p of PROJETS) {
            const b = document.createElement("button");
            b.type = "button"; b.className = "e-carte";
            b.innerHTML = `${p.badge ? `<span class="e-badge">${p.badge}</span>` : ""}<b>${p.nom}</b><span>${p.stack.join(" · ")}</span>`;
            b.addEventListener("click", () => poser(p.nom));
            g.appendChild(b);
            await pause(380);
          } }
        break;
      case "projet": {
        const p = r.projet;
        url.textContent = `sebastien.dev/projets/${p.cle}`;
        await ajouter(`${p.badge ? `<span class="e-badge">${p.badge}</span>` : ""}<p class="e-titre">${p.nom}</p>`, "", 250);
        await ajouter(`<p class="e-texte">${p.quoi}</p>`, "", 250);
        const t = await ajouter("", "e-tags", 0);
        for (const s of p.stack) { t.insertAdjacentHTML("beforeend", `<span>${echapper(s)}</span>`); await pause(140); }
        const a = await ajouter("", "e-actions", 0);
        const voir = document.createElement("button"); voir.type = "button"; voir.textContent = "Voir l'animation du projet"; voir.addEventListener("click", () => aller(p.id)); a.appendChild(voir);
        if (p.lien) a.insertAdjacentHTML("beforeend", `<a href="${p.lien}" target="_blank" rel="noreferrer">Code ou démo ↗</a>`);
        break; }
      case "stack":
        url.textContent = "sebastien.dev/stack";
        { const g = await ajouter("", "e-logos", 0);
          for (const [slug, nom] of STACK) { g.insertAdjacentHTML("beforeend", `<span><img src="${logo(slug)}" alt="" width="28" height="28">${nom}</span>`); await pause(170); } }
        break;
      case "cyber":
        url.textContent = "sebastien.dev/cyber";
        await ajouter('<p class="e-sous">Parcours Blue Team · en cours</p>', "", 250);
        for (const [n, d] of [["Hammered", "analyse de logs Linux"], ["Tomcat Takeover", "analyse réseau Wireshark"], ["JetBrains", "lab Blue Team"], ["PoisonedCredentials", "lab Blue Team"]]) await ajouter(`<p class="e-check"><i>✓</i><b>${n}</b><span>${d}</span></p>`, "", 300);
        await ajouter('<p class="e-ligne">+ SIEM Wazuh chez moi · badges TryHackMe et Hack The Box</p>', "", 200);
        break;
      case "alternance":
        url.textContent = "sebastien.dev/alternance";
        for (const [k, v] of [["Disponible", "dès maintenant"], ["Durée", "1 à 2 ans"], ["Rythme", "3 semaines en entreprise, 1 à l'école"], ["Diplôme", "RNCP 6 (Bac+3/4) · Zone01 Rouen"], ["Bon à savoir", "RQTH : aides Agefiph possibles"]]) await ajouter(`<p class="e-info"><span>${k}</span><b>${v}</b></p>`, "", 300);
        break;
      case "villes":
        url.textContent = "sebastien.dev/mobilite";
        await ajouter('<p class="e-sous">Beauvoir-en-Lyons (76) · permis B</p>', "", 250);
        { const g = await ajouter("", "e-villes", 0);
          for (const v of ["Rouen", "Beauvais", "Lille", "Paris"]) { g.insertAdjacentHTML("beforeend", `<span><i></i>${v}</span>`); await pause(280); } }
        break;
      case "parcours":
        url.textContent = "sebastien.dev/parcours";
        for (const [d, t, now] of [["2007 – 2018", "Production, sécurité, pizzaïolo"], ["2019 – 2025", "Agent logistique · Leroy Merlin"], ["2025 – 2027", "Zone01 Rouen · RNCP 6"], ["Ensuite", "Votre équipe ?", true]]) await ajouter(`<p class="e-etape ${now ? "now" : ""}"><i></i><span>${d}</span><b>${t}</b></p>`, "", 380);
        break;
      case "github":
        url.textContent = "github.com/sebastien1000";
        await ajouter('<p class="e-titre">sebastien1000</p>', "", 250);
        for (const [n, l] of [["net-cat", "Go"], ["lem-in", "Go"], ["graphQL", "JavaScript"], ["mini-cyber", "Python"]]) await ajouter(`<p class="e-repo"><b>${n}</b><span>${l}</span></p>`, "", 220);
        await ajouter(`<div class="e-actions"><a href="${GITHUB}" target="_blank" rel="noreferrer">Ouvrir mon GitHub ↗</a></div>`);
        break;
      case "linkedin":
        url.textContent = "linkedin.com/in/sebastien-beck-dev-web";
        await ajouter('<p class="e-titre">Sébastien Beck</p><p class="e-sous">Développeur full stack | En recherche d\'alternance</p>', "", 300);
        await ajouter(`<div class="e-actions"><a href="${LINKEDIN}" target="_blank" rel="noreferrer">Ouvrir mon LinkedIn ↗</a></div>`);
        break;
      case "cv": {
        url.textContent = "sebastien.dev/cv.pdf";
        await ajouter('<div class="e-doc"><i class="t"></i><i></i><i></i><i class="c"></i><i></i><i class="c"></i><i></i></div>', "", 500);
        const a = await ajouter(`<div class="e-actions"><a href="${CV}" download>Télécharger mon CV ↓</a></div>`, "", 200);
        const f = document.createElement("form");
        f.className = "e-form";
        f.innerHTML = '<input type="email" required placeholder="votre@adresse.fr" aria-label="Votre adresse e-mail"><button type="submit">Recevoir le CV</button>';
        f.addEventListener("submit", async (e) => {
          e.preventDefault();
          const adr = f.querySelector("input").value.trim();
          const corps = `Bonjour Sébastien,\n\nPouvez-vous m'envoyer votre CV à cette adresse : ${adr}\n\nMerci.`;
          const lien = `mailto:${MAIL}?subject=${encodeURIComponent("Demande de CV depuis votre portfolio")}&body=${encodeURIComponent(corps)}`;
          f.remove();
          parler("Merci ! Votre messagerie s'ouvre avec la demande déjà écrite : appuyez sur Envoyer et je vous réponds avec mon CV.");
          window.location.href = lien;
        });
        a.appendChild(f);
        break; }
      case "contact":
        url.textContent = "sebastien.dev/contact";
        await ajouter(`<p class="e-tel"><span class="sonne">☎</span>${TEL}</p>`, "", 300);
        await ajouter(`<p class="e-sous">${MAIL}</p>`, "", 200);
        await ajouter(`<div class="e-actions"><a href="tel:+33664062775">Appeler</a><a href="mailto:${MAIL}?subject=${encodeURIComponent("Alternance développeur full stack")}">M'écrire</a></div>`);
        break;
    }
    ecran.classList.remove("change");
  }

  function montrerPuces(liste = []) {
    puces.innerHTML = "";
    liste.forEach((p) => {
      const b = document.createElement("button");
      b.type = "button"; b.textContent = p;
      b.addEventListener("click", () => poser(p));
      puces.appendChild(b);
    });
  }

  async function jouer(r) {
    occupe = true;
    montrerPuces();
    perso.classList.add("reflechit");
    await pause(450);
    perso.classList.remove("reflechit");
    const affichage = (async () => { await pause(250); await Promise.all([montrer(), afficher(r.ecran, r)]); })();
    await parler(r.dire);
    await affichage;
    montrerPuces(r.suite || DEPART);
    occupe = false;
  }

  async function poser(texte) {
    if (occupe || !texte.trim()) return;
    question.innerHTML = `<span>Vous</span>${echapper(texte)}`;
    question.classList.add("vu");
    await jouer(trouver(texte));
  }

  function aller(id) {
    fermer();
    const cible = document.getElementById(id);
    if (!cible) return;
    cible.scrollIntoView({ behavior: "smooth", block: "center" });
    cible.classList.add("chat-surbrillance");
    setTimeout(() => cible.classList.remove("chat-surbrillance"), 2400);
  }

  function ouvrir() {
    scene.classList.add("ouvert");
    document.body.classList.add("sc-actif");
    document.querySelectorAll(".mode-btn").forEach((b) => b.classList.toggle("actif", b.dataset.mode === "chat"));
    flottant.hidden = true;
    if (!demarre) {
      demarre = true;
      setTimeout(() => jouer({ dire: "Bonjour ! Je suis Sébastien. Demandez-moi ce que vous voulez voir : je vous le montre sur mon écran.", ecran: "accueil", suite: DEPART }), 400);
    }
  }
  function fermer() {
    scene.classList.remove("ouvert");
    document.body.classList.remove("sc-actif");
    document.querySelectorAll(".mode-btn").forEach((b) => b.classList.toggle("actif", b.dataset.mode === "classique"));
    flottant.hidden = false;
  }

  document.querySelectorAll(".mode-btn").forEach((b) => b.addEventListener("click", () => (b.dataset.mode === "chat" ? ouvrir() : fermer())));
  flottant.addEventListener("click", ouvrir);
  scene.querySelector(".sc-fermer").addEventListener("click", fermer);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && scene.classList.contains("ouvert")) fermer(); });
  form.addEventListener("submit", (e) => { e.preventDefault(); const t = champ.value; champ.value = ""; poser(t); });

  // Clignement des yeux de temps en temps
  

  // Clignement des yeux de temps en temps
  setInterval(() => { if (!calme) { perso.classList.add("cligne"); setTimeout(() => perso.classList.remove("cligne"), 160); } }, 3800);

  // Question à la voix
  const Reco = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (Reco) {
    micro.hidden = false;
    const reco = new Reco();
    reco.lang = "fr-FR";
    reco.interimResults = true;
    let ecoute = false;
    reco.onresult = (e) => {
      const t = [...e.results].map((x) => x[0].transcript).join(" ");
      champ.value = t;
      if (e.results[e.results.length - 1].isFinal) { champ.value = ""; poser(t); }
    };
    reco.onend = () => { ecoute = false; micro.classList.remove("ecoute"); champ.placeholder = "Posez votre question à Sébastien…"; };
    micro.addEventListener("click", () => {
      if (ecoute) { reco.stop(); return; }
      try { reco.start(); ecoute = true; micro.classList.add("ecoute"); champ.placeholder = "Je vous écoute…"; } catch {}
    });
  }

  if (location.hash === "#discuter") ouvrir();
})();
