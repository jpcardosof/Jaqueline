<template>
  <section class="chat">
    <div class="messages">
      <div v-for="m in store.messages" :key="m.id" class="bubble">
        <div class="author">{{ m.author }}</div>
        <div class="text">{{ m.text }}</div>
      </div>
    </div>
    <form class="send" @submit.prevent="send">
      <input v-model="text" placeholder="Escreva uma mensagem..." required />
      <button>Enviar</button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useMainStore } from '../stores/index.js'
const store = useMainStore()
const text = ref('')
function send() {
  store.messages.push({ id: Date.now(), author: 'Você', text: text.value })
  text.value = ''
  store.persist()
}
</script>

<style scoped>
.chat { display:flex; flex-direction:column; height:100%; }
.messages { flex:1; overflow:auto; padding:12px; background:var(--surface-2); }
.bubble { margin-bottom:8px; background:var(--surface); border-radius:var(--radius); box-shadow:var(--shadow); padding:10px 14px; }
.author { color:var(--muted); font-size:12px; }
.send { display:flex; border-top:1px solid var(--border); background:var(--surface); padding:8px; gap:8px; }
input { flex:1; border:1px solid var(--border); border-radius:var(--radius); padding:10px; }
button { background:var(--primary); color:white; border:none; border-radius:var(--radius); padding:10px 16px; font-weight:600; }
</style>
