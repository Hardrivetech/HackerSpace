<template>
  <section>
    <h3 class="sr">Logs</h3>
    <div class="grid">
      <article class="card" v-for="l in logs" :key="l.when + l.event">
        <p>
          <strong>{{ l.when }}</strong> — {{ l.event }}
        </p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const logs = reactive([
  { when: "2025-09-09 08:00Z", event: "Initial site structure" },
  { when: "2025-09-09 08:10Z", event: "Added Signals and Logs sections" },
]);
</script>
