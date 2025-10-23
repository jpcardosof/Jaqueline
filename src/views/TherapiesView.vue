<template>
  <section class="therapies">
    <form class="new" @submit.prevent="add">
      <h3>Nova Terapia</h3>
      <input v-model="form.title" placeholder="Título da terapia" required />
      <textarea v-model="form.desc" placeholder="Descrição / objetivos"></textarea>
      <button>Salvar</button>
    </form>

    <div v-if="!store.therapies.length" class="empty">Nenhuma terapia cadastrada.</div>

    <div v-for="t in store.therapies" :key="t.id" class="card">
      <header>
        <strong>{{ t.title }}</strong>
        <button class="del" @click="store.deleteTherapy(t.id)">🗑️</button>
      </header>
      <p>{{ t.desc }}</p>
    </div>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import { useMainStore } from "../stores/index.js";
const store = useMainStore();
const form = reactive({ title: "", desc: "" });
function add() {
  store.addTherapy({ ...form });
  form.title = form.desc = "";
}
</script>

<style scoped>
.therapies {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}
.new {
  background: var(--surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.card {
  background: var(--surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 16px;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
input,
textarea {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 10px;
  font-size: 14px;
  background: var(--surface-2);
}
button {
  background: var(--primary);
  border: none;
  border-radius: var(--radius);
  color: white;
  font-weight: 600;
  padding: 10px;
}
.del {
  background: none;
  border: none;
  color: var(--danger);
  font-size: 18px;
}
.empty {
  text-align: center;
  color: var(--muted);
  padding: 24px;
}
</style>
