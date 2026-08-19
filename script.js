const tags = ["Go", "Linux", "Git", "TCP", "BFS", "Algorithmie", "Backend"];

const projects = [
  {
    id: "lem-in",
    title: "Lem-in",
    stack: ["Go", "BFS", "Graphes", "Algorithmie"],
    accent: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(217,70,239,0.1), rgba(34,211,238,0.2))",
    demo: "lem",
    github: "https://github.com/sebastien1000/lem-in",
    icon: "network",
  },
  {
    id: "net-cat",
    title: "Net-Cat",
    stack: ["Go", "TCP", "Goroutines", "Concurrence"],
    accent: "linear-gradient(135deg, rgba(34,211,238,0.2), rgba(14,165,233,0.1), rgba(168,85,247,0.2))",
    demo: "chat",
    github: "https://github.com/sebastien1000/net-cat",
    icon: "terminal",
  },
  {
    id: "zone01-go",
    title: "Exercices Go / Zone01",
    stack: ["Go", "Fonctions", "Slices", "Structs"],
    accent: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(20,184,166,0.1), rgba(34,211,238,0.2))",
    demo: "code",
    github: "https://github.com/sebastien1000",
    icon: "code",
  },
  {
    id: "forum",
    title: "Forum",
    stack: ["Go", "SQLite", "Auth", "Web"],
    accent: "linear-gradient(135deg, rgba(251,191,36,0.2), rgba(249,115,22,0.1), rgba(34,211,238,0.2))",
    demo: "forum",
    github: "https://github.com/sebastien1000/forum",
    icon: "message",
  },
  {
    id: "graphql-zone01",
    title: "GraphQL Zone01",
    stack: ["JavaScript", "GraphQL", "JWT", "SVG"],
    accent: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(56,189,248,0.1), rgba(168,85,247,0.2))",
    demo: "graphql",
    github: "https://github.com/sebastien1000/graphQL",
    icon: "chart",
  },
  {
    id: "planning-salon",
    title: "Planning Salon",
    stack: ["JavaScript", "Supabase", "Auth", "Planning"],
    accent: "linear-gradient(135deg, rgba(244,63,94,0.2), rgba(236,72,153,0.1), rgba(168,85,247,0.2))",
    demo: "planning",
    github: "https://github.com/sebastien1000/planing-salon",
    icon: "calendar",
  },
  {
    id: "make-your-game",
    title: "Make Your Game",
    stack: ["JavaScript", "DOM", "Jeu vidéo", "Physique 2D"],
    accent: "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(59,130,246,0.1), rgba(168,85,247,0.2))",
    demo: "platformer",
    github: "https://zone01normandie.org/git/anbitho/make-your-game",
    icon: "game",
  },
];

