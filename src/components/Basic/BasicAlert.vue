<script setup lang="ts">
import { ref, computed } from "vue"

const { message, closable, type } = defineProps({
    message: { type: String, required: true },
    closable: { type: Boolean, default: true },
    type: {
        type: String as () => "info" | "warning" | "error" | "success",
        default: "info"
    }
})

const visible = ref(true)

const alertClass = computed(() => `alert-${type}`)

const icons = computed(() =>{
    switch (type) {
        case "error":
            return "fa-solid fa-circle-xmark"
        case "warning":
            return "fa-solid fa-triangle-exclamation"
        case "success":
            return "fa-solid fa-circle-check"
        default:
            return "fa-solid fa-circle-info"
    }
})
</script>

<template>
    <transition name="fade">
        <div v-if="visible" :class="['alert', alertClass]">
            <div class="alert-content">
                <i :class="['alert-icon', icons]"></i>
                <span>{{ message }}</span>
            </div>

            <button v-if="closable" @click="visible = false">
                ×
            </button>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
.alert {
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    font-size: clamp(0.8rem, 3vw, var(--subtext));
    font-family: var(--font-main);
    font-weight: 600;
    color: #e8e8e8;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 7rem;

    &-content {
        display: flex;
        align-items: center;
    }

    &-info {
        background: #0C5460;
        background: linear-gradient(45deg, rgb(24, 76, 85) 0%, rgb(41, 129, 142) 100%);
        padding: 0.65rem;
        display: flex;
        align-items: center;
        border-radius: 7px;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }

    &-warning {
        background: #856404;
        background: linear-gradient(45deg, rgb(130, 105, 33) 0%, rgb(193, 159, 56) 100%);
        padding: 0.65rem;
        display: flex;
        align-items: center;
        border-radius: 7px;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }

    &-error {
        background: #721C24;
        background: linear-gradient(45deg, rgb(98, 28, 28) 0%, rgb(125, 38, 47) 100%);
        padding: 0.65rem;
        display: flex;
        align-items: center;
        border-radius: 7px;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }

    &-success {
        background: #155724;
        background: linear-gradient(45deg, rgb(32, 96, 46) 0%, rgb(33, 140, 57) 100%);
        padding: 0.65rem;
        display: flex;
        align-items: center;
        border-radius: 7px;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }

    &-icon{
        margin-right: .5rem;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
    }
}

button {
    background: transparent;
    border: none;
    color: #e8e8e8;
    font-size: 1.25rem;
    cursor: pointer;
    transition: 0.75s ease;
}

button:hover {
    background: transparent;
    border: none;
    color: #b81313;
    font-size: 1.25rem;
    cursor: pointer;
    transform: scale(1.2);
}
</style>
