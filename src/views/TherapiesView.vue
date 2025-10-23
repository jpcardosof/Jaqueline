<template>
  <section class="therapies">
    <article class="card library">
      <header>
        <div>
          <h3>Biblioteca de terapias</h3>
          <p class="lead">Ideias prontas para apoiar pacientes em momentos de dificuldade.</p>
        </div>
      </header>
      <ul>
        <li v-for="item in store.therapyLibrary" :key="item.slug">
          <strong>{{ item.title }}</strong>
          <p>{{ item.desc }}</p>
        </li>
      </ul>
    </article>

    <form class="card new" @submit.prevent="add">
      <h3>Nova terapia personalizada</h3>
      <p class="lead">Registre recomendações específicas para compartilhar no acompanhamento.</p>
      <input v-model="form.title" placeholder="Título da terapia" required />
      <textarea v-model="form.desc" placeholder="Descrição / objetivos"></textarea>
      <button>Salvar</button>
    </form>

    <section class="custom">
      <h3>Planos personalizados</h3>
      <div v-if="!store.therapies.length" class="empty">Nenhuma terapia personalizada cadastrada.</div>
      <div v-for="t in store.therapies" :key="t.id" class="card">
        <header>
          <strong>{{ t.title }}</strong>
          <button class="del" @click="store.deleteTherapy(t.id)">🗑️</button>
        </header>
        <p>{{ t.desc }}</p>
      </div>
    </section>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { useMainStore } from '../stores/index.js'

const store = useMainStore()
const form = reactive({ title: '', desc: '' })

function add() {
  store.addTherapy({ ...form })
  form.title = ''
  form.desc = ''
}
</script>

<style scoped>
.therapies {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
}

.card {
  background: var(--surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 20px;
}

.library ul {
  display: grid;
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.library li strong {
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
}

.lead {
  color: var(--muted);
  margin: 0 0 12px;
}

.new {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.custom {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.custom > h3 {
  margin: 0;
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

textarea {
  min-height: 100px;
  resize: vertical;
}

button {
  background: var(--primary);
  border: none;
  border-radius: var(--radius);
  color: white;
  font-weight: 600;
  padding: 10px;
  align-self: flex-start;
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
  background: var(--surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
</style>
