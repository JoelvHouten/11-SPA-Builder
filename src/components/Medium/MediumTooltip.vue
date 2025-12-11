<script setup lang="ts">
import { ref } from "vue"

const props = defineProps({
    label: { type: String, required: true },
    tooltip: { type: String, required: true }
})

const show = ref(false)
</script>

<template>
    <div 
        class="tooltip" @mouseenter="show = true" @mouseleave="show = false" >
        <button class="tooltip__button">
            {{ props.label }}
        </button>

        <div v-if="show" class="tooltip__bubble">
            {{ props.tooltip }}
        </div>
    </div>
</template>

<style scoped lang="scss">
.tooltip {
    position: relative;
    display: inline-block;
    color-scheme: dark;

        &__button{
            align-items: center;
            appearance: none;
            border: 0;
            border-radius: 6px;
            box-shadow: rgba(48, 48, 48, 0.4) 0 2px 4px, rgba(45, 45, 45, 0.3) 0 7px 13px -3px, rgba(80, 80, 80, 0.5) 0 -3px 0 inset;
            box-sizing: border-box;
            color: #fff;
            cursor: pointer;
            display: inline-flex;
            font-family: var(--font-main);
            height: 48px;
            justify-content: center;
            line-height: 1;
            list-style: none;
            overflow: hidden;
            padding-left: 16px;
            padding-right: 16px;
            width: 160px;
            margin: 10px 15px 10px 15px;
            position: relative;
            text-align: left;
            text-decoration: none;
            transition: box-shadow .15s, transform .15s;
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
            white-space: nowrap;
            will-change: box-shadow, transform;
            font-size: 18px;
            font-weight: 500;
            background-image: radial-gradient(100% 100% at 100% 0, #217aa6 0, #206b88 100%);
        }

        &__bubble {
            position: absolute;
            bottom: 90%;
            left: 50%;
            transform: translateX(-50%);
            font-family: var(--font-main);
            background: #232323;
            color: white;
            padding: 0.5rem 0.75rem;
            font-size: 0.85rem;
            border: 1px solid #333;
            border-radius: 6px;
            white-space: nowrap;
            z-index: 20;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }
}
</style>
