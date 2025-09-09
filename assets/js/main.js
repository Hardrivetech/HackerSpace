// Vue 3 CDN app with hash-based routing (works on GitHub Pages without special config)
const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

// Simple components
const Home = {
  template: `
    <section>
      <div class="hero">
        <div>
          <h2>Welcome to the Quantum Collective</h2>
          <p>
            A one-member hacker group exploring systems, signals, and security. Expect code, tooling, and a trail of breadcrumbs.
          </p>
          <p>
            <span class="badge">Operator: @QuantumByte</span>
          </p>
        </div>
        <div class="card">
          <h3>Latest Signal</h3>
          <p>Deploying this Vue-powered static site to GitHub Pages. Hash routing ensures compatibility with static hosting.</p>
        </div>
      </div>

      <h3>Highlights</h3>
      <div class="grid projects">
        <article class="card">
          <h4>Recon Toolkit</h4>
          <p>CLI utilities for quick OSINT checks and endpoint probing.</p>
        </article>
        <article class="card">
          <h4>Signal Jam</h4>
          <p>Experiments with SDR and protocol fuzzing in a sandbox.</p>
        </article>
        <article class="card">
          <h4>GreenRoom</h4>
          <p>Terminal-first UI components for web dashboards.</p>
        </article>
      </div>
    </section>
  `,
};

const About = {
  template: `
    <section class="grid" style="gap: 1.2rem;">
      <div class="card">
        <h3>About Quantum Collective</h3>
        <p>Quantum Collective is a minimalist hacker group operated by a single member.</p>
        <p><strong>Handle:</strong> @QuantumByte</p>
        <p>Focus: security research, tooling, and systems tinkering.</p>
      </div>
      <div class="card">
        <h3>Stack & Tools</h3>
        <p>Favorite languages: JS/TS, Python, Go. Regulars: Vue, Vite, Node, Docker.</p>
      </div>
    </section>
  `,
};

const Projects = {
  data: () => ({
    projects: [
      { name: "Recon Toolkit", tags: ["osint", "cli", "security"] },
      { name: "Signal Jam", tags: ["sdr", "rf", "fuzzing"] },
      { name: "GreenRoom", tags: ["ui", "terminal", "components"] },
    ],
  }),
  template: `
    <section>
      <h3 class="sr">Projects</h3>
      <div class="grid projects">
        <article class="card" v-for="p in projects" :key="p.name">
          <h4>{{ p.name }}</h4>
          <p>
            <span class="badge" v-for="t in p.tags" :key="t" style="margin-right:.4rem">#{{ t }}</span>
          </p>
        </article>
      </div>
    </section>
  `,
};

const Signals = {
  data: () => ({
    signals: [
      {
        date: "2025-09-09",
        text: "Deployed Vue hash-router site to GitHub Pages.",
        tags: ["deploy", "vue"],
      },
      {
        date: "2025-09-07",
        text: "Prototyped SDR fuzzing harness.",
        tags: ["sdr", "rf"],
      },
      {
        date: "2025-09-01",
        text: "Released Recon Toolkit alpha.",
        tags: ["osint", "cli"],
      },
    ],
  }),
  template: `
    <section>
      <h3 class="sr">Signals</h3>
      <div class="grid projects">
        <article class="card" v-for="s in signals" :key="s.date + s.text">
          <h4>{{ s.date }}</h4>
          <p>{{ s.text }}</p>
          <p>
            <span class="badge" v-for="t in s.tags" :key="t" style="margin-right:.4rem">#{{ t }}</span>
          </p>
        </article>
      </div>
    </section>
  `,
};

const Logs = {
  data: () => ({
    logs: [
      { when: "2025-09-09 08:00Z", event: "Initial site structure" },
      { when: "2025-09-09 08:10Z", event: "Added Signals and Logs sections" },
    ],
  }),
  template: `
    <section>
      <h3 class="sr">Logs</h3>
      <div class="grid">
        <article class="card" v-for="l in logs" :key="l.when + l.event">
          <p><strong>{{ l.when }}</strong> — {{ l.event }}</p>
        </article>
      </div>
    </section>
  `,
};

const NotFound = {
  template: `
    <section class="grid" style="gap:1rem; grid-template-columns: 1fr; max-width:720px;">
      <div class="card">
        <h3>404 — Not Found</h3>
        <p>The page you requested does not exist. Return to <a href="#!/">Home</a>.</p>
      </div>
    </section>
  `,
};

// Router using hash mode for GitHub Pages compatibility
const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/projects", component: Projects },
  { path: "/signals", component: Signals },
  { path: "/logs", component: Logs },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp({});
app.use(router);
app.mount("#app");
