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
      {
        slug: "recon-toolkit",
        name: "Recon Toolkit",
        tags: ["osint", "cli", "security"],
      },
      {
        slug: "signal-jam",
        name: "Signal Jam",
        tags: ["sdr", "rf", "fuzzing"],
      },
      {
        slug: "greenroom",
        name: "GreenRoom",
        tags: ["ui", "terminal", "components"],
      },
    ],
  }),
  template: `
    <section>
      <h3 class="sr">Projects</h3>
      <div class="grid projects">
        <article class="card" v-for="p in projects" :key="p.slug">
          <h4>
            <router-link :to="{ name: 'project', params: { slug: p.slug } }">{{ p.name }}</router-link>
          </h4>
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
        slug: "2025-09-09-deploy",
        date: "2025-09-09",
        text: "Deployed Vue hash-router site to GitHub Pages.",
        tags: ["deploy", "vue"],
      },
      {
        slug: "2025-09-07-sdr",
        date: "2025-09-07",
        text: "Prototyped SDR fuzzing harness.",
        tags: ["sdr", "rf"],
      },
      {
        slug: "2025-09-01-recon",
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
        <article class="card" v-for="s in signals" :key="s.slug">
          <h4>
            <router-link :to="{ name: 'signal', params: { slug: s.slug } }">{{ s.date }}</router-link>
          </h4>
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

// Simple client-side search over Signals (from feed.json)
const Search = {
  data: () => ({
    q: "",
    items: [],
    loading: false,
    error: null,
  }),
  computed: {
    results() {
      const q = this.q.trim().toLowerCase();
      if (!q) return [];
      return this.items.filter(
        (it) =>
          (it.title || "").toLowerCase().includes(q) ||
          (it.id || "").toLowerCase().includes(q)
      );
    },
  },
  async mounted() {
    this.loading = true;
    try {
      const res = await fetch("./feed.json");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      this.items = (data.items || []).map((it) => ({
        id: it.id,
        title: it.title,
      }));
    } catch (e) {
      this.error = e.message;
    } finally {
      this.loading = false;
    }
  },
  template: `
    <section>
      <h3 class="sr">Search</h3>
      <div class="card" style="margin-bottom:1rem;">
        <label for="q">Search Signals</label>
        <input id="q" v-model="q" placeholder="Type to search..." autocomplete="off" />
      </div>
      <div v-if="loading" class="card"><p>Indexing feed…</p></div>
      <div v-else-if="error" class="card"><p style=\"color: var(--danger);\">{{ error }}</p></div>
      <div v-else>
        <div class="grid projects">
          <article class="card" v-for="r in results" :key="r.id">
            <h4><router-link :to="{ name: 'signal', params: { slug: r.id } }">{{ r.title }}</router-link></h4>
            <p class="muted">#{{ r.id }}</p>
          </article>
        </div>
        <div v-if="q && results.length === 0" class="card"><p>No results.</p></div>
      </div>
    </section>
  `,
};

const NotFound = {
  template: `
    <section class="grid" style="gap:1rem; grid-template-columns: 1fr; max-width:720px;">
      <div class="card">
        <h3>404 — Not Found</h3>
        <p>The page you requested does not exist. Return to <a href="#/">Home</a>.</p>
      </div>
    </section>
  `,
};

// Router using hash mode for GitHub Pages compatibility
// Markdown detail loaders
const MarkdownView = {
  props: ["src"],
  data: () => ({ html: "", error: null, loading: true }),
  mounted() {
    this.fetchMd();
  },
  watch: {
    src() {
      this.fetchMd();
    },
  },
  methods: {
    async fetchMd() {
      this.loading = true;
      this.error = null;
      this.html = "";
      try {
        const res = await fetch(this.src);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const md = await res.text();
        this.html = marked.parse(md);
      } catch (e) {
        this.error = `Failed to load markdown: ${e.message}`;
      } finally {
        this.loading = false;
      }
    },
  },
  template: `
    <section>
      <div v-if="loading" class="card"><p>Loading...</p></div>
      <div v-else-if="error" class="card"><p style="color: var(--danger);">{{ error }}</p></div>
      <article v-else class="card" v-html="html"></article>
    </section>
  `,
};

const ProjectDetail = {
  props: ["slug"],
  computed: {
    src() {
      return `./content/projects/${this.slug}.md`;
    },
  },
  template: `<MarkdownView :src="src" />`,
  components: { MarkdownView },
};

const SignalDetail = {
  props: ["slug"],
  computed: {
    src() {
      return `./content/signals/${this.slug}.md`;
    },
  },
  template: `<MarkdownView :src="src" />`,
  components: { MarkdownView },
};

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/projects", component: Projects },
  {
    path: "/projects/:slug",
    name: "project",
    component: ProjectDetail,
    props: true,
  },
  { path: "/signals", component: Signals },
  {
    path: "/signals/:slug",
    name: "signal",
    component: SignalDetail,
    props: true,
  },
  { path: "/logs", component: Logs },
  { path: "/search", component: Search },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Root component to enable reactive nav + layout
const Root = {
  data() {
    return { year: new Date().getFullYear() };
  },
  template: `
    <div>
      <header class="site-header">
        <div class="container">
          <div class="brand">
            <span class="logo">{QC}</span>
            <h1>Quantum Collective</h1>
            <span class="handle">by @QuantumByte</span>
          </div>
          <nav class="nav">
            <router-link to="/" exact-active-class="active">Home</router-link>
            <router-link to="/about" exact-active-class="active">About</router-link>
            <router-link to="/projects" exact-active-class="active">Projects</router-link>
            <router-link to="/signals" exact-active-class="active">Signals</router-link>
            <router-link to="/logs" exact-active-class="active">Logs</router-link>
            <router-link to="/search" exact-active-class="active">Search</router-link>
          </nav>
        </div>
      </header>

      <main id="main" class="container">
        <router-view></router-view>
      </main>

      <footer class="site-footer">
        <span>© {{ year }} Quantum Collective • Operated by QuantumByte</span>
      </footer>
    </div>
  `,
};

createApp(Root).use(router).mount("#app");

// Register service worker with update prompt
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then((reg) => {
        let refreshing = false;
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          if (refreshing) return;
          refreshing = true;
          window.location.reload();
        });

        function showUpdateBanner(registration) {
          const waiting = registration.waiting;
          if (!waiting) return;
          const bar = document.createElement("div");
          bar.setAttribute("role", "status");
          bar.style.cssText =
            "position:fixed;bottom:0;left:0;right:0;background:#0b1412;color:#00ff88;border-top:1px solid #2a6b4a;padding:8px 12px;display:flex;gap:8px;justify-content:center;align-items:center;z-index:9999;";
          bar.innerHTML = "<span>New version available.</span>";
          const btn = document.createElement("button");
          btn.textContent = "Refresh to update";
          btn.style.cssText =
            "background:#0b1412;color:#00ff88;border:1px solid #2a6b4a;padding:6px 10px;border-radius:6px;cursor:pointer;";
          btn.addEventListener("click", () => {
            waiting.postMessage({ type: "SKIP_WAITING" });
          });
          bar.appendChild(btn);
          document.body.appendChild(bar);
        }

        if (reg.waiting) showUpdateBanner(reg);
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                showUpdateBanner(reg);
              }
            });
          }
        });
      })
      .catch((err) => console.error("SW registration failed", err));
  });
}
