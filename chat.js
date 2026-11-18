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
    { cle: "planning", nom: "Planning Salon", quoi: "Une appli que j'ai faite pour un vrai salon : les rendez-vous, les fiches clientes, les absences et les prestations.", stack: ["JavaScript", "Supabase", "PostgreSQL", "Vercel"], id: "p-planning", lien: null, badge: "Vrai client" },
    { cle: "graphql", nom: "Tableau de bord GraphQL", quoi: "Je me connecte à l'API de mon école avec un jeton JWT, puis j'affiche mes stats avec des graphiques SVG faits à la main.", stack: ["JavaScript", "GraphQL", "JWT", "SVG"], id: "p-graphql", lien: "https://graph-ql-rho-azure.vercel.app" },
    { cle: "cyberguard", nom: "CyberGuard", quoi: "Il scanne le réseau de la maison, trouve les ports ouverts et explique les risques avec une IA qui tourne sur le PC.", stack: ["Go", "Ollama", "tests unitaires"], id: "p-cyberguard", lien: null },
    { cle: "netcat", nom: "Net-Cat", quoi: "Un serveur de chat recodé en Go, à deux : plusieurs personnes peuvent parler en même temps, dans des salons.", stack: ["Go", "TCP", "goroutines"], id: "p-netcat", lien: "https://github.com/sebastien1000/net-cat" },
    { cle: "lemin", nom: "Lem-in", quoi: "Mon programme cherche les meilleurs chemins pour faire traverser une fourmilière aux fourmis.", stack: ["Go", "graphes"], id: "p-lemin", lien: "https://github.com/sebastien1000/lem-in" },
    { cle: "forteam", nom: "ForTeam", quoi: "Un assistant d'aide avec de l'IA, que je construis en équipe. Il n'est pas encore fini.", stack: ["projet en équipe"], id: "p-forteam", lien: null, badge: "En cours" },
  ];
  const STACK = [["go", "Go"], ["javascript", "JavaScript"], ["react", "React"], ["postgresql", "PostgreSQL"], ["supabase", "Supabase"], ["graphql", "GraphQL"], ["docker", "Docker"], ["linux", "Linux"], ["git", "Git"], ["githubactions", "GitHub Actions"], ["vercel", "Vercel"], ["jsonwebtokens", "JWT"]];
  // Copie « neuve » de chaque démo de projet, prise au chargement, pour la rejouer sur le grand écran
  const DEMOS = {};
  const ANIMS = { planning: [".planning", window.planning], graphql: [".gq", window.graphql], cyberguard: [".scan", window.scan], netcat: [".chat", window.chat], lemin: [".fourmis", window.lemin] };
  for (const [cle, id] of [["planning", "p-planning"], ["graphql", "p-graphql"], ["cyberguard", "p-cyberguard"], ["netcat", "p-netcat"], ["lemin", "p-lemin"]]) {
    const d = document.querySelector(`#${id} .demo`);
    if (d) { const c = d.cloneNode(true); c.querySelectorAll("[id]").forEach((e) => e.removeAttribute("id")); c.querySelector(".legende")?.remove(); DEMOS[cle] = c; }
  }
  const BADGES = [
    { nom: "TryHackMe", quoi: "4 modules réseau", logo: "tryhackme" },
    { nom: "Hack The Box", quoi: "Linux Fundamentals", logo: "hackthebox" },
    { nom: "CyberDefenders", quoi: "4 labs Blue Team", txt: "CD" },
    { nom: "IBM SkillsBuild", quoi: "Emerging Tech, agents IA", txt: "IBM" },
    { nom: "Microsoft Learn", quoi: "GitHub Copilot", txt: "ML" },
    { nom: "DataCamp", quoi: "Introduction to Git", logo: "datacamp" },
  ];
  const logoBadge = (b) => (b.logo ? `<img src="https://cdn.simpleicons.org/${b.logo}" alt="" width="22" height="22">` : `<b>${b.txt}</b>`);
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
    { cles: ["cyber", "sécurité", "securite", "blue team", "wazuh", "siem", "tryhackme", "hack the box"], rep: () => ({
      dire: "Je pousse mon apprentissage en cybersécurité : je suis un parcours Blue Team. Regardez ce que j'ai déjà fait.", ecran: "cyber",
      suite: ["Quelle stack tu utilises ?", "Envoie-moi ton CV"] }) },
    { cles: ["dispo", "disponible", "quand", "commencer", "début", "debut", "rythme", "alternance", "semaine"], rep: () => ({
      dire: "Je suis disponible dès maintenant, pour 1 à 2 ans. Voici les infos de mon alternance.", ecran: "alternance",
      suite: ["Tu es où ?", "Comment te contacter ?"] }) },
    { cles: ["où", "d'ou", "dou", "viens", "carte", "region", "situe", "localisation", "ville", "mobilité", "mobilite", "habite", "rouen", "paris", "lille", "beauvais", "permis", "normandie"], rep: () => ({
      dire: "Je suis de Beauvoir-en-Lyons, en Normandie, entre Rouen et Beauvais. J'ai le permis et une voiture : je peux travailler dans toutes ces villes.", ecran: "villes",
      suite: ["Tu es disponible quand ?", "Comment te contacter ?"] }) },
    { cles: ["diplôme", "diplome", "formation", "zone01", "start01", "études", "etudes", "école", "ecole", "rncp", "avant", "expérience", "experience", "leroy", "parcours", "reconversion"], rep: () => ({
      dire: "Voici mon parcours : 6 ans de logistique chez Leroy Merlin, puis Start01, l'ex-Zone01 Rouen. Et la prochaine étape, c'est peut-être chez vous.", ecran: "parcours",
      suite: ["Montre-moi tes projets", "Tu es disponible quand ?"] }) },
    { cles: ["pourquoi", "motivation", "envie"], rep: () => ({
      dire: "J'aime comprendre comment les choses marchent et régler des problèmes concrets. Le code, c'est exactement ça.", ecran: "accueil",
      suite: ["Montre-moi tes projets", "Comment te contacter ?"] }) },
    { cles: ["présente", "presente", "présentation", "presentation", "qui es", "qui est", "toi", "30 secondes"], rep: () => ({
      dire: "Je suis Sébastien. Après 6 ans de logistique chez Leroy Merlin, je me suis reconverti dans le code, à Start01, l'ex-Zone01 Rouen. Je code en Go et en JavaScript, j'apprends Rust, j'utilise l'IA et j'apprends vite les nouvelles technos. Je cherche une alternance de développeur full stack.",
      ecran: "moi", suite: ["Quelles sont tes qualités ?", "Tu fais quoi en dehors du code ?"] }) },
    { cles: ["qualité", "qualite", "défaut", "defaut", "point fort", "points forts", "point faible", "force", "faiblesse"], rep: () => ({
      dire: "Je suis curieux : j'aime comprendre comment ça marche. Je suis sérieux et fiable. Et je ne lâche pas devant un problème. Mon défaut : mon français écrit n'est pas parfait. Alors je relis, et j'utilise des outils pour corriger.",
      ecran: "qualites", suite: ["Tu fais quoi en dehors du code ?", "Envoie-moi ton CV"] }) },
    { cles: ["loisir", "hobby", "hobbies", "passion", "temps libre", "en dehors", "week-end", "weekend", "mécanique", "mecanique", "voiture", "bricol", "rénovation", "renovation", "électronique", "electronique"], rep: () => ({
      dire: "En dehors du code, je répare des voitures. J'aime aussi la rénovation de maison et l'électronique. Et je m'informe tout le temps sur les nouvelles technos, comme l'IA.",
      ecran: "loisirs", suite: ["Présente-toi en 30 secondes", "Comment te contacter ?"] }) },
    { cles: ["équipe", "equipe", "collègue", "collegue", "collaborer", "collaboration", "binôme", "binome", "groupe"], rep: () => ({
      dire: "Oui. Chez Leroy Merlin, je travaillais tous les jours en équipe et avec les autres services. À Start01, on apprend entre élèves : j'aide les autres et je demande de l'aide quand il le faut. J'ai fait Net-Cat en binôme, et je construis ForTeam en équipe.",
      ecran: "equipe", suite: ["Quelles sont tes qualités ?", "Montre-moi tes projets"] }) },
    { cles: ["git", "commit", "versionner", "versioning", "intégration continue", "integration continue", "ci"], rep: () => ({
      dire: "Oui, j'utilise Git et GitHub sur tous mes projets. J'ai travaillé en binôme sur Net-Cat avec Git. Sur Mini-cyber, j'ai mis en place l'intégration continue avec GitHub Actions : les tests se lancent tout seuls à chaque envoi de code.",
      ecran: "git", suite: ["Tu travailles bien en équipe ?", "Montre-moi tes projets"] }) },
    { cles: ["télétravail", "teletravail", "distance", "remote", "sur place", "présentiel", "presentiel", "hybride"], rep: () => ({
      dire: "Les deux me vont. Au début, je préfère être sur place pour apprendre avec l'équipe. Ensuite, le télétravail me va aussi.",
      ecran: "teletravail", suite: ["Tu es d'où ?", "Tu es disponible quand ?"] }) },
    { cles: ["anglais", "english", "langue", "langues"], rep: () => ({
      dire: "Je lis la documentation en anglais avec l'aide d'outils de traduction. Je travaille dessus : c'est un de mes axes de progression.",
      ecran: "anglais", suite: ["Quelles sont tes qualités ?", "Comment te contacter ?"] }) },
    { cles: ["badge", "certif", "attestation", "mur", "récompense", "recompense"], rep: () => ({
      dire: "Voici mes badges ! Ce sont les formations que j'ai suivies en plus de l'école. Et d'autres arrivent bientôt.",
      ecran: "badges", suite: ["Et la cybersécurité ?", "Envoie-moi ton CV"] }) },
    { cles: ["rqth", "handicap", "aide", "agefiph"], rep: () => ({
      dire: "J'ai la RQTH : mon contrat d'alternance peut ouvrir droit à des aides de l'Agefiph pour l'entreprise.", ecran: "alternance",
      suite: ["Envoie-moi ton CV"] }) },
    { cles: ["github", "code source", "dépôt", "depot"], rep: () => ({
      dire: "Voici mon GitHub. Je vous l'ouvre à l'écran.", ecran: "github",
      suite: ["Montre-moi tes projets", "Envoie-moi ton CV"] }) },
    { cles: ["linkedin"], rep: () => ({
      dire: "Voici mon LinkedIn : vous pouvez m'y envoyer un message directement.", ecran: "linkedin", suite: ["Envoie-moi ton CV"] }) },
    { cles: ["cv", "curriculum", "envoie", "envoyer", "pdf"], rep: () => ({
      dire: "Avec plaisir, le voici ! Scannez le code, partagez-le où vous voulez, ou téléchargez-le.", ecran: "cv",
      suite: ["Comment te contacter ?"] }) },
    { cles: ["appel", "appeler", "téléphone", "telephone", "numéro", "numero", "contact", "joindre", "mail", "entretien", "rencontrer"], rep: () => ({
      dire: "Je serais ravi que vous me contactiez ! Le plus simple, c'est de m'écrire un e-mail : je réponds rapidement. Vous pouvez aussi m'envoyer un message sur LinkedIn, ou m'appeler.", ecran: "contact",
      suite: ["Envoie-moi ton CV"] }) },
    { cles: ["projet", "réalisation", "realisation", "travaux", "portfolio", "montre", "fait", "voir"], rep: () => ({
      dire: "Avec plaisir, je vous montre mes projets ! Le premier est utilisé par un vrai salon. Touchez-en un pour le voir en détail.", ecran: "projets",
      suite: ["Lequel est le plus important ?", "Quelle stack tu utilises ?"] }) },
    { cles: ["merci", "au revoir", "bye", "parfait", "super", "top"], rep: () => ({
      dire: "Merci à vous ! Je serais ravi d'avoir de vos nouvelles : écrivez-moi quand vous voulez, je réponds vite.", ecran: "contact" }) },
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
      const s = it.cles.filter((k) => {
        const m = sansAccents(k);
        // les mots courts (où, cv, go…) doivent être des mots entiers : « vous » ne doit pas déclencher « où »
        return m.length <= 4 ? new RegExp(`(^|[^a-z])${m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z]|$)`).test(t) : t.includes(m);
      }).length;
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
      <div class="sc-titres">
        <p class="sc-titre">Portfolio de développeur <b>full stack</b>, orienté <em>cybersécurité</em></p>
        <span class="sc-statut"><i></i>Sébastien est là, posez-lui une question</span>
      </div>
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
<g class="bras"><path class="manche" d="M92 240 L40 200 L30 214 L80 258 Z"/><circle class="main" cx="35" cy="205" r="11"/></g><g class="feuille"><rect x="196" y="96" width="78" height="100" rx="4" fill="#fff" stroke="#d6dbe0"/><rect x="204" y="104" width="62" height="16" rx="2" fill="#2b2f36"/><circle cx="212" cy="112" r="5" fill="#eab18f"/><rect x="221" y="108" width="36" height="4" rx="2" fill="#fff"/><rect x="221" y="114" width="24" height="3" rx="1.5" fill="#b5562d"/><rect x="204" y="128" width="40" height="4" rx="2" fill="#1f9d7a"/><rect x="204" y="136" width="62" height="3" rx="1.5" fill="#cfd5db"/><rect x="204" y="142" width="56" height="3" rx="1.5" fill="#cfd5db"/><rect x="204" y="152" width="40" height="4" rx="2" fill="#1f9d7a"/><rect x="204" y="160" width="62" height="3" rx="1.5" fill="#cfd5db"/><rect x="204" y="166" width="50" height="3" rx="1.5" fill="#cfd5db"/><rect x="204" y="172" width="58" height="3" rx="1.5" fill="#cfd5db"/><text x="235" y="190" class="cv-t">CV</text><circle class="main" cx="200" cy="170" r="11"/></g><g class="tasse"><g class="vapeur"><path d="M222 236 q-5 -8 0 -16 q5 -8 0 -16"/><path d="M234 236 q-5 -8 0 -16 q5 -8 0 -16"/></g><path class="anse" d="M246 248 q12 0 12 11 q0 11 -12 11"/><rect class="mug" x="214" y="240" width="34" height="38" rx="6"/><rect x="214" y="248" width="34" height="5" fill="#1f9d7a"/><circle class="main" cx="212" cy="262" r="11"/></g><g class="etoiles"><path d="M70 70 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 Z"/><path d="M228 52 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 Z"/><path d="M246 112 l2.5 6 l6 2.5 l-6 2.5 l-2.5 6 l-2.5 -6 l-6 -2.5 l6 -2.5 Z"/></g><g transform="translate(240 70)"><g class="cle"><path d="M0 46 L0 10"/><path d="M-9 -2 A12 12 0 1 0 9 -2"/></g></g><g class="zzz"><text x="200" y="70">z</text><text x="214" y="52">z</text><text x="230" y="34">Z</text></g><g class="glyphes"><text x="110" y="214">&lt;/&gt;</text><text x="150" y="208">{ }</text><text x="190" y="214">go</text><text x="132" y="204">fn()</text><text x="172" y="202">;</text></g><g class="portable"><path class="clavier" d="M54 300 L246 300 L230 284 L70 284 Z"/><g class="pc-pivot"><g class="dos"><rect class="capot" x="74" y="222" width="152" height="64" rx="9"/><rect class="sb" x="137" y="241" width="26" height="26" rx="7"/><text x="150" y="258">SB</text></g><g class="face"><rect x="74" y="222" width="152" height="64" rx="9" fill="#2a3540"/><rect x="80" y="227" width="140" height="54" rx="5" fill="#0b1117"/><text class="pc-titre" x="150" y="244">projets</text><rect x="88" y="252" width="60" height="4" rx="2" fill="#5fd3b0"/><rect x="88" y="260" width="96" height="4" rx="2" fill="#3a4a5a"/><rect x="88" y="268" width="78" height="4" rx="2" fill="#3a4a5a"/><rect class="pc-curseur" x="170" y="267" width="5" height="7" fill="#5fd3b0"/></g></g></g><g class="mains-clavier"><circle class="main m1" cx="116" cy="288" r="10"/><circle class="main m2" cx="184" cy="288" r="10"/></g></svg>
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
  // Fond animé discret, derrière l'écran et le personnage
  {
    const fond = document.createElement("div");
    fond.className = "sc-fond";
    fond.setAttribute("aria-hidden", "true");
    fond.innerHTML = '<i class="lueur l1"></i><i class="lueur l2"></i>';
    for (let i = 0; i < 18; i++) {
      const p = document.createElement("i");
      p.className = "poussiere";
      p.style.left = Math.random() * 100 + "%";
      p.style.setProperty("--t", 2 + Math.random() * 3 + "px");
      p.style.setProperty("--d", 18 + Math.random() * 16 + "s");
      p.style.setProperty("--r", -Math.random() * 30 + "s");
      p.style.setProperty("--x", (Math.random() * 2 - 1) * 60 + "px");
      p.style.setProperty("--o", 0.12 + Math.random() * 0.2);
      fond.appendChild(p);
    }
    scene.prepend(fond);
  }

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
    const ajouter = async (html, cls = "", delai = 160, q = null) => {
      const d = document.createElement("div");
      d.className = `sc-el ${cls}`;
      d.innerHTML = html;
      if (q) {
        // ligne cliquable : elle pose la question au personnage
        d.classList.add("e-clic");
        d.tabIndex = 0;
        d.setAttribute("role", "button");
        d.title = q;
        const go = () => poser(q);
        d.addEventListener("click", go);
        d.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
      }
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
        for (const q of ["Présente-toi", "Mes projets", "Ma stack", "Mes qualités", "Mes badges", "Le travail en équipe", "Git", "Le télétravail", "L'anglais", "Mes loisirs", "La cybersécurité", "Mes disponibilités", "Mon parcours", "Mon CV", "Mon GitHub", "Me contacter"]) await ajouter(`<p class="e-ligne">→ ${q}</p>`, "", 110, q);
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
        await ajouter(`${p.badge ? `<span class="e-badge">${p.badge}</span>` : ""}<p class="e-titre">${p.nom}</p>`, "", 200);
        const modele = DEMOS[p.cle];
        if (modele && ANIMS[p.cle]) {
          const z = await ajouter("", "e-demo", 0);
          const d = modele.cloneNode(true);
          z.appendChild(d);
          const [sel, fn] = ANIMS[p.cle];
          if (typeof fn === "function") setTimeout(() => fn(d.querySelector(sel)), 300);
          await pause(400);
        }
        await ajouter(`<p class="e-texte">${p.quoi}</p>`, "", 200);
        const t = await ajouter("", "e-tags", 0);
        for (const x of p.stack) { t.insertAdjacentHTML("beforeend", `<span>${echapper(x)}</span>`); await pause(120); }
        const a = await ajouter("", "e-actions", 0);
        if (p.lien) a.insertAdjacentHTML("beforeend", `<a href="${p.lien}" target="_blank" rel="noreferrer">Code ou démo ↗</a>`);
        const voir = document.createElement("button"); voir.type = "button"; voir.textContent = "Voir dans le portfolio"; voir.addEventListener("click", () => aller(p.id)); a.appendChild(voir);
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
        for (const [k, v, q] of [["Disponible", "dès maintenant"], ["Durée", "1 à 2 ans"], ["Rythme", "3 semaines en entreprise, 1 à l'école"], ["Diplôme", "RNCP 6 (Bac+3/4) · Start01 (ex-Zone01 Rouen)", "Ton parcours"], ["Bon à savoir", "RQTH : aides Agefiph possibles", "La RQTH, c'est quoi ?"]]) await ajouter(`<p class="e-info"><span>${k}</span><b>${v}</b></p>`, "", 300, q);
        break;
      case "villes": {
        url.textContent = "sebastien.dev/ou-je-suis";
        await ajouter('<p class="e-sous">Beauvoir-en-Lyons (76), en Normandie · permis B et véhiculé</p>', "", 200);
        const z = await ajouter(`<svg class="e-carte-fr" viewBox="0 0 400 260">
          <rect width="400" height="260" class="terre"/>
          <path class="mer" d="M0,0 L0.0,175.4 L12.2,169.3 L22.2,147.8 L72.2,130.5 L120.0,124.4 L155.6,110.1 L175.6,98.9 L173.3,76.5 L177.8,42.8 L175.6,28.5 L205.6,20.4 L263.3,12.2 L283.3,5.1 L284.4,0.0 L400,0 Z"/>
          <text class="mer-t" x="40" y="40">Manche</text>
          <polyline class="fleuve" points="16.7,175.4 61.1,171.3 88.9,178.4 122.2,174.4 138.9,188.6 172.2,198.8 194.4,214.1 227.8,224.3 261.1,233.5"/>
          <g class="liens"></g><g class="pins"></g>
          <g class="maison"><circle class="onde" cx="178.6" cy="168.9" r="10"/><circle cx="178.6" cy="168.9" r="7"/><text x="178.6" y="190.9">Chez moi</text></g>
        </svg>`, "e-carte-z", 400);
        const svg = z.querySelector("svg"), liens = svg.querySelector(".liens"), pins = svg.querySelector(".pins");
        for (const [nom, x, y, d] of [["Rouen",122.1,174.0,37],["Beauvais",231.2,175.3,35],["Paris",261.3,233.8,89],["Lille",339.7,53.1,163]]) {
          const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
          l.setAttribute("x1", 178.6); l.setAttribute("y1", 168.9); l.setAttribute("x2", x); l.setAttribute("y2", y);
          liens.appendChild(l);
          pins.insertAdjacentHTML("beforeend", `<g class="pin" style="--x:${x}px;--y:${y}px"><path d="M${x} ${y} c-7 -10 -10 -14 -10 -19 a10 10 0 0 1 20 0 c0 5 -3 9 -10 19 z"/><circle cx="${x}" cy="${y - 19}" r="3.5"/><text x="${x}" y="${y - 34}">${nom}</text><text class="km" x="${x}" y="${y + 14}">≈ ${d} km</text></g>`);
          await pause(420);
        }
        await ajouter('<p class="e-ligne">Distances à vol d\'oiseau depuis chez moi.</p>', "", 0);
        break; }
      case "parcours":
        url.textContent = "sebastien.dev/parcours";
        for (const [d, t, now] of [["2007 – 2018", "Production, sécurité, pizzaïolo"], ["2019 – 2025", "Agent logistique · Leroy Merlin"], ["2025 – 2027", "Start01 (ex-Zone01) · RNCP 6"], ["Ensuite", "Votre équipe ?", true]]) await ajouter(`<p class="e-etape ${now ? "now" : ""}"><i></i><span>${d}</span><b>${t}</b></p>`, "", 380, now ? "Comment te contacter ?" : null);
        break;
      case "moi":
        url.textContent = "sebastien.dev/moi";
        await ajouter('<p class="e-titre">Sébastien Beck</p><p class="e-sous">Développeur full stack · en recherche d\'alternance</p>', "", 300);
        for (const [k, v, q] of [["Avant", "6 ans de logistique · Leroy Merlin", "Ton parcours"], ["Aujourd'hui", "1re année · Start01 (ex-Zone01 Rouen)", "Ton parcours"], ["Je code en", "Go · JavaScript · j'apprends Rust", "Quelle stack tu utilises ?"], ["Avec", "l'IA comme outil de travail"], ["En plus", "cybersécurité Blue Team", "Et la cybersécurité ?"]]) await ajouter(`<p class="e-info"><span>${k}</span><b>${v}</b></p>`, "", 320, q);
        break;
      case "qualites":
        url.textContent = "sebastien.dev/qualites";
        await ajouter('<p class="e-sous">Mes qualités</p>', "", 200);
        for (const [n, d, q] of [["Curieux", "j'aime comprendre comment ça marche"], ["Sérieux et fiable", "6 ans chez Leroy Merlin", "Ton parcours"], ["Je ne lâche pas", "devant un problème"]]) await ajouter(`<p class="e-check"><i>✓</i><b>${n}</b><span>${d}</span></p>`, "", 340, q);
        await ajouter('<p class="e-sous e-defaut">Mon défaut</p>', "", 200);
        await ajouter('<p class="e-info"><span>Français écrit</span><b>je relis et j\'utilise des outils pour corriger</b></p>', "", 0);
        break;
      case "equipe":
        url.textContent = "sebastien.dev/equipe";
        await ajouter('<p class="e-sous">Le travail en équipe</p>', "", 200);
        for (const [n, d, q] of [["Leroy Merlin", "en équipe et avec les autres services", "Ton parcours"], ["Start01", "on apprend entre élèves", "Ton parcours"], ["Net-Cat", "projet en binôme", "Net-Cat"], ["ForTeam", "projet en équipe, en cours", "ForTeam"]]) await ajouter(`<p class="e-check"><i>✓</i><b>${n}</b><span>${d}</span></p>`, "", 340, q);
        break;
      case "git":
        url.textContent = "sebastien.dev/git";
        await ajouter('<p class="e-sous">Git et GitHub</p>', "", 200);
        for (const [n, d, q] of [["Tous mes projets", "suivis avec Git et GitHub", "Montre-moi tes projets"], ["Net-Cat", "Git à deux, en binôme", "Net-Cat"], ["Mini-cyber", "GitHub Actions : tests automatiques"], ["DataCamp", "Introduction to Git"]]) await ajouter(`<p class="e-check"><i>✓</i><b>${n}</b><span>${d}</span></p>`, "", 340, q);
        await ajouter(`<div class="e-actions"><a href="${GITHUB}" target="_blank" rel="noreferrer">Voir mon GitHub ↗</a></div>`, "", 0);
        break;
      case "teletravail":
        url.textContent = "sebastien.dev/teletravail";
        await ajouter('<p class="e-sous">Sur place ou à distance</p>', "", 200);
        for (const [k, v, q] of [["Au début", "sur place, pour apprendre avec l'équipe"], ["Ensuite", "le télétravail me va aussi"], ["Mobilité", "permis B et véhiculé", "Tu es d'où ?"]]) await ajouter(`<p class="e-info"><span>${k}</span><b>${v}</b></p>`, "", 320, q);
        break;
      case "anglais":
        url.textContent = "sebastien.dev/anglais";
        await ajouter('<p class="e-sous">Mon anglais</p>', "", 200);
        for (const [k, v] of [["Documentation", "je la lis avec des outils de traduction"], ["Progression", "j'y travaille, c'est un de mes axes"]]) await ajouter(`<p class="e-info"><span>${k}</span><b>${v}</b></p>`, "", 320);
        break;
      case "badges": {
        url.textContent = "sebastien.dev/badges";
        await ajouter('<p class="e-sous">Mes badges</p>', "", 150);
        const g = await ajouter("", "e-mur-g", 0);
        for (const b of BADGES) {
          g.insertAdjacentHTML("beforeend", `<div class="e-badge-c"><span class="e-badge-l">${logoBadge(b)}</span><b>${b.nom}</b><span>${b.quoi}</span></div>`);
          await pause(200);
        }
        g.insertAdjacentHTML("beforeend", '<div class="e-badge-c bientot"><span class="e-badge-l">+</span><b>D\'autres à venir</b><span>bientôt</span></div>');
        break; }
      case "loisirs":
        url.textContent = "sebastien.dev/loisirs";
        await ajouter('<p class="e-sous">En dehors du code</p>', "", 200);
        for (const [n, d, q] of [["Mécanique", "je répare des voitures"], ["Rénovation", "de maison"], ["Électronique", "comprendre et bricoler"], ["Nouvelles technos", "je m'informe sur l'IA", "Quelle stack tu utilises ?"]]) await ajouter(`<p class="e-check"><i>✓</i><b>${n}</b><span>${d}</span></p>`, "", 340, q);
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
        const lienCv = new URL(CV, location.href).href;
        await ajouter(`<div class="e-cv-haut"><div class="e-doc"><i class="t"></i><i></i><i></i><i class="c"></i><i></i><i class="c"></i><i></i></div>
          <div class="e-qr"><img src="qr-cv.svg" alt="QR code vers mon CV" width="120" height="120"><span>Scannez : le CV s'ouvre sur votre téléphone</span></div></div>`, "", 500);
        const a = await ajouter('<div class="e-partage"></div>', "", 0);
        const bouton = (texte, action, principal = false) => {
          const b = document.createElement("button");
          b.type = "button"; b.textContent = texte;
          if (principal) b.className = "principal";
          b.addEventListener("click", action);
          a.firstChild.appendChild(b);
          return b;
        };
        bouton("Voir le CV", () => window.open(CV, "_blank", "noopener"), true);
        bouton("Télécharger ↓", () => { const l = document.createElement("a"); l.href = CV; l.download = "CV_Sebastien_Beck.pdf"; l.click(); });
        bouton("Partager", async () => {
          try {
            if (navigator.canShare) {
              const f = new File([await (await fetch(CV)).blob()], "CV_Sebastien_Beck.pdf", { type: "application/pdf" });
              if (navigator.canShare({ files: [f] })) { await navigator.share({ files: [f], title: "CV de Sébastien Beck" }); return; }
            }
            if (navigator.share) { await navigator.share({ title: "CV de Sébastien Beck", url: lienCv }); return; }
            await navigator.clipboard.writeText(lienCv); parler("Le lien de mon CV est copié, vous pouvez le coller où vous voulez.");
          } catch (e) { if (e.name !== "AbortError") parler("Le partage n'est pas possible ici, mais vous pouvez télécharger mon CV."); }
        });
        bouton("Copier le lien", async () => {
          try { await navigator.clipboard.writeText(lienCv); parler("C'est copié ! Le lien de mon CV est dans votre presse-papiers."); }
          catch { parler(`Voici le lien : ${lienCv}`); }
        });
        bouton("Par LinkedIn", () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(lienCv)}`, "_blank", "noopener"));
        bouton("Par WhatsApp", () => window.open(`https://wa.me/?text=${encodeURIComponent("CV de Sébastien Beck, développeur full stack en recherche d'alternance : " + lienCv)}`, "_blank", "noopener"));
        const f = document.createElement("form");
        f.className = "e-form";
        f.innerHTML = '<input type="email" required placeholder="Ou recevez-le : votre@adresse.fr" aria-label="Votre adresse e-mail"><button type="submit">Recevoir</button>';
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
        await ajouter(`<p class="e-tel"><span class="sonne">✉</span>E-mail</p>`, "", 300);
        await ajouter(`<p class="e-mail">${MAIL}</p>`, "", 200);
        await ajouter(`<div class="e-actions"><a href="mailto:${MAIL}?subject=${encodeURIComponent("Alternance développeur full stack")}">M'écrire un e-mail</a><a href="${LINKEDIN}" target="_blank" rel="noreferrer">Me contacter sur LinkedIn ↗</a><a href="tel:+33664062775">M'appeler · ${TEL}</a></div>`);
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

  // Il tourne son ordinateur vers vous pour montrer son écran
  const titrePc = perso.querySelector(".pc-titre");
  async function tournerPc(titre) {
    titrePc.textContent = titre;
    perso.classList.add("pivote");
    await pause(260);
    perso.classList.add("pc-face");
    perso.classList.remove("pivote");
  }
  async function retournerPc() {
    if (!perso.classList.contains("pc-face")) return;
    perso.classList.add("pivote");
    await pause(260);
    perso.classList.remove("pc-face", "pivote");
  }
  // Il boit son café quand personne ne lui parle
  let derniereAction = Date.now();
  async function boire() {
    if (occupe || calme || perso.classList.contains("cv")) return;
    perso.classList.remove("code");
    perso.classList.add("boit");
    await pause(1600);
    perso.classList.remove("boit");
  }
  setInterval(() => { if (Date.now() - derniereAction > 7000) boire(); }, 9000);

  // ---------- Petites animations « fun » ----------
  const sceneEl = scene;
  function confettis() {
    if (calme) return;
    const zone = sceneEl.querySelector(".sc-perso-zone");
    const couleurs = ["#5fd3b0", "#1f9d7a", "#ffffff", "#e3a33b", "#f08d7c"];
    for (let i = 0; i < 36; i++) {
      const c = document.createElement("i");
      c.className = "confetti";
      c.style.left = 30 + Math.random() * 40 + "%";
      c.style.background = couleurs[i % couleurs.length];
      c.style.setProperty("--dx", (Math.random() * 2 - 1) * 160 + "px");
      c.style.setProperty("--dy", -(80 + Math.random() * 160) + "px");
      c.style.setProperty("--r", Math.random() * 720 + "deg");
      c.style.animationDelay = Math.random() * 120 + "ms";
      zone.appendChild(c);
      setTimeout(() => c.remove(), 1800);
    }
  }
  async function tada() { perso.classList.add("tada"); await pause(1100); perso.classList.remove("tada"); }
  async function bricoler() { perso.classList.add("bricole"); await pause(2200); perso.classList.remove("bricole"); }
  async function saluer() { perso.classList.add("salue"); await pause(1600); perso.classList.remove("salue"); }
  // En attendant une question : il code. Après une longue attente, il pique un petit somme.
  setInterval(() => {
    const attente = Date.now() - derniereAction;
    const libre = !occupe && !perso.classList.contains("cv") && !perso.classList.contains("boit");
    perso.classList.toggle("code", libre && attente > 3000 && attente < 60000);
    perso.classList.toggle("dort", libre && attente >= 60000);
  }, 1000);

  const ECRAN_PC = { badges: "mes badges", moi: "à propos", git: "git log", projets: "mes projets", projet: "démo", stack: "ma stack", github: "github", cyber: "blue team", parcours: "parcours" };

  async function jouer(r) {
    occupe = true;
    derniereAction = Date.now();
    montrerPuces();
    perso.classList.remove("cv");
    await retournerPc();
    perso.classList.add("reflechit");
    await pause(450);
    perso.classList.remove("reflechit");
    perso.classList.remove("dort", "code");
    if (r.ecran === "cv") { perso.classList.add("cv"); setTimeout(confettis, 700); setTimeout(() => perso.classList.remove("cv"), 7000); }
    else if (r.ecran === "accueil" || r.ecran === "moi" || r.ecran === "equipe") saluer();
    else if (r.ecran === "qualites") setTimeout(tada, 300);
    else if (r.ecran === "loisirs") bricoler();
    else if (r.ecran === "projets" || r.ecran === "projet") setTimeout(tada, 300);
    if (ECRAN_PC[r.ecran]) tournerPc(r.projet ? r.projet.nom.split(" ")[0].toLowerCase() : ECRAN_PC[r.ecran]);
    const affichage = (async () => { await pause(250); await Promise.all([montrer(), afficher(r.ecran, r)]); })();
    await parler(r.dire);
    await affichage;
    montrerPuces(r.suite || DEPART);
    derniereAction = Date.now();
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

  // La discussion s'ouvre dès l'arrivée ; si le visiteur choisit la vue classique, on s'en souvient pendant sa visite
  const retenir = (v) => { try { sessionStorage.setItem("sb-vue", v); } catch {} };
  const vueChoisie = () => { try { return sessionStorage.getItem("sb-vue"); } catch { return null; } };
  function ouvrir() {
    retenir("chat");
    scene.classList.add("ouvert");
    document.body.classList.add("sc-actif");
    document.querySelectorAll(".mode-btn").forEach((b) => b.classList.toggle("actif", b.dataset.mode === "chat"));
    flottant.hidden = true;
    if (!demarre) {
      demarre = true;
      setTimeout(() => jouer({ dire: "Bonjour et bienvenue sur mon portfolio interactif ! Je suis Sébastien. Posez-moi vos questions : je vais essayer d'y répondre, ou de vous montrer sur mon écran.", ecran: "accueil", suite: DEPART }), 400);
    }
  }
  function fermer() {
    retenir("classique");
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

  // On ouvre la discussion, sauf si le lien vise une section précise (#contact…) ou si le visiteur a choisi la vue classique
  if (location.hash === "#discuter" || (!location.hash && vueChoisie() !== "classique")) ouvrir();
})();
