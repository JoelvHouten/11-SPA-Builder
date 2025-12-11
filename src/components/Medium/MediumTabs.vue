<script setup lang="ts">
import { ref, computed, useSlots } from "vue"

type Tab = {
    name: string
    content?: string
}

const props = defineProps<{
    tabs?: Tab[]
}>()

const slots = useSlots()

const slotNames = computed(() => Object.keys(slots || {}))

const hasPropsTabs = computed(() => Array.isArray(props.tabs) && props.tabs.length > 0)

const initial = computed(() => {
    if (hasPropsTabs.value) return props.tabs![0]?.name ?? ""
    if (slotNames.value.length) return slotNames.value[0]
    return ""
})

const active = ref<string>(initial.value ?? '')
</script>

<template>
    <div class="tabs">
        <div class="tabs__header">
            <template v-if="hasPropsTabs">
                <button
                    v-for="t in props.tabs!"
                    :key="t.name"
                    class="tabs__tab"
                    :class="{ 'tabs__tab--active': active === t.name }"
                    @click="active = t.name"
                >
                    {{ t.name }}
                </button>
            </template>

            <template v-else>
                <button
                    v-for="name in slotNames"
                    :key="name"
                    class="tabs__tab"
                    :class="{ 'tabs__tab--active': active === name }"
                    @click="active = name"
                >
                    {{ name }}
                </button>
            </template>
            </div>

            <div class="tabs__content">
            <template v-if="hasPropsTabs">
                <div v-for="t in props.tabs!" :key="t.name + '-content'">
                    <div v-if="active === t.name">
                        {{ t.content }}
                    </div>
                </div>
            </template>

            <template v-else>
                <div v-for="name in slotNames" :key="name + '-slot'">
                    <div v-show="active === name">
                        <slot :name="name" />
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped lang="scss">
.tabs {
    width: 100%;
    color-scheme: dark;
    font-family: var(--font-main);

    &__header {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    &__tab {
        padding: 0.5rem 1rem;
        width: 100px;
        background: #292929;
        border: 1px solid #3a3a3a;
        color: #e6e6e6;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;

        &:hover {
        background: #20734e;
        }

        &--active {
        background: var(--color-secondary);
        color: #fff;
        }
    }

    &__content {
        background: #292929;
        border: 1px solid #333;
        padding: 1rem;
        border-radius: 6px;
        color: #fff;
    }
}
</style>
