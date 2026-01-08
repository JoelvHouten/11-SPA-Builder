Blok 2 - Opdracht 4

Pinia datastructuur

lessonStore
|___ lessons: Lesson[]

Lesson
|___ id: string
|___ title: string
|___ status: 'concept' | 'published'
|___ blocks: Block[]

Blok
|___ id: string
|___ type: 'tekstblok' | 'vraagblok' | 'imageblok'
|___ content: any

lessonStore beheerd alle data en bestaat uit een array van lessons. 
Een lesson heeft een id, title, status en de verschillende blokken die gebruikt zijn.
Een block heeft een id, type en content.
De Pinia store is the single source of truth voor de lessons. De lessonarray wordt opgeslagen in de local storage zodat de 
data behouden blijft na een reload 


Installatie

Voor dit project is Node.js nodig. Installeer deze eerst. Daarna:

1. Clone de respository (vanaf bijvoorbeeld github)
2. Ga in bijvoorbeeld vs code naar de projectmap
3. Installeer de dependencies: npm install
4. Start de development server: npm run dev
5. Klik op de link naar de localhost