const copy = {
  fr: {
    portfolio: "Portfolio développeur",
    name: "Sébastien Beck - Alternance Développeur Web / Backend",
    cv: "Voir mon CV",
    heroBadge: "Des projets montrés en animation pour être compris en un coup d'oeil",
    heroTitleStart: "Je transforme mes projets en",
    heroTitleHighlight: "démonstrations visuelles",
    heroText:
      "Je suis en formation développement et je recherche une alternance en développement web / backend. Ici, les recruteurs ne voient pas seulement du code : ils voient ce que mes projets font réellement.",
    stats: [
      ["7", "projets présentés"],
      ["100%", "démonstration visuelle"],
      ["Go", "langage principal"],
    ],
    projectsEyebrow: "Mes projets",
    projectsTitle: "Des projets expliqués simplement",
    projectsText:
      "Chaque carte contient une animation, une explication claire et les compétences visibles pour qu'un recruteur comprenne vite la valeur du projet.",
    viewCode: "Voir le code",
    infoCards: [
      {
        title: "Ce que je cherche",
        text: "Une alternance en développement web ou backend pour continuer à progresser, travailler en équipe et participer à des projets concrets.",
      },
      {
        title: "Ma façon de travailler",
        text: "J'aime comprendre comment les choses fonctionnent, corriger mes erreurs, recommencer et améliorer étape par étape.",
      },
      {
        title: "Pourquoi ce portfolio",
        text: "Parce que tout le monde ne lit pas du code. Ici, mes projets sont visibles et compréhensibles même sans bagage technique.",
      },
    ],
    githubTitle: "Tous mes projets GitHub",
    githubText:
      "Mes dépôts publics regroupent mes exercices, mes projets Go et mon travail d'apprentissage au fil de la formation.",
    viewGithub: "Voir mon GitHub",
    contactTitle: "Intéressé par mon profil ?",
    contactText:
      "Je recherche une alternance où je peux apprendre, coder et apporter de la valeur avec sérieux, motivation et logique. Mes coordonnées sont disponibles dans mon CV.",
    projects: {
      "lem-in": {
        subtitle: "Visualisation d'un graphe et déplacement des fourmis",
        summary:
          "Projet d'algorithmie où des fourmis doivent aller de Start à End en utilisant les meilleurs chemins possibles.",
        points: [
          "Construction d'un graphe en mémoire",
          "Recherche de chemins avec BFS",
          "Gestion des déplacements de plusieurs fourmis",
          "Respect des règles de circulation entre rooms",
        ],
      },
      "net-cat": {
        subtitle: "Simulation d'un serveur de chat réseau",
        summary:
          "Serveur de chat en ligne de commande avec plusieurs utilisateurs connectés en même temps.",
        points: [
          "Gestion des connexions clients",
          "Diffusion des messages à plusieurs utilisateurs",
          "Utilisation des goroutines",
          "Organisation d'un serveur réseau simple",
        ],
      },
      "zone01-go": {
        subtitle: "Bases solides en logique et code propre",
        summary:
          "Série d'exercices pour apprendre les bases, la logique, les structures de données et les bonnes habitudes de développement.",
        points: [
          "Fonctions et retours multiples",
          "Manipulation de slices et strings",
          "Structures et organisation du code",
          "Habitude de correction et debug",
        ],
      },
      forum: {
        subtitle: "Plateforme de discussion avec posts et commentaires",
        summary:
          "Projet web de forum avec gestion des utilisateurs, publications, commentaires et navigation entre les sujets.",
        points: [
          "Authentification et gestion de session",
          "Création de posts et commentaires",
          "Organisation des catégories et discussions",
          "Interface simple pour lire et publier",
        ],
      },
      "graphql-zone01": {
        subtitle: "Authentification JWT et statistiques via l'API GraphQL",
        summary:
          "Application front-end qui se connecte à l'intra Zone01, récupère un token JWT et affiche un tableau de bord personnel avec des statistiques et des graphiques SVG faits main.",
        points: [
          "Connexion sécurisée et stockage du token JWT",
          "Requêtes GraphQL vers l'API Zone01",
          "Graphiques SVG sans bibliothèque externe",
          "Mini explorateur GraphiQL pour tester des requêtes",
        ],
      },
      "planning-salon": {
        subtitle: "Gestion de planning et clientes pour un salon",
        summary:
          "Application web pour gérer le planning d'un salon: rendez-vous, fiches clientes, congés et prestations, avec authentification et base de données réelles via Supabase.",
        points: [
          "Planning des rendez-vous par collaboratrice",
          "Authentification sécurisée avec Supabase Auth",
          "Fiches clientes et recherche de rendez-vous",
          "Gestion des congés et du catalogue de prestations",
        ],
      },
      "make-your-game": {
        subtitle: "Jeu de plateforme jouable au clavier",
        summary:
          "Jeu de plateforme codé en JavaScript pur, sans Canvas: le personnage se déplace avec les flèches du clavier et saute de plateforme en plateforme directement dans le DOM.",
        points: [
          "Déplacement du personnage avec les flèches gauche/droite",
          "Gestion des sauts et de la gravité",
          "Détection des collisions avec les plateformes",
          "Rendu du jeu en JavaScript et CSS, sans Canvas",
        ],
      },
    },
  },
  en: {
    portfolio: "Developer portfolio",
    name: "Sébastien Beck - Web / Backend Developer Apprenticeship",
    cv: "View my resume",
    heroBadge: "Animated projects that can be understood at a glance",
    heroTitleStart: "I turn my projects into",
    heroTitleHighlight: "visual demonstrations",
    heroText:
      "I am studying software development and looking for a web / backend apprenticeship. Here, recruiters do not only see code: they see what my projects actually do.",
    stats: [
      ["7", "featured projects"],
      ["100%", "visual demonstration"],
      ["Go", "main language"],
    ],
    projectsEyebrow: "My projects",
    projectsTitle: "Projects explained simply",
    projectsText:
      "Each card includes an animation, a clear explanation and visible skills so a recruiter can quickly understand the value of the project.",
    viewCode: "View code",
    infoCards: [
      {
        title: "What I am looking for",
        text: "A web or backend apprenticeship to keep improving, work in a team and contribute to real projects.",
      },
      {
        title: "How I work",
        text: "I like understanding how things work, fixing my mistakes, trying again and improving step by step.",
      },
      {
        title: "Why this portfolio",
        text: "Not everyone reads code. Here, my projects are visible and understandable even without a technical background.",
      },
    ],
    githubTitle: "All my GitHub projects",
    githubText:
      "My public repositories include my exercises, Go projects and learning work throughout the training.",
    viewGithub: "View my GitHub",
    contactTitle: "Interested in my profile?",
    contactText:
      "I am looking for an apprenticeship where I can learn, code and bring value with seriousness, motivation and logic. My contact details are available in my resume.",
    projects: {
      "lem-in": {
        subtitle: "Graph visualization and ant movement",
        summary:
          "Algorithm project where ants must go from Start to End using the best possible paths.",
        points: [
          "In-memory graph construction",
          "Path search with BFS",
          "Step-by-step movement management for several ants",
          "Traffic rules between rooms",
        ],
      },
      "net-cat": {
        subtitle: "Network chat server simulation",
        summary:
          "Command-line chat server with several users connected at the same time.",
        points: [
          "Client connection management",
          "Message broadcasting to several users",
          "Use of goroutines",
          "Simple network server organization",
        ],
      },
      "zone01-go": {
        subtitle: "Strong foundations in logic and clean code",
        summary:
          "A series of exercises to learn fundamentals, logic, data structures and good development habits.",
        points: [
          "Functions and multiple returns",
          "Slices and strings manipulation",
          "Structs and code organization",
          "Debugging and correction habits",
        ],
      },
      forum: {
        subtitle: "Discussion platform with posts and comments",
        summary:
          "A web forum project with user management, posts, comments and topic navigation.",
        points: [
          "Authentication and session handling",
          "Post and comment creation",
          "Category and discussion organization",
          "Simple reading and publishing interface",
        ],
      },
      "graphql-zone01": {
        subtitle: "JWT authentication and stats through the GraphQL API",
        summary:
          "Front-end app that signs into the Zone01 intranet, retrieves a JWT token and displays a personal dashboard with statistics and hand-built SVG charts.",
        points: [
          "Secure login and JWT token storage",
          "GraphQL queries against the Zone01 API",
          "SVG charts with no external library",
          "Mini GraphiQL explorer to test queries",
        ],
      },
      "planning-salon": {
        subtitle: "Scheduling and client management for a salon",
        summary:
          "Web app to manage a salon's schedule: appointments, client records, time off and services, with real authentication and a database powered by Supabase.",
        points: [
          "Appointment planning per team member",
          "Secure authentication with Supabase Auth",
          "Client records and appointment search",
          "Time-off management and service catalog",
        ],
      },
      "make-your-game": {
        subtitle: "A platformer game playable with the keyboard",
        summary:
          "Platformer game built in plain JavaScript, without Canvas: the character moves with the arrow keys and jumps from platform to platform directly in the DOM.",
        points: [
          "Character movement with the left/right arrow keys",
          "Jump and gravity handling",
          "Collision detection with platforms",
          "Game rendered with JavaScript and CSS, no Canvas",
        ],
      },
    },
  },
};

