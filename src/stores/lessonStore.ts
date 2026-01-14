import {defineStore} from 'pinia'

export type BlockType = 'text' | 'image' | 'question'

export interface Block {
  id: string
  type: BlockType
  data: any
}

export interface Lesson {
  id: string
  title: string
  status: 'concept' | 'published'
  blocks: Block[]
}

export const useLessenStore = defineStore('lessen', {
  state: () => ({
    lessen: [] as Lesson[],
  }),

  getters: {
    gepubliceerdeLessen: (state) =>
      state.lessen.filter(l => l.status === 'published'),
  },

  actions: {
    maakLes(title: string = 'Nieuwe les') {
      const les: Lesson = {
        id: Date.now().toString(),
        title,
        status: 'concept',
        blocks: [],
      }

      this.lessen.push(les)
      this.save()
      return les.id
    },

    getLesById(id: string) {
      return this.lessen.find(l => l.id === id)
    },

    updateLes(updatedLes: Lesson) {
      const index = this.lessen.findIndex(l => l.id === updatedLes.id)
      if (index !== -1) {
        this.lessen[index] = updatedLes
        this.save()
      }
    },

    publiceerLes(id: string) {
      const les = this.getLesById(id)
      if (les) {
        les.status = 'published'
        this.save()
      }
    },

    // 🔹 BLOCK ACTIONS
    voegBlockToe(lessonId: string, type: BlockType) {
      const les = this.getLesById(lessonId)
      if (!les) return

      les.blocks.push({
        id: Date.now().toString(),
        type,
        data: {},
      })

      this.save()
    },

    updateBlock(lessonId: string, blockId: string, data: any) {
      const les = this.getLesById(lessonId)
      if (!les) return

      const block = les.blocks.find(b => b.id === blockId)
      if (block) {
        block.data = data
        this.save()
      }
    },

    verwijderBlock(lessonId: string, blockId: string) {
      const les = this.getLesById(lessonId)
      if (!les) return

      les.blocks = les.blocks.filter(b => b.id !== blockId)
      this.save()
    },

    verwijderLes(id: string) {
      this.lessen = this.lessen.filter(l => l.id !== id)
      this.save()
    },

    save() {
      localStorage.setItem('lessen', JSON.stringify(this.lessen))
    },

    load() {
      const data = localStorage.getItem('lessen')
      if (data) {
        this.lessen = JSON.parse(data)
      }
    },
  },
})