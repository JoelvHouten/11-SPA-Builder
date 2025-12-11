<script setup lang="ts">
import { ref, computed } from "vue"

const { label, type } = defineProps({
    label: { type: String, required: true },
    type: {
        type: String as () => "twitter" | "facebook" | "instagram" | "snapchat",
        default: "info"
    },
    count: {
        type: Number,
        default: null
    }
})

const visible = ref(true)

const badgeClass = computed(() => `badge__${type}`)
</script>

<template>
    <transition name="fade">
        <div v-if="visible" :class="['badge', badgeClass]">
            <div class="badge__center">
                <div class="badge__content">
                    <span>{{ label }}</span>
                    <span v-if="count !== null" class="badge__count">{{ count }}</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
.badge {
    font-family: var(--font-main);
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 10px 15px;
    margin: 0.6rem 0.6rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    color: white;
    cursor: default;
    user-select: none;
    box-shadow:
        rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px,
        rgba(255, 255, 255, 0.1) 0px 1px 0px inset;
    transition: 0.3s ease;
    min-width: 90px;
    justify-content: center;

    &:hover {
        transform: scale(1.1);
    }

    &__content {
        text-shadow: 0px 2px 6px rgba(0, 0, 0, 0.4);
        letter-spacing: 0.3px;
    }

    &__count {
        position: absolute;
        top: -6px;
        right: -6px;
        background: red;
        color: white;
        border-radius: 50%;
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        font-weight: bold;
        box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 6px;
        border: 2px solid #ffffff;
    }

    &__twitter {
        background: linear-gradient(135deg, #1DA1F2, #178cd4);
    }

    &__facebook {
        background: linear-gradient(135deg, #1877F2, #0f5bbd);
    }

    &__instagram {
        background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
    }

    &__snapchat {
        background: #fffc00;
        color: #111;
        text-shadow: none;
    }
}
</style>