import {defineStore} from 'pinia'

//Hier wordt de store gedefinieerd. Bestaat uit een array van lessen
export const useLessenStore = defineStore('lessen',{
state: ()=>({
    lessen: [] as any[]
}),
actions: {
    maakLes(title:string = 'nieuwe les'){
        const les = {
            id: Date.now().toString(), title,
            status: 'concept',
            blocks: []
        }
        this.lessen.push(les)
        this.save()
        return les.id
    },

    // Create a lesson using a full data payload. This helper is useful for forms.
    // payload may contain: title, lessonText, taskText, question, answersCount, blocks, status, etc.
    maakLesMetData(payload:any = {}){
        const les = {
            id: payload.id ?? Date.now().toString(),
            title: payload.title ?? 'nieuwe les',
            status: payload.status ?? 'concept',
            blocks: payload.blocks ?? [],
            lessonText: payload.lessonText ?? '',
            taskText: payload.taskText ?? '',
            question: payload.question ?? '',
            answersCount: payload.answersCount ?? 4,
            ...payload
        }
        this.lessen.push(les)
        this.save()
        return les.id
    },
    getLesById(id:string){
        return this.lessen.find(l => l.id === id)
    },
    updateLes(updatedLes:any){
        const index = this.lessen.findIndex(l => l.id === updatedLes.id)
        if(index!==-1){
            this.lessen[index] = updatedLes
            this.save()
        }
    },
    publiceerLes(id:string){
        const les = this.getLesById(id)
        if(les){
            les.status = 'published'
            this.save()
        }
    },
    save(){
        localStorage.setItem('lessen', JSON.stringify(this.lessen))
    },
    load(){
        const data = localStorage.getItem('lessen')
        if(data){
            this.lessen = JSON.parse(data)
        }
    },
    clear() {
      this.lessen = []
      localStorage.removeItem('lessen')
    }
}})
