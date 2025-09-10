<template>
  <section>
    <div v-if="loading" class="card"><p>Loading...</p></div>
    <div v-else-if="error" class="card">
      <p style="color: var(--danger)">{{ error }}</p>
    </div>
    <article v-else class="card" v-html="html"></article>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { marked } from "marked";

const props = defineProps<{ src: string }>();
const html = ref("");
const loading = ref(true);
const error = ref<string | null>(null);

async function fetchMd() {
  loading.value = true;
  error.value = null;
  html.value = "";
  try {
    const res = await fetch(props.src);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const md = await res.text();
    html.value = marked.parse(md);
  } catch (e: any) {
    error.value = `Failed to load markdown: ${e.message}`;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchMd);
watch(() => props.src, fetchMd);
</script>
