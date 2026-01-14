// src/stores/lessonStore.ts
import { defineStore } from 'pinia'

export type MultipleChoiceData = {
  question: string
  options: string[]
  correctAnswerIndex: number
}

export type LessonBlock = {
  id: string
  title?: string
  text?: string
  multipleChoice?: MultipleChoiceData
}

export type Lesson = {
  id: string
  title: string
  blocks: LessonBlock[]
}

export const useLessonStore = defineStore('lesson', {
  state: () => ({
    lessons: [] as Lesson[]
  }),

  getters: {
    getLessonById: (state) => (id: string | undefined) => {
      if (!id) return undefined
      return state.lessons.find(l => l.id === id)
    }
  },

  actions: {
    createLesson(title = 'Nieuwe les'): string {
      const lesson: Lesson = {
        id: crypto.randomUUID(),
        title,
        blocks: []
      }
      this.lessons.push(lesson)
      this.save()
      return lesson.id
    },

    addBlock(lessonId: string, block: Omit<LessonBlock, 'id'>) {
      const lesson = this.getLessonById(lessonId)
      if (!lesson) return
      lesson.blocks.push({ ...block, id: crypto.randomUUID() })
      this.save()
    },

    updateBlock(lessonId: string, blockId: string, patch: Partial<Omit<LessonBlock, 'id'>>) {
      const lesson = this.getLessonById(lessonId)
      if (!lesson) return
      const block = lesson.blocks.find(b => b.id === blockId)
      if (!block) return
      Object.assign(block, patch)
      this.save()
    },

    removeBlock(lessonId: string, blockId: string) {
      const lesson = this.getLessonById(lessonId)
      if (!lesson) return
      lesson.blocks = lesson.blocks.filter(b => b.id !== blockId)
      this.save()
    },

    moveBlock(lessonId: string, fromIndex: number, toIndex: number) {
      const lesson = this.getLessonById(lessonId)
      if (!lesson) return
      const len = lesson.blocks.length
      if (fromIndex < 0 || fromIndex >= len || toIndex < 0 || toIndex > len) return

      const blocks = [...lesson.blocks]
      const [moved] = blocks.splice(fromIndex, 1)
      if (!moved) return
      blocks.splice(toIndex, 0, moved)
      lesson.blocks = blocks
      this.save()
    },

    saveLesson(lesson: Lesson) {
      const idx = this.lessons.findIndex(l => l.id === lesson.id)
      if (idx >= 0) {
        this.lessons[idx] = JSON.parse(JSON.stringify(lesson))
      } else {
        this.lessons.push(JSON.parse(JSON.stringify(lesson)))
      }
      this.save()
    },

    save() {
      localStorage.setItem('lessons', JSON.stringify(this.lessons))
    },

    load() {
      const data = localStorage.getItem('lessons')
      if (data) {
        try {
          this.lessons = JSON.parse(data)
        } catch (e) {
          console.warn('Could not parse lessons from localStorage', e)
          this.lessons = []
        }
      }
    },

    clear() {
      this.lessons = []
      localStorage.removeItem('lessons')
    }
  }
})