const state = {
  language: "fr",
  selectedId: "lem-in",
};

const el = {
  portfolioLabel: document.querySelector("#portfolio-label"),
  siteName: document.querySelector("#site-name"),
  cvTopLabel: document.querySelector("#cv-top-label"),
  heroBadge: document.querySelector("#hero-badge"),
  heroTitleStart: document.querySelector("#hero-title-start"),
  heroTitleHighlight: document.querySelector("#hero-title-highlight"),
  heroText: document.querySelector("#hero-text"),
  tagList: document.querySelector("#tag-list"),
  statsGrid: document.querySelector("#stats-grid"),
  heroVisual: document.querySelector("#hero-visual"),
  projectsEyebrow: document.querySelector("#projects-eyebrow"),
  projectsTitle: document.querySelector("#projects-title"),
  projectsText: document.querySelector("#projects-text"),
  projectList: document.querySelector("#project-list"),
  projectDemo: document.querySelector("#project-demo"),
  detailTitle: document.querySelector("#detail-title"),
  detailSummary: document.querySelector("#detail-summary"),
  detailCodeLabel: document.querySelector("#detail-code-label"),
  detailCodeLink: document.querySelector("#detail-code-link"),
  detailPoints: document.querySelector("#detail-points"),
  infoGrid: document.querySelector("#info-grid"),
  githubTitle: document.querySelector("#github-title"),
  githubText: document.querySelector("#github-text"),
  githubButtonLabel: document.querySelector("#github-button-label"),
  githubLinks: document.querySelector("#github-links"),
  contactTitle: document.querySelector("#contact-title"),
  contactText: document.querySelector("#contact-text"),
  contactCvLabel: document.querySelector("#contact-cv-label"),
  langButtons: Array.from(document.querySelectorAll(".lang-btn")),
};

