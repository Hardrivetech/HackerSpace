<template>
  <section>
    <h3 class="sr">Projects</h3>
    <div class="grid projects">
      <article class="card" v-for="p in projects" :key="p.slug">
        <h4>
          <RouterLink :to="{ name: 'project', params: { slug: p.slug } }">{{
            p.name
          }}</RouterLink>
        </h4>
        <p>
          <span
            class="badge"
            v-for="t in p.tags"
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

const projects = reactive([
  {
    slug: "recon-toolkit",
    name: "Recon Toolkit",
    tags: ["osint", "cli", "security"],
  },
  { slug: "signal-jam", name: "Signal Jam", tags: ["sdr", "rf", "fuzzing"] },
  {
    slug: "greenroom",
    name: "GreenRoom",
    tags: ["ui", "terminal", "components"],
  },
]);
</script>
