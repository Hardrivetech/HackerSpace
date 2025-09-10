<template>
  <div>
    <header class="site-header">
      <div class="container">
        <div class="brand">
          <span class="logo">{QC}</span>
          <h1>Quantum Collective</h1>
          <span class="handle">by @QuantumByte</span>
        </div>
        <nav class="nav">
          <RouterLink to="/" exact-active-class="active">Home</RouterLink>
          <RouterLink to="/about" exact-active-class="active">About</RouterLink>
          <RouterLink to="/projects" exact-active-class="active"
            >Projects</RouterLink
          >
          <RouterLink to="/signals" exact-active-class="active"
            >Signals</RouterLink
          >
          <RouterLink to="/logs" exact-active-class="active">Logs</RouterLink>
          <RouterLink to="/search" exact-active-class="active"
            >Search</RouterLink
          >
        </nav>
      </div>
    </header>

    <main id="main" class="container">
      <RouterView />
    </main>

    <footer class="site-footer">
      <span>© {{ year }} Quantum Collective • Operated by QuantumByte</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
const year = ref(new Date().getFullYear());
</script>
