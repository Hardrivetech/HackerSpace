<template>
  <section>
    <h3 class="sr">Search</h3>
    <div class="card" style="margin-bottom: 1rem">
      <label for="q">Search Signals</label>
      <input
        id="q"
        v-model="q"
        placeholder="Type to search..."
        autocomplete="off"
      />
    </div>
    <div v-if="loading" class="card"><p>Indexing feed…</p></div>
    <div v-else-if="error" class="card">
      <p style="color: var(--danger)">{{ error }}</p>
    </div>
    <div v-else>
      <div class="grid projects">
        <article class="card" v-for="r in results" :key="r.id">
          <h4>
            <RouterLink :to="{ name: 'signal', params: { slug: r.id } }">{{
              r.title
            }}</RouterLink>
          </h4>
          <p class="muted">#{{ r.id }}</p>
        </article>
      </div>
      <div v-if="q && results.length === 0" class="card">
        <p>No results.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { RouterLink } from "vue-router";

const state = reactive({
  q: "",
  items: [] as { id: string; title: string }[],
  loading: false,
  error: null as string | null,
});

const results = computed(() => {
  const q = state.q.trim().toLowerCase();
  if (!q) return [] as { id: string; title: string }[];
  return state.items.filter(
    (it) =>
      (it.title || "").toLowerCase().includes(q) ||
      (it.id || "").toLowerCase().includes(q)
  );
});

(async () => {
  state.loading = true;
  try {
    const res = await fetch("/HackerSpace/feed.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    state.items = (data.items || []).map((it: any) => ({
      id: it.id,
      title: it.title,
    }));
  } catch (e: any) {
    state.error = e.message;
  } finally {
    state.loading = false;
  }
})();
</script>

<script lang="ts">
export default { name: "Search" };
</script>
