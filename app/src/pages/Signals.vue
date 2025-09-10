<template>
  <section>
    <h3 class="sr">Signals</h3>
    <div class="grid projects">
      <article class="card" v-for="s in signals" :key="s.slug">
        <h4>
          <RouterLink :to="{ name: 'signal', params: { slug: s.slug } }">{{
            s.date
          }}</RouterLink>
        </h4>
        <p>{{ s.text }}</p>
        <p>
          <span
            class="badge"
            v-for="t in s.tags"
            :key="t"
            style="margin-right: 0.4rem"
            >#{{ t }}</span
          >
        </p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { reactive } from "vue";

const signals = reactive([
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
]);
</script>
