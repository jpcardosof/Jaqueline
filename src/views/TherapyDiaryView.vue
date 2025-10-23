<template>
  <section class="diary">
    <div class="column patients">
      <article class="card">
        <h3>Pacientes em acompanhamento</h3>
        <ul>
          <li v-for="patient in store.patients" :key="patient.id">
            <div class="name">{{ patient.name }}</div>
            <div class="detail">Foco: {{ patient.focus }}</div>
            <div class="detail">Última sessão: {{ formatDate(patient.lastSession) }}</div>
            <p>{{ patient.notes }}</p>
          </li>
        </ul>
      </article>

      <form class="card form" @submit.prevent="addPatient">
        <h3>Novo paciente</h3>
        <input v-model="patientForm.name" placeholder="Nome completo" required />
        <input v-model="patientForm.focus" placeholder="Foco terapêutico" required />
        <label class="label">
          Última sessão
          <input v-model="patientForm.lastSession" type="date" required />
        </label>
        <textarea v-model="patientForm.notes" placeholder="Observações principais"></textarea>
        <button>Adicionar paciente</button>
      </form>
    </div>

    <div class="column entries">
      <form class="card form" @submit.prevent="addEntry">
        <h3>Registrar diário terapêutico</h3>
        <label class="label">
          Paciente
          <select v-model="entryForm.patientId" required>
            <option disabled value="">Selecione um paciente</option>
            <option v-for="patient in store.patients" :key="patient.id" :value="patient.id">
              {{ patient.name }}
            </option>
          </select>
        </label>
        <label class="label">
          Data
          <input v-model="entryForm.date" type="date" required />
        </label>
        <input v-model="entryForm.mood" placeholder="Estado emocional predominante" required />
        <textarea v-model="entryForm.highlights" placeholder="Principais insights e conquistas"></textarea>
        <textarea v-model="entryForm.nextSteps" placeholder="Recomendações ou tarefas até a próxima sessão"></textarea>
        <button>Salvar registro</button>
      </form>

      <section class="timeline">
        <h3>Entradas recentes</h3>
        <div v-for="entry in store.diaryEntries" :key="entry.id" class="card entry">
          <header>
            <div>
              <strong>{{ patientById(entry.patientId)?.name || 'Paciente removido' }}</strong>
              <span class="date">{{ formatDate(entry.date) }}</span>
            </div>
            <span class="mood">{{ entry.mood }}</span>
          </header>
          <p class="highlight" v-if="entry.highlights">{{ entry.highlights }}</p>
          <p class="next" v-if="entry.nextSteps"><strong>Próximos passos:</strong> {{ entry.nextSteps }}</p>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useMainStore } from '../stores/index.js'

const store = useMainStore()

const patientForm = reactive({
  name: '',
  focus: '',
  lastSession: new Date().toISOString().slice(0, 10),
  notes: '',
})

const entryForm = reactive({
  patientId: '',
  date: new Date().toISOString().slice(0, 10),
  mood: '',
  highlights: '',
  nextSteps: '',
})

const patientMap = computed(() =>
  Object.fromEntries(store.patients.map(patient => [patient.id, patient]))
)

function patientById(id) {
  return patientMap.value[id]
}

function addPatient() {
  store.addPatient({ ...patientForm })
  patientForm.name = ''
  patientForm.focus = ''
  patientForm.lastSession = new Date().toISOString().slice(0, 10)
  patientForm.notes = ''
  if (!entryForm.patientId && store.patients.length) {
    entryForm.patientId = store.patients[0].id
  }
}

function addEntry() {
  if (!entryForm.patientId) return
  store.addDiaryEntry({ ...entryForm })
  entryForm.date = new Date().toISOString().slice(0, 10)
  entryForm.mood = ''
  entryForm.highlights = ''
  entryForm.nextSteps = ''
}

function formatDate(value) {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
}

if (store.patients.length && !entryForm.patientId) {
  entryForm.patientId = store.patients[0].id
}
</script>

<style scoped>
.diary {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (min-width: 920px) {
  .diary {
    flex-direction: row;
    align-items: flex-start;
  }
  .column {
    flex: 1;
  }
}

.card {
  background: var(--surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 20px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.name {
  font-weight: 600;
}

.detail {
  color: var(--muted);
  font-size: 13px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
  color: var(--muted);
}

input,
textarea,
select {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 10px;
  font-size: 14px;
  background: var(--surface-2);
}

textarea {
  min-height: 90px;
  resize: vertical;
}

button {
  background: var(--primary);
  border: none;
  border-radius: var(--radius);
  color: white;
  font-weight: 600;
  padding: 10px 16px;
  align-self: flex-start;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.timeline > h3 {
  margin: 0;
}

.entry header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.entry header div {
  display: flex;
  flex-direction: column;
}

.date {
  color: var(--muted);
  font-size: 12px;
}

.mood {
  background: var(--surface-2);
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 12px;
}

.highlight,
.next {
  margin: 12px 0 0;
  color: var(--text);
  white-space: pre-line;
}

.next strong {
  color: var(--primary);
}
</style>
