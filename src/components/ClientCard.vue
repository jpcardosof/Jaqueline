<template>
  <div class="card">
    <header>
      <strong>{{ edit.name }}</strong>
      <button class="del" @click="$emit('delete', client.id)">🗑️</button>
    </header>

    <input v-model="edit.name" placeholder="Nome" />
    <input v-model="edit.phone" placeholder="Telefone" />
    <input v-model="edit.email" placeholder="Email" type="email" />
    <textarea v-model="edit.notes" placeholder="Notas"></textarea>

    <footer>
      <button @click="$emit('save', client.id, edit)">Salvar</button>
    </footer>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
const props = defineProps({ client: Object })
const edit = reactive({})
watch(() => props.client, c => Object.assign(edit, c), { immediate: true })
</script>

<style scoped>
.card { background:var(--card); border:1px solid var(--border); border-radius:12px; padding:12px; display:flex; flex-direction:column; gap:8px; }
header { display:flex; justify-content:space-between; align-items:center; }
input, textarea { background:#0f172a; border:1px solid var(--border); color:#e2e8f0; border-radius:8px; padding:8px; }
button { background:var(--accent); border:none; color:#0b1220; padding:8px 12px; border-radius:8px; font-weight:700; }
.del { background:none; border:none; color:var(--danger); font-size:18px; }
</style>
