<template>
  <section class="lib">
    <form class="new" @submit.prevent="add">
      <input v-model="form.name" placeholder="Nome" required />
      <input v-model="form.phone" placeholder="Telefone" />
      <input v-model="form.email" type="email" placeholder="Email" />
      <textarea v-model="form.notes" placeholder="Notas"></textarea>
      <button>Adicionar</button>
    </form>

    <ClientCard
      v-for="c in store.clients"
      :key="c.id"
      :client="c"
      @save="store.updateClient"
      @delete="store.deleteClient"
    />
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { useMainStore } from '../stores/index.js'
import ClientCard from '../components/ClientCard.vue'

const store = useMainStore()
const form = reactive({ name:'', phone:'', email:'', notes:'' })
function add() { store.addClient({ ...form }); Object.keys(form).forEach(k => form[k]='') }
</script>

<style scoped>
.lib { padding:12px; display:flex; flex-direction:column; gap:12px; }
.new { background:var(--card); padding:12px; border-radius:12px; display:grid; gap:8px; }
input, textarea { background:#0f172a; border:1px solid var(--border); color:#e2e8f0; border-radius:8px; padding:8px; }
button { background:var(--primary); border:none; border-radius:8px; color:#062c49; font-weight:700; padding:8px; }
</style>
