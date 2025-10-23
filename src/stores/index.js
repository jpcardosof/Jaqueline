import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

const KEY = 'clinica-data'

const createDefaultState = () => {
  const anaId = uuidv4()
  const lucasId = uuidv4()
  const sofiaId = uuidv4()

  return {
    patients: [
      {
        id: anaId,
        name: 'Ana Souza',
        focus: 'Ansiedade generalizada',
        lastSession: '2024-04-16',
        notes: 'Relata avanços com respiração guiada e diário emocional.'
      },
      {
        id: lucasId,
        name: 'Lucas Fernandes',
        focus: 'Burnout profissional',
        lastSession: '2024-04-18',
        notes: 'Trabalhando limites no trabalho e rituais de pausa consciente.'
      },
      {
        id: sofiaId,
        name: 'Sofia Almeida',
        focus: 'Tristeza persistente pós término',
        lastSession: '2024-04-19',
        notes: 'Praticando rodas de apoio e escrita compassiva.'
      },
    ],
    therapies: [
      {
        id: uuidv4(),
        title: 'Respiração Diafragmática 4-6',
        desc: 'Praticar respirações profundas contando quatro tempos para inspirar e seis para expirar, cinco minutos, duas vezes ao dia.'
      },
      {
        id: uuidv4(),
        title: 'Ritual de Aterramento 5-4-3-2-1',
        desc: 'Listar 5 coisas que vê, 4 que toca, 3 que ouve, 2 que cheira e 1 que saboreia para reconectar-se com o presente.'
      },
      {
        id: uuidv4(),
        title: 'Cartas de Autocompaixão',
        desc: 'Escrever uma carta semanal para si, reconhecendo esforços, emoções e definindo um gesto gentil para os próximos dias.'
      },
    ],
    therapyLibrary: [
      {
        slug: 'respiracao-quadrada',
        title: 'Respiração Quadrada',
        desc: 'Inspirar, segurar, expirar e pausar em quatro tempos cada, durante cinco ciclos para acalmar o sistema nervoso.'
      },
      {
        slug: 'escaneamento-corporal',
        title: 'Escaneamento Corporal Mindfulness',
        desc: 'Percorrer mentalmente o corpo observando sensações sem julgamento, favorecendo a consciência corporal e relaxamento.'
      },
      {
        slug: 'diario-gratidao',
        title: 'Diário de Gratidão',
        desc: 'Registrar três acontecimentos positivos por dia para cultivar atenção ao que funciona e equilibrar vieses negativos.'
      },
      {
        slug: 'carta-sem-envio',
        title: 'Carta que Não Será Enviada',
        desc: 'Escrever para a pessoa envolvida na questão, soltando emoções e, ao final, redigir um parágrafo de autocuidado.'
      },
      {
        slug: 'caminhada-sensorial',
        title: 'Caminhada Sensorial',
        desc: 'Sair para uma caminhada curta focando em um sentido por vez para desacelerar pensamentos repetitivos.'
      },
    ],
    diaryEntries: [
      {
        id: uuidv4(),
        patientId: anaId,
        date: '2024-04-17',
        mood: 'Calma vigilante',
        highlights: 'Conseguiu dormir melhor após praticar respiração diafragmática e meditação curta.',
        nextSteps: 'Registrar gatilhos ansiosos e compartilhar na próxima sessão.'
      },
      {
        id: uuidv4(),
        patientId: lucasId,
        date: '2024-04-18',
        mood: 'Cansado porém esperançoso',
        highlights: 'Aplicou micro-pausas entre reuniões e percebeu redução das dores musculares.',
        nextSteps: 'Experimentar bloqueio de agenda para almoço consciente três vezes na semana.'
      },
      {
        id: uuidv4(),
        patientId: sofiaId,
        date: '2024-04-20',
        mood: 'Sensível e acolhida',
        highlights: 'Escreveu carta sem envio e compartilhou com amiga da rede de apoio.',
        nextSteps: 'Incluir exercícios de autocompaixão guiada três noites por semana.'
      },
    ],
    messages: [
      {
        id: uuidv4(),
        author: 'Ana Souza',
        text: 'Usei a respiração 4-6 ontem à noite e consegui controlar a ansiedade antes de dormir.'
      },
      {
        id: uuidv4(),
        author: 'Terapeuta',
        text: 'Excelente, Ana! Observe também quais pensamentos antecederam a prática para discutirmos.'
      },
      {
        id: uuidv4(),
        author: 'Lucas Fernandes',
        text: 'Adaptei o ritual de pausas, mas ainda sinto culpa por desconectar do trabalho.'
      },
    ],
  }
}

export const useMainStore = defineStore('main', {
  state: () => createDefaultState(),
  actions: {
    init() {
      const saved = localStorage.getItem(KEY)
      const defaults = createDefaultState()
      if (saved) {
        const parsed = JSON.parse(saved)
        this.$patch({
          ...defaults,
          ...parsed,
          therapyLibrary: defaults.therapyLibrary,
        })
      } else {
        this.$patch(defaults)
      }
    },
    persist() {
      localStorage.setItem(KEY, JSON.stringify(this.$state))
    },
    addTherapy(t) {
      this.therapies.unshift({ id: uuidv4(), ...t })
      this.persist()
    },
    deleteTherapy(id) {
      this.therapies = this.therapies.filter(t => t.id !== id)
      this.persist()
    },
    addPatient(patient) {
      this.patients.unshift({ id: uuidv4(), ...patient })
      this.persist()
    },
    addDiaryEntry(entry) {
      this.diaryEntries.unshift({ id: uuidv4(), ...entry })
      this.persist()
    },
  },
})