function iconSvg(type) {
  if (type === "network") {
    return '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M5 5h4v4H5zm10 0h4v4h-4zM5 15h4v4H5zm10 0h4v4h-4zM9 7h6v2H9zm-1 2h2v6H8zm6 0h2v6h-2zm-5 6h6v2H9z"/></svg>';
  }
  if (type === "terminal") {
    return '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M4 5h16v14H4zm2 2v10h12V7zm1.5 2.5L10 12l-2.5 2.5L6 13l1.5-1.5L6 10l1.5-1.5zm4.5 5h5v2h-5z"/></svg>';
  }
  if (type === "message") {
    return '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M4 4h16v11H7l-3 3zm2 2v7.17L6.17 13H18V6zm2 2h8v2H8zm0 3h5v2H8z"/></svg>';
  }
  if (type === "chart") {
    return '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M4 20V10h4v10zm6 0V4h4v16zm6 0v-7h4v7z"/></svg>';
  }
  if (type === "calendar") {
    return '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M7 2h2v2h6V2h2v2h3v18H4V4h3zm11 8H6v10h12zM6 6v2h12V6z"/></svg>';
  }
  if (type === "game") {
    return '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M7 6h10a5 5 0 0 1 5 5v3a3 3 0 0 1-5.24 2.03L15 14.5H9l-1.76 1.53A3 3 0 0 1 2 14v-3a5 5 0 0 1 5-5zm2 4H7v2H5v2h2v2h2v-2h2v-2H9zm7.5 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-3 3a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>';
  }
  return '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M8.7 16.7 4 12l4.7-4.7L10.1 8.7 6.8 12l3.3 3.3zM15.3 7.3 20 12l-4.7 4.7-1.4-1.4 3.3-3.3-3.3-3.3z"/></svg>';
}

function translatedProjects() {
  const t = copy[state.language];
  return projects.map((project) => ({
    ...project,
    ...t.projects[project.id],
  }));
}

function selectedProject() {
  return translatedProjects().find((project) => project.id === state.selectedId);
}

function renderTags() {
  el.tagList.innerHTML = tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
}

function renderStats() {
  const t = copy[state.language];
  el.statsGrid.innerHTML = t.stats
    .map(
      ([number, label]) => `
        <article class="stat-card glass">
          <div class="stat-number">${number}</div>
          <div class="stat-label">${label}</div>
        </article>
      `,
    )
    .join("");
}

function renderProjectList() {
  const items = translatedProjects();
  el.projectList.innerHTML = items
    .map(
      (project) => `
        <button class="project-list-item ${project.id === state.selectedId ? "is-active" : ""}" data-project-id="${project.id}" type="button">
          <div class="project-list-head">
            <div class="project-head-left">
              <span class="project-icon-box" style="background:${project.accent}">
                ${iconSvg(project.icon)}
              </span>
              <span>
                <h3>${project.title}</h3>
                <p class="project-subtitle">${project.subtitle}</p>
              </span>
            </div>
            <span class="chevron">›</span>
          </div>
          <div class="stack-list">
            ${project.stack.map((item) => `<span class="stack-pill">${item}</span>`).join("")}
          </div>
        </button>
      `,
    )
    .join("");
}

