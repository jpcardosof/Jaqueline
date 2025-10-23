<template>
  <form class="input" @submit.prevent="emit('send', { text }); text=''">
    <input v-model="text" placeholder="Escreva uma mensagem..." required />
    <button>Enviar</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['send'])
const text = ref('')
</script>

<style scoped>
.input { display:flex; gap:8px; padding:8px; border-top:1px solid var(--border); }
input { flex:1; padding:10px; border-radius:10px; border:1px solid var(--border); background:#0f172a; color:#e2e8f0; }
button { background:var(--good); border:none; border-radius:10px; padding:10px 14px; color:#062c49; font-weight:600; }
</style>
