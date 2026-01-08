<script setup lang="ts">
import { useLessenStore } from '../stores/lessonStore'
import { onMounted } from 'vue'
import BasicButton from '../components/Basic/BasicButton.vue'

const store = useLessenStore()

function maakTestLes() {
  const id = store.maakLes('Test les')
  console.log('ID:', id)
  console.log('Lessen:', store.lessen)
}

function forceLoad() {
  store.load()
  console.log('Na load:', store.lessen)
}

function clearStorage(){
  store.clear()
}
onMounted(() => {
  store.load()
  console.log('Geladen bij mount:', store.lessen)
})
</script>
<template>
    <BasicButton
        label="maakLes"
        variant="submit"  
        @click="maakTestLes">
        Maak testles
    </BasicButton>
    <BasicButton
        label="Herlaad lessen"
        variant="reset"  
        @click="forceLoad">
        Maak testles
    </BasicButton>
    <BasicButton
        label="Reset"
        variant="reset"  
        @click="clearStorage">
        Maak testles
    </BasicButton>

    <pre>{{ store.lessen }}</pre>
</template>
<style scoped>
pre{
  color: white;
}
</style>