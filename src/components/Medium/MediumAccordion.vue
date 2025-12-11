<script setup lang="ts">
import { ref, watch } from "vue"

interface AccordionItem {
    title: string
    content: string
    open?: boolean
}

const props = defineProps<{
    items: AccordionItem[]
}>()

const localItems = ref<AccordionItem[]>(props.items.map(i => ({
    ...i,
    open: i.open ?? false
})))

watch(
    () => props.items,
        (newItems) => {
            localItems.value = newItems.map(i => ({
            ...i,
            open: i.open ?? false
            }))
        },
    { deep: true }
)

const toggle = (index: number) => {
    if (localItems.value[index]) {
        localItems.value[index].open = !localItems.value[index].open
    }
}
</script>

<template>
    <div class="accordion">
        <div 
            v-for="(item, index) in localItems" 
            :key="index" 
            class="accordion__item"
        >
            <button class="accordion__header" @click="toggle(index)">
                <span>{{ item.title }}</span>

                <span class="accordion__icon">
                    {{ item.open ? "−" : "+" }}
                </span>
            </button>

            <div v-if="item.open" class="accordion__content">
                {{ item.content }}
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.accordion {
    width: 100%;
    color-scheme: dark;
    font-family: var(--font-main);

    &__item {
        border: 1px solid #333;
        border-radius: 6px;
        background: #1e1e1e;
        overflow: hidden;
        margin-bottom: 0.75rem;

        &:last-child {
        margin-bottom: 0;
        }
    }

    &__header {
        width: 100%;
        background: #292929;
        color: #ccc;
        padding: 0.75rem 1rem;
        border: none;
        text-align: left;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 600;
        border-bottom: 1px solid #333;
        transition: background 0.2s;

        &:hover {
        background: #333;
        }
    }

    &__icon {
        font-size: 1.2rem;
    }

    &__content {
        padding: 1rem;
        background: #1e1e1e;
        line-height: 1.5;
        color: var(--color-secondary);
    }
}
</style>
