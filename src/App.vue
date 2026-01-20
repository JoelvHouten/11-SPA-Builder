<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavigation from "@/components/navigation/AppNavigation.vue"
</script>

<template>
    <main>
        <AppNavigation />
        <RouterView/>
    </main>
</template>
