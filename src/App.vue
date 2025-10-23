<template>
  <div class="app-shell">
    <header class="topbar">
      <div class="title">Clínica • Chat & Terapias</div>
      <div class="subtitle">para psicólogos e pacientes</div>
    </header>

    <main class="content">
      <router-view />
    </main>

    <nav class="tabbar">
      <RouterLink to="/chat" class="tab" :class="{ active: route.name==='chat' }">
        💬<small>Chat</small>
      </RouterLink>
      <RouterLink to="/terapias" class="tab" :class="{ active: route.name==='terapias' }">
        🧠<small>Terapias</small>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMainStore } from './stores/index.js'
const store = useMainStore()
const route = useRoute()
onMounted(() => store.init())
</script>

<style scoped>
.app-shell { display:grid; grid-template-rows:auto 1fr auto; height:100dvh; }
.topbar { display:flex; justify-content:space-between; align-items:center; padding:12px 16px; border-bottom:1px solid var(--border); background:var(--surface); }
.title { font-weight:700; color:var(--text); }
.subtitle { color:var(--muted); font-size:12px; }
.content { overflow:auto; background:var(--bg); }
.tabbar { display:flex; border-top:1px solid var(--border); background:var(--surface); }
.tab { flex:1; text-align:center; padding:10px 0; text-decoration:none; color:var(--muted); }
.tab.active { color:var(--primary); font-weight:600; }
</style>