function demoChipGrid(items) {
  return `
    <div class="demo-chip-grid">
      ${items
        .map(
          ([title, label]) => `
            <div class="demo-chip">
              <strong>${title}</strong>
              <span>${label}</span>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function demoBottomGrid(items) {
  return `
    <div class="demo-bottom-grid">
      ${items
        .map(
          ([title, label]) => `
            <div class="demo-chip">
              <strong>${title}</strong>
              <span>${label}</span>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function lemDemo() {
  return `
    <div class="demo lem">
      <div class="lem-stage">
        <svg class="lem-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="lem-flow-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="rgba(34,211,238,0.92)"></stop>
              <stop offset="50%" stop-color="rgba(168,85,247,0.96)"></stop>
              <stop offset="100%" stop-color="rgba(244,114,182,0.92)"></stop>
            </linearGradient>
          </defs>
          <line class="lem-edge" x1="10" y1="52" x2="32" y2="22"></line>
          <line class="lem-edge" x1="10" y1="52" x2="32" y2="78"></line>
          <line class="lem-edge" x1="32" y1="22" x2="56" y2="16"></line>
          <line class="lem-edge" x1="32" y1="78" x2="58" y2="78"></line>
          <line class="lem-edge" x1="56" y1="16" x2="88" y2="50"></line>
          <line class="lem-edge" x1="58" y1="78" x2="88" y2="50"></line>
          <line class="lem-edge-flow" x1="10" y1="52" x2="32" y2="22"></line>
          <line class="lem-edge-flow delay-1" x1="10" y1="52" x2="32" y2="78"></line>
          <line class="lem-edge-flow delay-2" x1="32" y1="22" x2="56" y2="16"></line>
          <line class="lem-edge-flow delay-3" x1="32" y1="78" x2="58" y2="78"></line>
          <line class="lem-edge-flow delay-4" x1="56" y1="16" x2="88" y2="50"></line>
          <line class="lem-edge-flow delay-5" x1="58" y1="78" x2="88" y2="50"></line>
        </svg>
        <div class="lem-layer">
          <div class="lem-node" style="left:10%;top:52%;">Start</div>
          <div class="lem-node" style="left:32%;top:22%;">A</div>
          <div class="lem-node" style="left:32%;top:78%;">B</div>
          <div class="lem-node" style="left:56%;top:16%;">C</div>
          <div class="lem-node" style="left:58%;top:78%;">D</div>
          <div class="lem-node" style="left:88%;top:50%;">End</div>

          <div class="ant ant-1">🐜</div>
          <div class="ant ant-2">🐜</div>
          <div class="ant ant-3">🐜</div>
          <div class="ant ant-4">🐜</div>

          <div class="lem-panel left">
            <p class="lem-small">Lem-in premium</p>
            <p class="lem-title">Exploration + simulation par tours</p>
            <p class="lem-desc">Les liens s'illuminent comme une exploration BFS, puis les fourmis avancent étape par étape jusqu'à End.</p>
          </div>

          <div class="lem-panel right">
            <p class="lem-small">timeline</p>
            <div class="timeline">
              <div class="timeline-row"><span class="timeline-dot"></span><span>Tour 1</span></div>
              <div class="timeline-row"><span class="timeline-dot"></span><span>Tour 2</span></div>
              <div class="timeline-row"><span class="timeline-dot"></span><span>Tour 3</span></div>
              <div class="timeline-row"><span class="timeline-dot"></span><span>Tour 4</span></div>
            </div>
            <div class="lem-note">Un recruteur comprend ici la logique de parcours et la progression des fourmis sans lire le code.</div>
          </div>

          ${demoChipGrid([
            ["BFS", "recherche des chemins"],
            ["Tours", "simulation étape par étape"],
            ["Flux", "répartition des fourmis"],
            ["Goal", "optimiser l'arrivée"],
          ])}
        </div>
      </div>
    </div>
  `;
}

function chatDemo() {
  return `
    <div class="demo simple chat">
      <div class="server-box">Serveur<br />TCP</div>
      <div class="chat-user" style="left:18%;top:28%;">Ana</div>
      <div class="chat-user delay-1" style="left:22%;top:70%;">Sam</div>
      <div class="chat-user delay-2" style="left:82%;top:30%;">Milo</div>
      <div class="chat-user delay-3" style="left:78%;top:70%;">Noa</div>
      <div class="floating-message msg-1"></div>
      <div class="floating-message msg-2"></div>
      <div class="floating-message msg-3"></div>
      <div class="floating-message msg-4"></div>
      ${demoBottomGrid([
        ["Clients", "Plusieurs connexions"],
        ["Serveur", "Réception centrale"],
        ["Diffusion", "Envoi des messages"],
        ["Go", "Goroutines"],
      ])}
    </div>
  `;
}

function codeDemo() {
  const columns = Array.from({ length: 11 }, (_, index) => {
    const left = 6 + index * 8;
    const delay = (index * 0.18).toFixed(2);
    const duration = (2.4 + (index % 3) * 0.5).toFixed(2);
    return `
      <div class="code-column" style="left:${left}%;animation-delay:${delay}s;animation-duration:${duration}s;">
        <span>func</span>
        <span>{}</span>
        <span>[]</span>
        <span>go</span>
        <span>map</span>
        <span>if</span>
      </div>
    `;
  }).join("");

  return `
    <div class="demo simple code">
      ${columns}
      <div class="code-panel">
        <h4>Apprentissage progressif</h4>
        <p>Exercices réguliers pour mieux comprendre les fonctions, slices, structs, erreurs, logique et organisation du code.</p>
      </div>
      ${demoBottomGrid([
        ["Fonctions", "Entrées / sorties"],
        ["Slices", "Découpage et parcours"],
        ["Structs", "Organisation"],
        ["Debug", "Correction d'erreurs"],
      ])}
    </div>
  `;
}

function forumDemo() {
  return `
    <div class="demo simple forum">
      <div class="forum-center">Forum<br />Live</div>
      <div class="forum-post" style="left:14%;top:22%;">Annonce</div>
      <div class="forum-post delay-1" style="left:66%;top:24%;">Question</div>
      <div class="forum-post delay-2" style="left:18%;top:64%;">Projet</div>
      <div class="forum-post delay-3" style="left:68%;top:66%;">Aide</div>
      <div class="comment-dot comment-1"></div>
      <div class="comment-dot comment-2"></div>
      <div class="comment-dot comment-3"></div>
      <div class="comment-dot comment-4"></div>
      ${demoBottomGrid([
        ["Users", "Connexion"],
        ["Posts", "Publications"],
        ["Comments", "Réponses"],
        ["Topics", "Navigation"],
      ])}
    </div>
  `;
}

function graphqlDemo() {
  return `
    <div class="demo simple graphql">
      <div class="server-box">API<br />GraphQL</div>
      <div class="chat-user" style="left:18%;top:28%;">Login</div>
      <div class="chat-user delay-1" style="left:22%;top:70%;">JWT</div>
      <div class="floating-message msg-1"></div>
      <div class="floating-message msg-2"></div>
      <div class="code-panel">
        <p class="lem-small">Stats</p>
        <p class="lem-title">Tableau de bord</p>
        <div class="chart-bars">
          <span class="chart-bar bar-1"></span>
          <span class="chart-bar bar-2"></span>
          <span class="chart-bar bar-3"></span>
          <span class="chart-bar bar-4"></span>
          <span class="chart-bar bar-5"></span>
        </div>
      </div>
      ${demoBottomGrid([
        ["Auth", "Connexion + JWT"],
        ["GraphQL", "Requêtes API"],
        ["SVG", "Graphiques natifs"],
        ["Zone01", "Intra + profil"],
      ])}
    </div>
  `;
}

function planningDemo() {
  return `
    <div class="demo simple planning">
      <div class="server-box">Supabase<br />Auth + DB</div>
      <div class="forum-post" style="left:14%;top:22%;">RDV 9h</div>
      <div class="forum-post delay-1" style="left:66%;top:24%;">Congé</div>
      <div class="forum-post delay-2" style="left:18%;top:64%;">RDV 14h</div>
      <div class="forum-post delay-3" style="left:68%;top:66%;">RDV 16h</div>
      <div class="comment-dot comment-1"></div>
      <div class="comment-dot comment-2"></div>
      <div class="comment-dot comment-3"></div>
      <div class="comment-dot comment-4"></div>
      ${demoBottomGrid([
        ["Planning", "Rendez-vous par jour"],
        ["Clientes", "Fiches et historique"],
        ["Auth", "Supabase Auth"],
        ["Congés", "Absences équipe"],
      ])}
    </div>
  `;
}

function platformerDemo() {
  return `
    <div class="demo simple platformer">
      <div class="platform plat-1"></div>
      <div class="platform plat-2"></div>
      <div class="platform plat-3"></div>
      <div class="platform plat-4"></div>
      <div class="player">🧍</div>
      <div class="key-hint key-left">←</div>
      <div class="key-hint key-right">→</div>
      <div class="code-panel">
        <p class="lem-small">Make Your Game</p>
        <p class="lem-title">Plateforme 2D</p>
        <p class="lem-desc">Le personnage saute de plateforme en plateforme grâce aux flèches du clavier, avec gravité et collisions gérées en JavaScript, sans Canvas.</p>
      </div>
      ${demoBottomGrid([
        ["Clavier", "Flèches directionnelles"],
        ["Physique", "Gravité et sauts"],
        ["Collisions", "Plateformes et sol"],
        ["DOM", "Rendu sans Canvas"],
      ])}
    </div>
  `;
}

function renderDemo(type, target) {
  let html = codeDemo();
  if (type === "lem") html = lemDemo();
  if (type === "chat") html = chatDemo();
  if (type === "forum") html = forumDemo();
  if (type === "graphql") html = graphqlDemo();
  if (type === "planning") html = planningDemo();
  if (type === "platformer") html = platformerDemo();
  target.innerHTML = html;
}

function renderDetail() {
  const t = copy[state.language];
  const project = selectedProject();
  el.detailTitle.textContent = project.title;
  el.detailSummary.textContent = project.summary;
  el.detailCodeLabel.textContent = t.viewCode;
  el.detailCodeLink.href = project.github;
  el.detailPoints.innerHTML = project.points
    .map((point) => `<div class="point">${point}</div>`)
    .join("");
  renderDemo(project.demo, el.projectDemo);
  renderDemo(project.demo, el.heroVisual);
}

function renderInfo() {
  const t = copy[state.language];
  el.infoGrid.innerHTML = t.infoCards
    .map(
      (item) => `
        <article class="info-card glass">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `,
    )
    .join("");
}

function renderGithubLinks() {
  const tProjects = translatedProjects();
  el.githubLinks.innerHTML = tProjects
    .map(
      (project) => `
        <a class="github-link" href="${project.github}" target="_blank" rel="noreferrer">
          <span>${project.title}</span>
          <span aria-hidden="true">↗</span>
        </a>
      `,
    )
    .join("");
}

function renderText() {
  const t = copy[state.language];
  document.documentElement.lang = state.language;
  document.title = "Sébastien Beck - Portfolio Développeur";
  el.portfolioLabel.textContent = t.portfolio;
  el.siteName.textContent = t.name;
  el.cvTopLabel.textContent = t.cv;
  el.heroBadge.textContent = t.heroBadge;
  el.heroTitleStart.textContent = `${t.heroTitleStart} `;
  el.heroTitleHighlight.textContent = t.heroTitleHighlight;
  el.heroText.textContent = t.heroText;
  el.projectsEyebrow.textContent = t.projectsEyebrow;
  el.projectsTitle.textContent = t.projectsTitle;
  el.projectsText.textContent = t.projectsText;
  el.githubTitle.textContent = t.githubTitle;
  el.githubText.textContent = t.githubText;
  el.githubButtonLabel.textContent = t.viewGithub;
  el.contactTitle.textContent = t.contactTitle;
  el.contactText.textContent = t.contactText;
  el.contactCvLabel.textContent = t.cv;
}

function renderLanguageButtons() {
  el.langButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === state.language);
  });
}

function render() {
  renderText();
  renderLanguageButtons();
  renderTags();
  renderStats();
  renderProjectList();
  renderDetail();
  renderInfo();
  renderGithubLinks();
}

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const langButton = event.target.closest(".lang-btn");
  if (langButton) {
    state.language = langButton.dataset.lang;
    render();
    return;
  }

  const projectButton = event.target.closest("[data-project-id]");
  if (projectButton) {
    state.selectedId = projectButton.dataset.projectId;
    render();
  }
});

render();
