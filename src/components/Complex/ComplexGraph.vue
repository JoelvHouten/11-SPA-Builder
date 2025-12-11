<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
    values: number[]
    labels?: string[]
    width?: number
    height?: number
}>()

const maxValue = computed(() => Math.max(...props.values, 1))

const fullLabels = computed(() => {
    const missing = props.values.length - (props.labels?.length ?? 0)
    return [
        ...(props.labels ?? []),
        ...Array(missing).fill("")
    ]
})
</script>

<template>
    <div class="graph" :style="{ width: props.width + 'px', height: props.height + 'px' }">
        <div v-for="(v, i) in props.values" :key="i" class="graph__item">
            <div class="graph__bar-container">
                <div class="graph__bar" :style="{ height: (v / maxValue) * 100 + '%' }"></div>
            </div>

            <div class="graph__label">
                {{ fullLabels[i] }}
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.graph {
    font-family: var(--font-main);
    display: flex;
    align-items: flex-end;
    gap: 6px;
    padding: 8px;
    background: #1a1a1a;
    border-radius: 8px;
    border: 1px solid #333;
    color-scheme: dark;
    max-width: 300px;

    &__item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
    }

    &__bar-container {
        flex: 1;
        width: 100%;
        display: flex;
        align-items: flex-end;
    }

    &__bar {
        width: 100%;
        background: #3E8760;
        border-radius: 4px;
        transition: height .3s ease;

        &:hover {
            background: #50A878;
        }
    }

    &__label {
        margin-top: 6px;
        font-size: 0.75rem;
        color: #ccc;
        text-align: center;
    }
}
</style>
