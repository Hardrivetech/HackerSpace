import { createApp } from "vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import "./style.css";
import Root from "./Root.vue";
import Home from "./pages/Home.vue";
import About from "./pages/About.vue";
import Projects from "./pages/Projects.vue";
import Signals from "./pages/Signals.vue";
import Logs from "./pages/Logs.vue";
import Search from "./pages/Search.vue";
import ProjectDetail from "./pages/ProjectDetail.vue";
import SignalDetail from "./pages/SignalDetail.vue";

const routes: RouteRecordRaw[] = [
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
  { path: "/:pathMatch(.*)*", component: () => import("./pages/NotFound.vue") },
];

const router = createRouter({
  history: createWebHashHistory("/HackerSpace/"),
  routes,
});

createApp(Root).use(router).mount("#app");

// Register service worker (from public/)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/HackerSpace/sw.js")
      .then((reg) => {
        let refreshing = false;
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          if (refreshing) return;
          refreshing = true;
          window.location.reload();
        });

        function showUpdateBanner(registration: ServiceWorkerRegistration) {
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
