<template>
  <MarkdownView :src="src" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import MarkdownView from "./MarkdownView.vue";

const route = useRoute();
const src = computed(
  () => `/HackerSpace/content/signals/${route.params.slug}.md`
);
</script>
